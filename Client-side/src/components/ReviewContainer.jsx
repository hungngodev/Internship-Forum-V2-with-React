import { ReviewCard } from "./ReviewComponents";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import { useHomeLayoutContext } from "../pages/HomeLayout";
import { DeleteButton } from "../components";

export default function ReviewContainer({ reviews }) {
  const { datauser } = useHomeLayoutContext();
  return (
    <Box sx={{ width: "100%" }}>
      {reviews.map((review, index) => (
        <Grid container key={index}>
          <Grid item xs={12} md={(datauser && datauser._id == review.author._id)? 6 :12} key={index}>
            <ReviewCard key={review._id} review={review} />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="end" alignItems="center">
            {datauser && datauser._id == review.author._id && (
              <Form method="post" action={`./review/${review._id}`}>
                <DeleteButton type="submit" />
              </Form>
            )}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
