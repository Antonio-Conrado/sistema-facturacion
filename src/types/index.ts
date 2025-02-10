import { SvgIconComponent } from '@mui/icons-material';
import { z } from 'zod';
//schema and type User
export const UserAuthSchema = z.object({
    id: z.number(),
    email: z.string(),
    status: z.boolean(),
    roleId: z.number(),
});

export const RolSchema = z.object({
    name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type AuthForm = Pick<
    User,
    'name' | 'surname' | 'email' | 'telephone'
> & { repeatPassword?: string; password: string; token: string };
export type userAuthType = z.infer<typeof UserAuthSchema>;

export const UserSchema = z.object({
    id: z.number(),
    roleId: z.number(),
    name: z.string(),
    surname: z.string(),
    telephone: z.string().nullable(),
    email: z.string().email(),
    image: z.string().nullable(),
    roles: RolSchema,
});

//schema and type businessData
export const BusinessDataSchema = z.object({
    id: z.number(),
    ruc: z.string(),
    name: z.string(),
    description: z.string(),
    direction: z.string(),
    telephone: z.string(),
    email: z.string().email().nullable(),
    image: z.string().nullable().optional(),
});

export type BusinessData = z.infer<typeof BusinessDataSchema>;

//schema and type generals
export const ResponseMsgAPISchema = z.string();

export type LinksSideBar = {
    name: string;
    path: string;
    icon: SvgIconComponent;
    rol?: string[];
    links?: LinksSideBar[];
};
