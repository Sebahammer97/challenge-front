import { Button, Modal, Box, Stack } from "@mui/material";

// Constants
import { modalStyle } from "../../tools/constants/constants";

// Summary: Shows an message to alert the user that is going to leave the edition of a task before save it
const DiscardChangesModal = ({ open, onClose, discard }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="discard-modal-title"
      aria-describedby="discard-modal-description"
    >
      <Box sx={modalStyle}>
        <h2 id="discard-modal-title">Discard Changes</h2>
        <h3 id="discard-modal-description">
          Are you sure you want to discard the changes?
        </h3>
        <Stack direction="row" alignItems="end" spacing={1}>
          <Button autoFocus color="error" onClick={onClose}>
            No
          </Button>
          <Button color="success" onClick={discard}>
            Yes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DiscardChangesModal;
