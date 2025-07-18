import { SvgIconComponent } from '@mui/icons-material';
import { z } from 'zod';
//schema and type User
export const RolSchema = z.object({
    name: z.string(),
});
export const UserAuthSchema = z.object({
    id: z.number(),
    email: z.string(),
    status: z.boolean(),
    roleId: z.number(),
    roles: RolSchema,
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

//bank
export const BankSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.boolean(),
});

export const BanksSchema = z.array(BankSchema);
export type Bank = z.infer<typeof BankSchema>;
export type Banks = z.infer<typeof BanksSchema>;

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

//purchase
export const PurchaseHistoryTableSchema = z.object({
    id: z.number(),
    users: z.object({ id: z.number(), name: z.string(), surname: z.string() }),
    suppliers: z.object({ id: z.number(), name: z.string() }),
    iva: z.number(),
    invoiceNumber: z.number(),
    document: z.string().url().nullable(),
    date: z.string(),
    total: z.number(),
    discount: z.number(),
    status: z.boolean(),
});
export const PurchasesHistoryTableSchema = z.array(PurchaseHistoryTableSchema);

export const PurchasesHistoySchema = z.object({
    purchases: PurchasesHistoryTableSchema,
    total: z.number(),
});

export type PurchasesHistoryTable = z.infer<typeof PurchasesHistoryTableSchema>;
export type PurchasesHistory = z.infer<typeof PurchasesHistoySchema>;
export type PurchaseHistoryTable = z.infer<typeof PurchaseHistoryTableSchema>;

// purchase Details

const PurchasesDetailsSchema = z.array(
    z.object({
        id: z.number(),
        purchasesId: z.number(),
        amount: z.number(),
        purchasePrice: z.number(),
        salePrice: z.number(),
        discount: z.number(),
        subtotal: z.number(),
        storedProducts: z.object({
            detailsProducts: z.object({
                image: z.string().url().nullable(),
                products: z.object({
                    code: z.string(),
                    name: z.string(),
                }),
            }),
        }),
    }),
);

export const PurchaseSchema = z.object({
    id: z.number().optional(),
    usersId: z.number().optional(),
    suppliersId: z.number().optional(),
    iva: z.number(),
    invoiceNumber: z.number(),
    document: z.string().url().nullable(),
    date: z.string(),
    subtotal: z.number(),
    discount: z.number(),
    total: z.number(),
    status: z.boolean(),
    users: z.object({ name: z.string(), surname: z.string() }),
    suppliers: z.object({ name: z.string() }),
    detailsPurchases: PurchasesDetailsSchema,
});

export type Purchase = z.infer<typeof PurchaseSchema>;
export type PurchaseDetails = z.infer<typeof PurchasesDetailsSchema>;

// sales
export const SaleHistoryTableSchema = z.object({
    id: z.number(),
    iva: z.number(),
    cancellationReason: z.string().nullable(),
    annulledAt: z.string().datetime().nullable(),
    invoiceNumber: z.number(),
    document: z.string().nullable(),
    date: z.string().datetime(),
    subtotal: z.number(),
    discount: z.number(),
    total: z.number(),
    status: z.boolean(),
    users: z.object({
        name: z.string(),
        surname: z.string(),
    }),
    paymentMethods: z.object({
        name: z.string(),
    }),
});

export const SalesHistoryTableSchema = z.array(SaleHistoryTableSchema);

export const SalesHistorySchema = z.object({
    sales: SalesHistoryTableSchema,
    total: z.number(),
});
export type SaleHistoryTable = z.infer<typeof SaleHistoryTableSchema>;
export type SalesHistoryTable = z.infer<typeof SalesHistoryTableSchema>;
export type SalesHistory = z.infer<typeof SalesHistorySchema>;

// Full sale record with detailed product information
export const DetailsSalesSchema = z.array(
    z.object({
        id: z.number(),
        salesId: z.number(),
        storedProductsId: z.number(),
        price: z.number(),
        amount: z.number(),
        subtotal: z.number(),
        discount: z.number(),
        storedProducts: z.object({
            detailsProducts: z.object({
                image: z.string().nullable(),
                products: z.object({
                    name: z.string(),
                    code: z.string(),
                }),
            }),
        }),
    }),
);

export const SaleSchema = z.object({
    id: z.number(),
    usersId: z.number(),
    paymentMethodId: z.number(),
    iva: z.number(),
    transactionReference: z.string().nullable(),
    cancellationReason: z.string().nullable(),
    annulledAt: z.string().datetime().nullable(),
    invoiceNumber: z.number(),
    document: z.string().nullable(),
    date: z.string().datetime(),
    subtotal: z.number(),
    discount: z.number(),
    total: z.number(),
    status: z.boolean(),
    users: z.object({
        name: z.string(),
        surname: z.string(),
    }),
    paymentMethods: z.object({
        name: z.string(),
    }),
    detailsSales: DetailsSalesSchema,
});
export type SaleDetails = z.infer<typeof DetailsSalesSchema>;
export type Sale = z.infer<typeof SaleSchema>;

//payment methods
export const PaymentMethodSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.boolean(),
});

export const PaymentMethodsSchema = z.array(PaymentMethodSchema);

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type PaymentMethods = z.infer<typeof PaymentMethodsSchema>;

//iva
export type IvaList = {
    value: number;
}[];

// dashboard

const lastTransactionSchema = z.object({
    id: z.number(),
    date: z.string().datetime(),
    invoiceNumber: z.number(),
    total: z.number(),
});

const DayTotalSchema = z.object({
    day: z.string().datetime(),
    total: z.number(),
});

const MonthTotalSchema = z.object({
    month: z.string().datetime(),
    total: z.number(),
});

const YearTotalSchema = z.object({
    year: z.string().datetime(),
    total: z.number(),
});

const SummaryGroupSchema = z.object({
    total: z.number(),
    byMonth: z.array(MonthTotalSchema),
    byDay: z.array(DayTotalSchema),
    byYear: z.array(YearTotalSchema),
    lastTransaction: lastTransactionSchema,
});

export const DashboardSummarySchema = z.object({
    sales: SummaryGroupSchema,
    purchases: SummaryGroupSchema,
});
export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;

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

export type DataType = 'date' | 'status' | 'currency' | 'text';

// General definition of search filters for different entities
export enum SearchFilterEnum {
    suppliersId = 'suppliersId',
    invoiceNumber = 'invoiceNumber',
    bankId = 'bankId',
    usersId = 'usersId',
    ivaId = 'ivaId',
    productId = 'productId',
    paymentMethodId = 'paymentMethodId',
}

export type SearchFilterValues = {
    [SearchFilterEnum.suppliersId]: number | null;
    [SearchFilterEnum.bankId]: number | null;
    [SearchFilterEnum.invoiceNumber]: string | null;
    [SearchFilterEnum.usersId]: number | null;
    [SearchFilterEnum.ivaId]: number | null;
    [SearchFilterEnum.productId]: number | null;
    [SearchFilterEnum.paymentMethodId]: number | null;
};
