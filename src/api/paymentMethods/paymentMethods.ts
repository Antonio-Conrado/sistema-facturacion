import { isAxiosError } from 'axios';
import api from '@/config/axios';
import { PaymentMethodsSchema } from '@/types/index';

export async function getPaymentMethodsApi() {
    try {
        const { data } = await api('/payment-methods');
        const result = PaymentMethodsSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
