import { AllInternships } from "../pages";

export default function resetBodyStyle(path,color) {
  path = path.includes("profile")? '/profile': path;
  path = path.includes("edit")? '/edit': path;
  path = path.includes("internships/")? '/internships/': path;
  
  const LandingBodyConfig = {
    all: "unset",
    width: "100vw",
    height: "100vh",
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url("https://images.unsplash.com/photo-1476445704028-a36e0c798192?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
    textShadow: "0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)",
    boxShadow: "inset 0 0 5rem rgba(0, 0, 0, 0.5)",
    overflowX: "hidden",
    overflowY: "hidden",
  };
  const RegisterConfig = {
    all: "unset",
    backgroundImage: `url()`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: color,
    width: "100vw",
    height: "100vh",
  };
  const LogInConfig = {
    all: "unset",
    backgroundImage: `url()`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: color,
    width: "100vw",
    height: "100vh",
  };
  const profileConfig= {
    all:"unset",
    backgroundColor: color,
  }
  const statisticsConfig= {
    all:"unset",
    backgroundColor: color,

  }
  const settingConfig= {
    all:"unset",
    backgroundColor: color,
  }
  const AllInternshipConfig = {
    all:"unset",
    overflowX: "hidden",
    backgroundColor: color,
  }

  const AddInternshipsConfig = {
    all:"unset",
    backgroundColor: color,
  }
  const ViewingInternshipConfig = {
    all:"unset",
    backgroundColor: color,
  }
  const EditInternshipConfig = {
    all:"unset",
    backgroundColor: color,
  }

  const mappingBody = {
    "/": LandingBodyConfig,
    "/register": RegisterConfig,
    "/login": LogInConfig,
    "/profile": profileConfig,
    "/setting": settingConfig,
    "/statistics": statisticsConfig,
    "/internships": AllInternshipConfig,
    "/internships/new": AddInternshipsConfig,
    "/internships/": ViewingInternshipConfig,
    "/edit": EditInternshipConfig,
  }

  let BodyConfig = mappingBody[path];
  for (let e in BodyConfig) {
    document.body.style[e] = "";
  }
  document.body.style.all="unset";
  for (let e in BodyConfig) {
    document.body.style[e] = BodyConfig[e];
  }
}