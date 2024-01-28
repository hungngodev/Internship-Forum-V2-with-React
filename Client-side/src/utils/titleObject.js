const a = (path) => {
  path = path.includes("profile")? '/profile': path;
  path = path.includes("edit")? '/edit': path;
  path = path.includes("/new")? '/new': path;
  path = path.includes("internships/")? '/internships/': path;

  const pageTitles={
    "/": "Landing Nexus",
    "/register": "Creation Station",
    "/login": "Gateway of Entry",
    "/profile": "User Dashboard",
    "/setting": "Configuration Center",
    "/statistics": "Data Analysis Chamber" ,
    "/internships": "Primary Portal",
    "/new": "Publishing Studio",
    "/internships/": "Post Showcase",
    "/edit": "Editing Workshop",
  }

  return pageTitles[path];
}
export default a;