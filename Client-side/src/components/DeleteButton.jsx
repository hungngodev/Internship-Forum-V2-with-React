import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export default function DeleteButton({type}) {
  return (
    <Button
      variant="outlined"
      color="warning"
      type={type}
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  );
}
