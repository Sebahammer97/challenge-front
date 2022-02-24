import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Modal, Button, Stack, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-mui";

//Services
import { getStatus } from "../../../services/status";

// Constants
import { modalStyle } from "../../tools/constants/constants";

const initialValues = {
  title: "",
  status: "All",
};

// Summary: Shows a form that the user can complete and filter the tasks by their title and / or status
const TaskFiltersModal = ({ open, onClose, filters, handleFilter }) => {
  const [status, setStatus] = useState();

  const getData = useCallback(() => {
    const response = getStatus();
    if (response.length > 0) {
      setStatus(response);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-filter-tasks-title"
    >
      <Box sx={modalStyle}>
        <h2 id="modal-filter-tasks-title">Task Filters</h2>
        <Formik
          initialValues={{
            title: filters ? filters.title : "",
            status: filters ? filters.status : "All",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.status) {
              errors.status = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              setSubmitting(false);
              handleFilter(values);
              onClose();
            }, 500);
          }}
          onReset={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              handleFilter(initialValues);
              onClose();
            }, 500);
          }}
        >
          {({ submitForm, resetForm, isSubmitting }) => (
            <Form>
              <Stack
                className="fields"
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Field
                  component={TextField}
                  name="title"
                  type="text"
                  label="Title"
                />
                <Field
                  component={Select}
                  name="status"
                  type="select"
                  label="Status"
                >
                  {status &&
                    status.length > 0 &&
                    status.map((status, index) => (
                      <MenuItem key={index} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                </Field>
              </Stack>

              <Stack direction="row" alignItems="end" spacing={1}>
                <Button variant="contained" onClick={resetForm}>
                  Reset filters
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={submitForm}
                >
                  Apply filters
                </Button>
                <Button
                  autoFocus
                  color="error"
                  variant="contained"
                  onClick={onClose}
                >
                  Close
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default TaskFiltersModal;
