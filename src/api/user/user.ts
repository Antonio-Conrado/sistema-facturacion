import api from '@/config/axios';
import { User, UserSchema } from '@/types/index';
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
