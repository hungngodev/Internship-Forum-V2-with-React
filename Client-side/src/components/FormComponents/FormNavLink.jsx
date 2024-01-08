import { NavLink } from "react-router-dom";

const FormNavLink = ({ link, text }) => {
  return <NavLink to={link}>{text}</NavLink>;
};
export default FormNavLink;
