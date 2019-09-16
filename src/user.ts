export class Address_ {
	readonly id: string;
	type: string;
	address: string;
	city: string;
	country: string;
	postcode: string;
}

export interface User_ {
	readonly _id: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	address?: Address_[];
}

export class User implements User_ {
	readonly _id: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	address: Address_[];
	password: string;
}