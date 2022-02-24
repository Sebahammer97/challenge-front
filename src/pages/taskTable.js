import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Stack } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { FilterList, Add } from "@mui/icons-material";

// Components
import TaksFilters from "../components/modals/taskFilters/taskFilters";
import DeleteTaskDialog from "../components/dialogs/deleteTask";
import EditTaskModal from "../components/modals/editTask/editTask";
import ChipStatus from "../components/chipStatus/chipStatus";

// Services
import {
  getTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../services/tasks";

// Summary: Show the tasks on a table and let the user filter, create and edit them
const TaskTable = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    status: "All",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);
  const [deleteMode, setDeleteMode] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const getData = useCallback((filters) => {
    let response = getTasks(filters);
    setData(response);
  }, []);

  useEffect(() => {
    getData(filters);
  }, [getData, filters]);

  const handleDelete = () => {
    if (deleteMode) {
      deleteTask(deleteMode.id);
      getData();
    }

    setShowDeleteTaskDialog(false);
  };

  const handleSave = (task) => {
    if (editMode) {
      updateTask(task);
    } else {
      createTask(task);
    }
    setShowEditModal(false);
    getData(filters);
  };

  const handleFilter = (filters) => {
    if (filters) {
      setFilters(filters);
    }
  };

  // Creation of the columns for the table
  const columns = useMemo(
    () => [
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 0.3,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setEditMode(params.row);
              setShowEditModal(true);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              setDeleteMode(params.row);
              setShowDeleteTaskDialog(true);
            }}
          />,
        ],
      },
      {
        field: "title",
        headerName: "Title",
        type: "string",
        flex: 3,
      },
      {
        field: "status",
        headerName: "Status",
        type: "string",
        flex: 2,
        renderCell: (params) => <ChipStatus status={params.row.status} />,
      },
    ],
    []
  );

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          className="button"
          variant="contained"
          onClick={() => setShowFilters(true)}
        >
          <FilterList />
          Filters
        </Button>
        <Button
          className="button"
          variant="contained"
          color="success"
          onClick={() => {
            setEditMode(null);
            setShowEditModal(true);
          }}
        >
          <Add />
          New Task
        </Button>
      </Stack>

      <div className="table">
        <DataGrid columns={columns} rows={data} />
      </div>

      <TaksFilters
        onClose={() => setShowFilters(false)}
        open={showFilters}
        filters={filters}
        handleFilter={handleFilter}
      />
      <DeleteTaskDialog
        onClose={() => setShowDeleteTaskDialog(false)}
        open={showDeleteTaskDialog}
        task={deleteMode}
        handleDelete={handleDelete}
      />
      <EditTaskModal
        onClose={() => setShowEditModal(false)}
        open={showEditModal}
        task={editMode}
        handleSave={handleSave}
      />
    </>
  );
};

export default TaskTable;
