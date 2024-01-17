import { useNavigation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Font from "../../utils/FontConfiguration"
import LinearProgress from '@mui/material/LinearProgress';

const SubmitBtn = ({ handleSubmit, text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={isSubmitting}
      color="primary"
    >
      <Typography variant="h6" sx={{fontFamily: Font.title}}> {isSubmitting ? "Loading" : text}</Typography>
    </Button>
  );
};
export default SubmitBtn;
