import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import { useHomeLayoutContext } from "./HomeLayout";
import resetBodyStyle from "../utils/resetBodyStyle.js";
import Wrapper from "../css/Landing.js";

import "bootstrap/dist/css/bootstrap.min.css";


const Landing = () => {

  return (
    <Wrapper>
      <div className="d-flex text-center text-white flex-column align-items-center justify-content-end">
        <div className="my-5 title">
          <h1 className="Title">Internship Forum</h1>
          <br />
          <p className="lead my-5">
            Start shaping your future today!
            <span className="my-2" />
            <br />
            Discover, Contribute, and Inspire others with your Internship
            Journey!
            <span className="my-2" />
            <br />
            Explore diverse opportunities, share your unique experiences, and
            witness a world of possibilities.
          </p>
        </div>
        <main className="px-auto my-5">
          <NavLink
            to={"internships"}
            style={{
              backgroundColor: "transparent",
              color: "fff",
              textDecoration: "none",
            }}
          >
            <div className="card-group">
              <span className="text-center btnfos">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                <h3>View</h3>
              </span>

              {/* Repeat the following div for each big-card */}
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="big-card"
                  style={{ borderRadius: "30px" }}
                ></div>
              ))}
            </div>
          </NavLink>
        </main>
      </div>
    </Wrapper>
  );
};

export default Landing;
