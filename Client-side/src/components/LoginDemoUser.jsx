import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExploreIcon from '@mui/icons-material/Explore';
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";

export default function LoginDemoUser({reloadFunction}) {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    try {
      const { data } = await customFetch.post(
        "/login",
        { demo: true },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      reloadFunction.invalidateQueries();
      toast(`Welcome back ${data.username}`);
      navigate("/internships");
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      navigate("/login");
    }
  };
  return (
    <Button
      variant="outlined"
      startIcon={<ExploreIcon/>}
      color="error"
      onClick={loginDemoUser}
      fullWidth
    >
      Explore as Demo User
    </Button>
  );
}
