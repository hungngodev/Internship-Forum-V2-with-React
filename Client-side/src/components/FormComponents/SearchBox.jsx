import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { Form, useSubmit } from "react-router-dom";

import { FormSelect } from "../FormComponents";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.dark, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 1),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {

    height: "100%",
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fef7de",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },
}));

const SearchBox = ({ searchValues }) => {
  const { search, sort, option, order } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  const OnChangeSelect = (e) => {
    submit(e.currentTarget.form);
  };

  const Sort = [
    ["Date", "lastModified"],
    ["Salary", "salary"],
    ["Location", "location"],
    ["Rating", "rating"],
  ];

  const Options = [
    ["Relevant", false],
    ["Exactly", true],
  ];
  const Order = [
    ["Ascending", "asc"],
    ["Descending", "desc"],
  ];

  return (
    <Form>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        display="flex"
        sx={{ width: "90vw" }}
        rowSpacing={3}
        columnSpacing={4}
      >
        <Grid item xs={12} md={3}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="secondary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{
                "aria-label": "search",
                name: "search",
                defaultValue: search,
                id: "search",
                type: "text",
              }}
              required
              onChange={debounce((form) => {
                submit(form);
              })}
              fullWidth
            />
          </Search>
        </Grid>
        <Grid item xs={12} md={3} sx={{ width: "80%" }}>
          <FormSelect
            label="Sort by"
            name="sort"
            options={Sort}
            defaultValue={sort}
            onChange={OnChangeSelect}
            submit={submit}
          />
        </Grid>
        <Grid item  xs={12} md={3} sx={{ width: "80%" }}>
          <FormSelect
            label="Search Accuracy"
            name="option"
            options={Options}
            defaultValue={option}
            onChange={OnChangeSelect}
            submit={submit}
          />
        </Grid>
        <Grid item xs={12} md={3} sx={{ width: "80%" }}>
          <FormSelect
            label="Order"
            name="order"
            options={Order}
            defaultValue={order}
            onChange={OnChangeSelect}
            submit={submit}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default SearchBox;
