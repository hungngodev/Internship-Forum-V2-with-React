import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
const JobInfo = ({ icon, text,variant }) => {
  return (
    <Stack direction="row" alignItems="start" gap={1}>
      {icon}
      <Typography variant={variant} sx ={{color: "#000"}}>{text}</Typography>
    </Stack>
  );
};
export default JobInfo;

