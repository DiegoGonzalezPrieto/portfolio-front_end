export interface JwtDto {
	token: string,
	type: string,
	userName: string,
	personId: string,
	authorities: string[]
}
