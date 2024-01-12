import { ReviewCard } from "./ReviewComponents";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import { useHomeLayoutContext } from "../pages/HomeLayout";

export default function ReviewContainer({ reviews }) {
  const { datauser } = useHomeLayoutContext();
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {reviews.map((review, index) => (
          <div key={index}>
            <ReviewCard key={review._id} review={review} />
            {datauser && datauser._id == review.author._id && (
              <Form method="post" action={`./review/${review._id}`}>
                <Button
                  variant="outlined"
                  type="submit"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Form>
            )}
          </div>
        ))}
      </Stack>
    </Box>
  );
}
