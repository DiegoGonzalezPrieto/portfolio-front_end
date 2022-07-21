import {City} from "./city";
import {ContactInfo} from "./contact-info";
import {Image} from "./image";

export interface Person {
	id: number,
	firstName: string,
	lastName: string,
	jobTitle: string,
	briefCv: string,
	profPic: Image,
	backPic: Image,
	city: City,
}
