import { LoginDetails } from "./login-details.model";
import { UserLocation } from "./user-location.model";
import { UserName } from "./user-name.mode";

export interface User {
    gender: string;
    name: UserName;
    location: UserLocation;
    email: string;
    login: LoginDetails;
    dob: {
        date: string;
        age: number;
    },
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    },
    nat: string;
}