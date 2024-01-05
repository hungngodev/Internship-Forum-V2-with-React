import { useNavigation } from "react-router-dom";
import Button from "@mui/material/Button";

const SubmitBtn = ({ formBtn,handleSubmit }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Button
      type="submit"
      onClick= {handleSubmit}
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Signing In" : "Sign In"}
    </Button>
  );
};
export default SubmitBtn;
