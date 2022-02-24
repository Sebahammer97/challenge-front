import { Chip } from "@mui/material";
import {
  DeleteOutlined,
  WarningOutlined,
  InfoOutlined,
  DoneOutlined,
} from "@mui/icons-material";

// Summary: Element that is used on the task table to show the status of each task
const ChipStatus = ({ status }) => {
  switch (status) {
    case "New":
      return <Chip label={status} color="primary" variant="outlined" />;
    case "On Progress":
      return (
        <Chip
          label={status}
          color="info"
          variant="outlined"
          icon={<InfoOutlined />}
        />
      );
    case "Paused":
      return (
        <Chip
          label={status}
          color="warning"
          variant="outlined"
          icon={<WarningOutlined />}
        />
      );
    case "Completed":
      return (
        <Chip
          label={status}
          color="success"
          variant="outlined"
          icon={<DoneOutlined />}
        />
      );
    case "Deleted":
      return (
        <Chip
          label={status}
          color="error"
          variant="outlined"
          icon={<DeleteOutlined />}
        />
      );
    default:
      return <Chip label={status} />;
  }
};

export default ChipStatus;
