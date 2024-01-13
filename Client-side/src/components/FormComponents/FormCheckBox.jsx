import { Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FormCheckBox({ name, icon, checkedIcon, LabelComponent, value,display }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ color: "#000" }}
    >
      <FormControlLabel
        control={
          <Checkbox
            size="medium"
            sx= {{display: display}}
            icon={icon}
            checkedIcon={checkedIcon}
            inputProps={{name:name}}
            value={value}
          />
        }
        label={LabelComponent}
      />
    </Stack>
  );
}
