import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { Form, useSubmit } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { useAllInternshipsContext } from "../../pages/AllInternships";
import { FormSelect } from "../FormComponents";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBox = () => {
  const { searchValues } = useAllInternshipsContext();
  const { search, sort, option ,order} = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 0);
    };
  };

  const OnChangeSelect=(e)=>{
    submit(e.currentTarget.form)
  }

  const Sort = [
    ["Date", "lastModified"],
    ["Salary", "salary"],
    ["Location", "location"],
    ["Rating", "rating"]
  ];
  
  const Options = [
    ["Exactly", true],
    ["Relevant", false]
  ];
  const Order=[
    ["Ascending", "asc"],
    ["Descending", "desc"]
  ]
  
  return (
    <Form>
      <Grid container alignItems="center">
        <Grid item md={6}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
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
              // onChange= {debounce((form) => {
              //   submit(form);
              // })}
              onChange={(e) => {
              }}
            />
          </Search>
        </Grid>
        <Grid item md={2}>
          <FormSelect  label="Sort by" name= "sort" options= {Sort} defaultValue={sort} onChange={OnChangeSelect} submit={submit} />
        </Grid>
        <Grid item md={2}>
            <FormSelect  label="Search Accuracy" name= "option" options= {Options} defaultValue={option} onChange={OnChangeSelect} submit={submit} />
        </Grid>
        <Grid item md={2}>
            <FormSelect  label="Order" name= "order" options= {Order} defaultValue={order} onChange={OnChangeSelect} submit={submit} />
        </Grid>
      </Grid>
    </Form>
  );
};

export default SearchBox;
