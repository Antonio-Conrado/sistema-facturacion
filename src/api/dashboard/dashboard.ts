import api from '@/config/axios';
import { DashboardSummarySchema } from '@/types/index';
import { isAxiosError } from 'axios';

export async function getDashboardSummary() {
    try {
        const { data } = await api('/dashboard');
        const result = DashboardSummarySchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
