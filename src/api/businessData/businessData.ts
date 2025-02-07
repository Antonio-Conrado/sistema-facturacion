import api from '@/config/axios';
import { BusinessDataSchema } from '@/types/index';
import { isAxiosError } from 'axios';

export async function getBusinessDataAPI() {
    try {
        const { data } = await api('/businessData');
        const result = BusinessDataSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
