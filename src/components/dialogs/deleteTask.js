import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

// Summary: Shows a message to alert the user that is going to delete a task
const DeleteTaskDialog = ({ open, onClose, task, handleDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        Are you sure you want to delete task "{task ? task.title : ""}"?
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="error" onClick={onClose}>
          No
        </Button>
        <Button color="success" onClick={handleDelete}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
