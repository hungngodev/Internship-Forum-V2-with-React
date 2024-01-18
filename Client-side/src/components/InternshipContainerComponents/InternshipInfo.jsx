import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import Font from "../../utils/FontConfiguration";

const InternshipInfo = ({ icon, text, variant, type }) => {
  let color =""
  if (type == "link"){
    color = "info.light"
  }
  else if (type == "description"){
    color = "text.primary"
  }
  else if (type == "title"){
    color = "primary.main"
  }
  else {
    color = "secondary.main"
  }
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {icon}
      <Typography
        variant={variant}
        color={color}
        paragraph={type == "description" ? true : false}
        fontFamily={Font.text}
        textAlign="start"
      >
        {text}
      </Typography>
    </Stack>
  );
};
export default InternshipInfo;
