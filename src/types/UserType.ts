type Geo = {
 lat: string;
 lng: string;
};

type Address = {
 address: string;
 state: string;
 city: string;
 country: string;
 stateCode: string;
 coordinates: Geo;
};

type Company = {
 name: string;
 department: string;
 title: string;
};

export type UserType = {
 id: number;
 name: string;
 username: string;
 email: string;
 gender: string;
 birthDate: string;
 address: Address;
 phone: string;
 website: string;
 age: number;
 picture: string;
 company: Company;
};