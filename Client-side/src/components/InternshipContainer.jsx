import { InternshipCard } from "./InternshipContainerComponents";
import { useAllInternshipsContext } from "../pages/AllInternships";
import { Box } from "@mui/material";

const InternshipContainer = () => {
  const { internshipData } = useAllInternshipsContext();
    if (!internshipData) {
    return <h1>Loading...</h1>;
    }
  const { internships } = internshipData;
  if (!internshipData.hasOwnProperty("internships")) {
    return <h1>No internships available</h1>;
  } else {
    
    const { internships } = internshipData;
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        
          {internships.map((internship) => (
              <InternshipCard
                  title = {internship.title}
                  salary = {internship.salary}
                  area = {internship.area}
                  description = {internship.description}
                  location = {internship.location}
                  company = {internship.company}
                  link = {internship.link}
                  images = {internship.images}
                  imagesUrl = {internship.imagesURL}
                  lastModified = {internship.lastModified}
                  key= {internship._id}
              />
            // <>
            // <h1>{internship.title}</h1>
            // <h1>{internship.salary}</h1>
            // </>

          ))}
      </Box>
    );
  }
};
export default InternshipContainer;
