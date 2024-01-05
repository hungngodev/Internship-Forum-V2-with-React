import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { useHomeLayoutContext } from "./HomeLayout";
import "./Landing.css";
import { useEffect } from "react";

const LandingBodyConfig={
  height: '100%',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url("https://images.unsplash.com/photo-1476445704028-a36e0c798192?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  textShadow: '0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)',
  boxShadow: 'inset 0 0 5rem rgba(0, 0, 0, 0.5)',
  overflowX: 'hidden',
  overflowY: 'hidden',
};

const Landing = () => {
  const {BodyConfig, changeBodyConfig} = useHomeLayoutContext();
  useEffect(() => {
    changeBodyConfig({...LandingBodyConfig});
  }, []);
  for (let e in BodyConfig){
    document.body.style[e]=BodyConfig[e];
  }
  return (
    <>
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
    </>
  );
};

export default Landing;
