import { Link, NavLink } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const FormNavLink = ({ link, text }) => {
  return (
    <NavLink to={link}  style={{textDecoration:'none'}}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <LinkIcon size ="large" sx= {{color: "secondary.dark"}}/>
        <Typography variant="h5" color="secondary" sx={{textDecoration:"none"}}>
          {text}
        </Typography>
        <LinkIcon size ="large" sx= {{color: "secondary.dark"}}/>      </Stack>
    </NavLink>
  );
};
export default FormNavLink;
