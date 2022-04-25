export interface UserLocation {
    street: {
        name: string;
        number: number;
    };
    city: string;
    state: string;
    postcode: number;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    timezone: {
        offset: string;
        description: string;
    };
}