import { Link, NavLink } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const FormNavLink = ({ link, text }) => {
  return (
    <NavLink to={link}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <LinkIcon size ="large"/>
        <Typography variant="h5" color="inherit">
          {text}
        </Typography>
        <LinkIcon size ="large"/>
      </Stack>
    </NavLink>
  );
};
export default FormNavLink;
