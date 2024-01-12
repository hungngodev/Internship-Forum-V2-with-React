import * as React from "react";
import {Footer} from '..';
import "bootstrap/dist/css/bootstrap.min.css";


const MainComponent = ({open, main,drawerWidth,theme, Main}) => {

    return <Main open= {open}>
        {main}
        <footer className="mt-5 ">
            <Footer />
        </footer>
        </Main>
}

export default MainComponent;