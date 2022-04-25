export interface UserLocation {
    street: {
        name: string;
        number: number;
    };
    city: string;
    state: string;
    postcode: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    timezone: {
        offset: number;
        description: string;
    };
}