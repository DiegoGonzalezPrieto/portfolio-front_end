import {Image} from "./image";

export interface Project {
	id: number,
	name: string,
	technologies: string[],
	description: string,
	repoUrl: string,
	image: Image
}
