
import Avatar from "@mui/material/Avatar";

const FormIcon = ({Icon}) => {
    return (
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {Icon}
      </Avatar>
    );
}
export default FormIcon;