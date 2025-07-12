import api from '@/config/axios';
import { Sale, SaleSchema, SalesHistorySchema } from '@/types/index';
import { RegisterSaleAPI } from '@/types/zustandTypes';
import { isAxiosError } from 'axios';

export async function getSalesApi({
    take = 10,
    skip = 0,
}: {
    take?: number;
    skip?: number;
}) {
    try {
        const { data } = await api(`/sales?take=${take}&skip=${skip}`);
        const result = SalesHistorySchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getSaleDetailsApi(id: number) {
    try {
        const { data } = await api(`/sales/${id}`);
        const result = SaleSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getLastInvoiceNumber() {
    try {
        const { data } = await api('/sales/last-invoice-number');

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function SuspendSaleAPI({
    id,
    cancellationReason,
}: {
    id: number;
    cancellationReason: string;
}) {
    try {
        const { data } = await api.patch<string>(`/sales/${id}`, {
            cancellationReason,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadSaleInvoiceAPI({
    id,
    file,
}: {
    id?: Sale['id'];
    file: File;
}) {
    const fileType = file.type.split('/');
    const fileIdentified = fileType[0] === 'image' ? 'image' : 'file'; // Identify the file type to handle it in the backend according to the file being uploaded

    const formData = new FormData();
    formData.append(fileIdentified, file); // 'file' should match the field name in the backend

    try {
        const { data } = await api.patch<string>(
            `/sales/upload-document/${id}`,
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

export async function filterSaleByTermAPI<
    T extends Record<string, string | number | null>,
>({ term, take, skip }: { term: T; take: number; skip: number }) {
    try {
        const [key, value] = Object.entries(term)[0];
        const { data } = await api(
            `/sales/filter/term?${key}=${value}&take=${take}&skip=${skip}`,
        );
        const result = SalesHistorySchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createSaleAPI(sale: RegisterSaleAPI) {
    try {
        const { data } = await api.post('/sales', sale);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
