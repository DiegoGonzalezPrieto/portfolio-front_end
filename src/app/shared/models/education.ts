import { Image } from "./image"

export interface Education {

	id : number;
	title : string;
	institution : string;
	startYear : number;
	endYear : number;
	current : boolean;
	level : string;
	image : Image;
}
