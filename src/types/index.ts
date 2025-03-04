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
export const RolesSchemaAPI = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        status: z.boolean(),
    }),
);
export type Roles = z.infer<typeof RolesSchemaAPI>;

export type User = z.infer<typeof UserSchema>;
export type Users = z.infer<typeof UsersSchema>;
export type AuthForm = Pick<
    User,
    'name' | 'surname' | 'email' | 'telephone'
> & { repeatPassword?: string; password: string; token: string };
export type ChangePasswordUser = {
    password: string;
    newPassword: string;
    repeatPassword: string;
};

export type userAuthType = z.infer<typeof UserAuthSchema>;

export const UserSchema = z.object({
    id: z.number(),
    roleId: z.number(),
    name: z.string(),
    surname: z.string(),
    password: z.string().nullable().optional(),
    telephone: z.string().nullable(),
    email: z.string().email(),
    image: z.string().nullable().optional(),
    roles: RolSchema.optional(),
    status: z.boolean().optional(),
});
export const UsersSchema = z.array(UserSchema);

//schema and type businessData
export const BusinessDataSchema = z.object({
    id: z.number(),
    ruc: z.string(),
    name: z.string(),
    description: z.string(),
    direction: z.string(),
    telephone: z.string(),
    email: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
});

export type BusinessData = z.infer<typeof BusinessDataSchema>;

//catalogs
//category
export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable().optional(),
    status: z.boolean(),
});

export const CategoriesSchema = z.array(CategorySchema);
export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof CategoriesSchema>;
//supplier

export const SupplierSchema = z.object({
    id: z.number(),
    ruc: z.string(),
    name: z.string(),
    direction: z.string().nullable().optional(),
    telephone: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    status: z.boolean(),
});

export const SuppliersSchema = z.array(SupplierSchema);
export type Supplier = z.infer<typeof SupplierSchema>;
export type Suppliers = z.infer<typeof SuppliersSchema>;

//product
export const ProductSchema = z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    status: z.boolean(),
    categoriesId: z.number(),
    categories: CategorySchema.pick({ name: true }),
});
export const DetailsProductSchema = z.object({
    id: z.number(),
    productsId: z.number(),
    description: z.string().nullable(),
    image: z.string().nullable(),
    products: ProductSchema,
});

export const StoredProductSchema = z.object({
    id: z.number(),
    detailsProductsId: z.number(),
    stock: z.number(),
    purchasePrice: z.number(),
    salePrice: z.number(),
    status: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    detailsProducts: DetailsProductSchema,
});

export const StoredProductsSchema = z.array(StoredProductSchema);
export type StoredProducts = z.infer<typeof StoredProductsSchema>;
export type StoredProduct = z.infer<typeof StoredProductSchema>;
export type Product = z.infer<typeof ProductSchema>;

export type ProductForm = {
    storedProductId?: number;
    stock?: number;
    purchasePrice?: number;
    salePrice?: number;
    detailsProductsId?: number;
    description?: string | null;
    productId?: number;
    code: string;
    name: string;
    categoriesId: number;
};

export type CreateProduct = {
    detailsProducts: {
        description?: string | null;
        products: {
            code: string;
            name: string;
            categoriesId: number;
        };
    };
};

export type UpdateProduct = {
    detailsProducts: {
        id: number;
        description?: string | null;
        products: {
            id: number;
            code: string;
            name: string;
            categoriesId: number;
        };
    };
};

export type ProductsSearch = {
    name: Product['name'];
    code: Product['code'];
};
//schema and type generals
export const ResponseMsgAPISchema = z.string();

export type LinksSideBar = {
    name: string;
    path: string;
    icon: SvgIconComponent;
    rol?: string[];
    links?: LinksSideBar[];
};

export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}
