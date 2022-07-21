import { Image } from "./image"

export interface WorkExperience {
  id: number;
  jobTitle : string;
  company : string;
  description : string;
  startYear : number;
  endYear : number;
  current : boolean;
  companyLogo : Image;
  type : string;
}
