import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import * as React from "react";

import Font from "../../utils/FontConfiguration";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="third" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="primary" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function ReviewCard({ review }) {
  const {rating, author, body} = review
  return (
    <Card sx={{ width: "100%", background: "transparent"}}>
      <CardActions>
        <NavLink
          to={`/profile/${author._id}`}
          style={{
            backgroundColor: "transparent",
            textDecoration: "none",
          }}
        >
          <Typography variant="h5" color="primary" fontFamily={Font.subtitle} >User: {review.author.username}
          </Typography>
        </NavLink>
      </CardActions>
      <CardContent>
        <StyledRating
          name="Rating"
          readOnly
          defaultValue={rating}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
          size="large"
        />
        <Typography variant="h6" color="text.secondary" fontFamily={Font.text}>
          Review: {body}
        </Typography>
      </CardContent>
    </Card>
  );
}
