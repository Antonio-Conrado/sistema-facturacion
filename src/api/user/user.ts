import api from '@/config/axios';
import { User, UserSchema, UsersSchema } from '@/types/index';
import { isAxiosError } from 'axios';

export async function getUser({ id }: { id: User['id'] }) {
    try {
        const { data } = await api(`/user/get-user/${id}`);
        const result = UserSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateUserAPI(formData: User) {
    try {
        const { id, ...dataUser } = formData;
        const { data } = await api.put<string>(
            `/user/update-user/${id}`,
            dataUser,
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadImageUserAPI({
    id,
    file,
}: {
    id?: User['id'];
    file: File;
}) {
    const formData = new FormData();
    formData.append('image', file); // 'image' should match the field name in the backend

    try {
        const { data } = await api.post<string>(
            `/user/upload-image/${id}`,
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

export async function getUsersAPI() {
    try {
        const { data } = await api(`/user/get-all-users/`);
        const result = UsersSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function SuspendUserAPI(id: number) {
    try {
        const { data } = await api.patch<string>(`/user/suspended-user/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createUserAPI(formData: User) {
    try {
        const { id: _id, ...dataUser } = formData;
        const { data } = await api.post<string>('/user/create-user/', dataUser);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
