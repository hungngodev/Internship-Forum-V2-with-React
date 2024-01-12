export default function resetBodyStyle(path) {

  const LogInConfig = {
    backgroundImage: `url()`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };
  const RegisterConfig = {
    all: "unset",
    backgroundImage: `url()`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };
  const LandingBodyConfig = {
    height: "100%",
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url("https://images.unsplash.com/photo-1476445704028-a36e0c798192?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textShadow: "0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)",
    boxShadow: "inset 0 0 5rem rgba(0, 0, 0, 0.5)",
    overflowX: "hidden",
    overflowY: "hidden",
  };
  const InternshipBodyConfig = {
    all:"unset"
  }
  const profileConfig= {
    all:"unset"
  }
  const mappingBody = {
    "/": LandingBodyConfig,
    "/register": RegisterConfig,
    "/login": LogInConfig,
    "/internships": InternshipBodyConfig,
    "/profile": profileConfig

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