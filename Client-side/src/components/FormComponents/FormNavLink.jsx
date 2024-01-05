import { NavLink } from "react-router-dom";

const FormNavLink = ({ link, message }) => {
  return <NavLink to={link}>{message}</NavLink>;
};
export default FormNavLink;
