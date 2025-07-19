import api from '@/config/axios';
import { BanksSchema, Bank } from '@/types/index';
import { isAxiosError } from 'axios';

export async function getBanksAPI() {
    try {
        const { data } = await api(`/banks`);
        const result = BanksSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function CreateBankAPI(formData: Bank) {
    try {
        const { data } = await api.post<string>('/banks', formData.name);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function UpdateBankAPI(formData: Bank) {
    try {
        const { data } = await api.put<string>(
            `/banks/${formData.id}`,
            formData.name,
        );
        return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function SuspendBankAPI(id: Bank['id']) {
    try {
        const { data } = await api.patch<string>(`/banks/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
