import * as React from "react";
import {Footer} from '..';
import "bootstrap/dist/css/bootstrap.min.css";


const MainComponent = ({open, main,drawerWidth,theme, Main}) => {

    return <Main open= {open}>
        {main}
        <footer className="fixed-bottom ">
            <Footer />
        </footer>
        </Main>
}

export default MainComponent;