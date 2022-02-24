import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Modal, Button, Stack, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-mui";

//Services
import { getStatus } from "../../../services/status";

// Constants
import { modalStyle } from "../../tools/constants/constants";

// Summary: Shows a form that the user can complete to create or edit a task
const EditTaskModal = ({ open, onClose, task, handleSave }) => {
  const [status, setStatus] = useState();

  const getData = useCallback(() => {
    const response = getStatus();
    if (response.length > 0) {
      const values = response.filter((item) => item.value !== "All");
      setStatus(values);
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
        <h2 id="modal-filter-tasks-title">{task ? "Edit task" : "New Task"}</h2>
        <Formik
          initialValues={{
            id: task ? task.id : 0,
            title: task ? task.title : "",
            description: task ? task.description : "",
            status: task ? task.status : "New",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            if (!values.status) {
              errors.status = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              handleSave(values);
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
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
                  disabled={task?.id}
                />
                <Field
                  component={TextField}
                  name="description"
                  type="text"
                  label="Description"
                />
                <Field
                  component={Select}
                  name="status"
                  type="select"
                  label="Status"
                  disabled={!task}
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
                <Button
                  autoFocus
                  variant="contained"
                  color="error"
                  onClick={onClose}
                >
                  Discard
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Save
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
