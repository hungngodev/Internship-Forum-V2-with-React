import { MouseParallax, ScrollParallax } from "react-just-parallax";
import { Parallax } from "react-scroll-parallax";
import { Image } from "mui-image";
import simpleParallax from "simple-parallax-js";
import { Helmet } from "react-helmet";

const Landing = () => {
  const test = [];
  for (let i = 0; i < 1000; i++) {
    test.push(<div key={i}>statess</div>);
  }

  return (
    <>
      {test.map((e) => {
        return (
          <>
            <img
              src="https://picsum.photos/id/674/2000"
              alt=""
              style={{ width: "200px", height: "200px" }}
            />
          </>
        );
      })}
    </>
  );
};

export default Landing;
