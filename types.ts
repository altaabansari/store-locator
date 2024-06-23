export interface Store {
    name: string;
    address: string;
    // Add other store details from your API response
    latitude: string;
    longitude: string;
}

export interface MapCenter {
    lat: number;
    lng: number;
}
