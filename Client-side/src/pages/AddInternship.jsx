import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@mui/material";
import { internshipSchema } from "../../../schemas";
import { CustomForm } from "../components";
import customFetch from "../utils/customFetch";


export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const extract = Object.fromEntries(formData);
    try {
      const { data } = await customFetch.post("/internships", extract, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries(["AllInternship"]);
      toast.success("Job added successfully ");
      return redirect(`/internships/${data.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.messageError);
      return redirect(".");
    }
  };
export const loader = (queryClient) => async ({ params }) => {
  try {
    await customFetch.get("/internships/new");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.messageError);
    return redirect("..");
  }
}
const AddInternshipState = {
  title: {
    type: "text",
    autoComplete: "title",
  },
  description: {
    type: "text",
    specialType: "textarea",
    autoComplete: "description",
  },
  area: {
    type: "text",
    autoComplete: "area",
  },
  location: {
    type: "text",
    autoComplete: "location",
  },
  company: {
    type: "text",
    autoComplete: "company",
  },
  state: {
    type: "text",
    specialType: "select",
    autoComplete: "state",
  },
  link: {
    type: "text",
    autoComplete: "link",
  },
  salary: {
    type: "number",
    autoComplete: "salary",
    specialType: "currency",
  },
  image:{
    type: "file",
    specialType: "file",
    autoComplete: "images",
    notRequired: true,
  },
  generate: {
    type: "text",
    specialType:"checkbox",
    autoComplete: "generate",
    notRequired: true,
  },
};
function internshipFakeData() {
  const states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
];
  const techAreas = [
    'Web Development', 'Mobile App Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence',
    'Cybersecurity', 'Cloud Computing', 'DevOps', 'Database Administration', 'UI/UX Design',
    'Software Testing', 'Networking', 'IoT (Internet of Things)', 'Blockchain Development',
    'Game Development', 'AR/VR Development', 'Big Data', 'Bioinformatics', 'Embedded Systems'
];
  const techCompanies = [
    'Google', 'Apple', 'Microsoft', 'Amazon', 'Facebook', 'IBM', 'Intel', 'Cisco', 'Oracle', 'Samsung',
    'HP (Hewlett-Packard)', 'Dell', 'Adobe', 'Nvidia', 'Sony', 'Tesla', 'Uber', 'Airbnb', 'Netflix', 'PayPal',
    'Salesforce', 'Reddit', 'SpaceX', 'Twitter', 'LinkedIn', 'Dropbox', 'Slack', 'Shopify', 'Zoom', 'TikTok'
]; 
  const adjectives = [
    "Innovative",
    "Advanced",
    "Dynamic",
    "Emerging",
    "Pioneering",
    "Cutting-edge",
    "Revolutionary",
    "Progressive",
    "Exploratory",
    "Experimental",
    "Creative",
    "Groundbreaking",
    "Visionary",
    "Forward-thinking",
    "Trailblazing",
    "Inventive",
    "Futuristic",
    "Inspirational",
    "Transformative",
    "Disruptive"
  ];
  const seasons = [
    "Spring",
    "Summer",
    "Fall",
    "Winter"
];
  const industries =  [
    "technology",
    "finance",
    "healthcare",
    "entertainment",
    "marketing",
    "education",
    "hospitality",
    "communications",
    "retail",
    "manufacturing"
];
  const tasks = [
    "developing new software solutions",
    "conducting market research",
    "analyzing data trends",
    "designing user interfaces",
    "creating marketing campaigns",
    "optimizing operational processes",
    "testing product functionalities",
    "building customer relationships",
    "implementing strategic plans",
    "supporting project management"
];
const lowercaseAdjectives = [
  "exciting",
  "challenging",
  "rewarding",
  "innovative",
  "dynamic",
  "engaging",
  "insightful",
  "cutting-edge",
  "creative",
  "collaborative"
];

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const { name, abbreviation } = getRandomItem(states);
  const area = getRandomItem(techAreas);
  const company = getRandomItem(techCompanies);
  const link = `https://www.google.com/search?q=${company}+${name}`;
  const title = `${getRandomItem(adjectives)} ${getRandomItem(seasons)} ${area} Intern at ${company}`;

  function generateFakeInternshipDescription() {
    const industry = getRandomItem(industries);
    const adjective = getRandomItem(lowercaseAdjectives);
    const task = getRandomItem(tasks);
    return `This ${industry} internship offers an ${adjective} experience involving ${task}. Note that this is a randomly generated description.`;
  }

  return {
    title,
    salary: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
    area,
    location: name,
    company,
    link,
    description: generateFakeInternshipDescription(),
    state: abbreviation,
  };
}
const AddInternship = () => {
  return (
    <CustomForm
      initialState={AddInternshipState}
      Schema={internshipSchema}
      title="New Internship"
      Icon={<CreateNewFolderIcon />}
      navInfo={{
        text: "Back To Internships",
        link: "/internships",
      }}
      encrypt={true}
      method = "post"
      width= "50vw"
      functionFillData={internshipFakeData}
    />
  );
};
export default AddInternship;
