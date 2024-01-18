import * as React from "react";
import { useNavigation } from "react-router-dom";
import { Footer } from "..";
import "bootstrap/dist/css/bootstrap.min.css";
import CircularProgress from '@mui/material/CircularProgress';

const MainComponent = ({ open, main, drawerWidth, theme, Main }) => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <Main open={open}>
      {main}
      <footer className="mt-3 ">
        <Footer />
      </footer>
    </Main>
  );
};

export default MainComponent;
