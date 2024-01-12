import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const labels = {
  0.5: "Useless",
  1: "Bad",
  1.5: "Poor",
  2: "Poor",
  2.5: "Ok",
  3: "Ok",
  3.5: "Good",
  4: "Good",
  4.5: "Excellent",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
export default function FormRating({ data, handleSave }) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        key="rating"
        name="rating"
        required
        size="large"
        value={data}
        onChange={handleSave}
        getLabelText={getLabelText}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<ThumbUpIcon />}
      />
      {data !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : data]}</Box>
      )}
    </Box>
  );
}
