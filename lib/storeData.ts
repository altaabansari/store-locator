import { Store } from '../types';

export const states: string[] = []; // Replace with actual states from API or data source

export const defaultState: string = 'Delhi';
export const defaultCity: string = 'New Delhi';

export const fetchStores = async (city: string): Promise<Store[]> => {
    try {
        const response = await fetch(`http://iabeta.in/abhishek/api/re.json`);
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Error fetching stores:', error);
        return [];
    }
};
