import api from '@/config/axios';
import { Supplier, SuppliersSchema } from '@/types/index';
import { isAxiosError } from 'axios';

export async function getSuppliersAPI() {
    try {
        const { data } = await api(`/suppliers`);
        const result = SuppliersSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function CreateSupplierAPI(formData: Supplier) {
    try {
        const { id: _id, status: _status, ...supplier } = formData;
        const { data } = await api.post<string>('/suppliers', supplier);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function UpdateSupplierAPI(formData: Supplier) {
    try {
        const { status: _status, ...supplier } = formData;
        const { data } = await api.put<string>(
            `/suppliers/${formData.id}`,
            supplier,
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function SuspendSupplierAPI(id: Supplier['id']) {
    try {
        const { data } = await api.patch<string>(`/suppliers/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
