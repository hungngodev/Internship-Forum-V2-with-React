import {Button} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function EditButton({onClick}) {
  return (
    <Button variant="outlined" startIcon={<BorderColorIcon />} color="third" onClick = {onClick}>
      Edit
    </Button>
  );
}
