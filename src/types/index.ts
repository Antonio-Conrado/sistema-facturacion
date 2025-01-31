import {z} from 'zod'
//schema
export const UserAuthSchema = z.object({
    id: z.number(),
    email: z.string(),
    status: z.boolean(),
    roleId: z.number()
})

//type
export type User = {
    id: number;
    roleId: number;
    name: string;
    surname: string;
    telephone: string | null;
    email: string;
    password: string;
    image: string | null;
    token: string | null;
    isConfirm: boolean;
    status: boolean;
}

export type AuthForm = Pick<User, 'name' | 'surname' | 'email' | 'password' |  'telephone'> & { repeatPassword?: string }

export type ResponseMsgAPI = {
    msg: string; 
}
export type userAuthType = z.infer<typeof UserAuthSchema>

