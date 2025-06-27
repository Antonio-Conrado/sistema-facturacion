import { RegisterPurchaseAPI } from './../../types/zustandTypes';
import api from '@/config/axios';
import {
    Purchase,
    PurchaseHistoryTable,
    PurchaseSchema,
    PurchasesHistoySchema,
} from '@/types/index';
import { isAxiosError } from 'axios';

export async function getPurchasesApi({
    take = 10,
    skip = 0,
}: {
    take?: number;
    skip?: number;
}) {
    try {
        const { data } = await api(`/purchases?take=${take}&skip=${skip}`);
        const result = PurchasesHistoySchema.safeParse(data);

        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getPurchaseDetailsApi(id: number) {
    try {
        const { data } = await api(`/purchases/${id}`);
        const result = PurchaseSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function SuspendPurchaseAPI(id: PurchaseHistoryTable['id']) {
    try {
        const { data } = await api.patch<string>(`/purchases/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadPurchaseInvoiceAPI({
    id,
    file,
}: {
    id?: Purchase['id'];
    file: File;
}) {
    const fileType = file.type.split('/');
    const fileIdentified = fileType[0] === 'image' ? 'image' : 'file'; // Identify the file type to handle it in the backend according to the file being uploaded

    const formData = new FormData();
    formData.append(fileIdentified, file); // 'file' should match the field name in the backend

    try {
        const { data } = await api.patch<string>(
            `/purchases/upload-document/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function filterPurchaseByTermAPI<
    T extends Record<string, string | number | null>,
>({ term, take, skip }: { term: T; take: number; skip: number }) {
    try {
        const [key, value] = Object.entries(term)[0];
        const { data } = await api(
            `/purchases/filter/term?${key}=${value}&take=${take}&skip=${skip}`,
        );
        const result = PurchasesHistoySchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createPurchaseAPI(purchase: RegisterPurchaseAPI) {
    try {
        const { data } = await api.post('/purchases', purchase);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
