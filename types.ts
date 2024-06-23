export interface Store {
    name: string;
    address: string;
    pincode: string;
    latitude: string;
    longitude: string;
    phoneNumber: string;
    area: string;
    dealerOperationHours: Record<string, string>;
    storePageUrl: string;
    dealerContent: Array<{ section: string; content: string }>;
    dealerId: string;
    seoStoreServices: Record<string, unknown>;
    type: string;
    additionalPhones: string;
    gmbMapUrl: string;
    city: string;
    state: string;
    averageRating: number;
}
export interface CityStateMap {
    [key: string]: {
        [key: string]: Store[];
    };
}

