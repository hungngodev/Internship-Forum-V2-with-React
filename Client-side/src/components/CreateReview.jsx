import ReviewsIcon from "@mui/icons-material/Reviews";

import { reviewSchema, LogInSchema } from "../../../schemas";
import { CustomForm } from "../components";

const CreateReviewState = {
  rating: {
    type: "number",
    specialType: "rating",
  },
  body: {
    type: "text",
    autoComplete: "body",
  },
};

export default function CreateReview({action}) {
  return (
    <CustomForm
      initialState={CreateReviewState}
      Schema={reviewSchema}
      title="Create Review"
      Icon={<ReviewsIcon />}
      navInfo={{ text: "Back to internships", link: "/internships" }}
      width= "30rem"
      action= {action}
    />
  );
}
