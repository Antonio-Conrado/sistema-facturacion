import api from '@/config/axios';
import {
    BusinessData,
    BusinessDataSchema,
    ResponseMsgAPISchema,
} from '@/types/index';
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

export async function updateBusinessDataAPI(formData: BusinessData) {
    try {
        const { data } = await api.put<string>('/businessData', formData);
        return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadImageBusinessDataAPI({ file }: { file: File }) {
    try {
        // Create a FormData object and append the image to the request body
        const formData = new FormData();
        formData.append('image', file); // 'image' should match the field name in the backend

        const { data } = await api.post(
            '/businessData/upload-image',
            formData, // Use FormData instead of 'image' directly
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // This is necessary for file uploads
                },
            },
        );
        const result = ResponseMsgAPISchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
