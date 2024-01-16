import Typography from "@mui/material/Typography";
import Font from "../../utils/FontConfiguration"

const FormHeader = ({ title }) => (
    <Typography component="h1" variant="h5" color="primary" sx = {{fontFamily: Font.subtitle}}>
        {title}
  </Typography>
);
export default FormHeader;