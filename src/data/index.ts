import { RegisterPurchaseForm, RegisterSaleForm } from '@/types/zustandTypes';
import { IvaList, LinksSideBar } from '../types';

import {
    Analytics,
    AttachMoney,
    Inventory,
    GridView,
    Person,
    Settings,
    Store,
    AccountCircle,
    AccountBalance,
} from '@mui/icons-material';
import { getLocalDateString } from '@/utils/validateDate';

export enum Role {
    admin = 'administrador',
    employee = 'empleado',
}
export const links: LinksSideBar[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: Analytics,
        rol: [Role.admin],
    },
    {
        name: 'Venta',
        path: '/ventas',
        icon: AttachMoney,
        rol: [Role.admin, Role.employee],
        links: [
            {
                name: 'Nueva Venta',
                path: '/ventas',
                icon: AttachMoney,
                rol: [Role.admin, Role.employee],
            },
            {
                name: 'Historial de Ventas',
                path: '/historial-ventas',
                icon: AttachMoney,
                rol: [Role.admin, Role.employee],
            },
        ],
    },
    {
        name: 'Compras',
        path: '/compras',
        icon: AttachMoney,
        rol: [Role.admin, Role.employee],
        links: [
            {
                name: 'Nueva Compra',
                path: '/compras',
                icon: AttachMoney,
                rol: [Role.admin, Role.employee],
            },
            {
                name: 'Historial de Compras',
                path: '/historial-compras',
                icon: AttachMoney,
                rol: [Role.admin, Role.employee],
            },
        ],
    },
    {
        name: 'Productos',
        path: '/productos',
        icon: Inventory,
        rol: [Role.admin, Role.employee],
    },

    {
        name: 'Catálogos',
        path: '/catalogos',
        icon: GridView,
        rol: [Role.admin, Role.employee],
        links: [
            {
                name: 'Proveedores',
                path: '/catalogos/proveedores',
                icon: Person,
                rol: [Role.admin, Role.employee],
            },
            {
                name: 'Categorías',
                path: '/catalogos/categorias',
                icon: GridView,
                rol: [Role.admin, Role.employee],
            },
            {
                name: 'Bancos',
                path: '/catalogos/bancos',
                icon: AccountBalance,
                rol: [Role.admin, Role.employee],
            },
        ],
    },
    {
        name: 'Seguridad',
        path: '/seguridad',
        icon: Person,
        rol: [Role.admin],
    },
    {
        name: 'Configuración',
        path: '/configuracion',
        icon: Settings,
        rol: [Role.admin, Role.employee],
        links: [
            {
                name: 'Datos del Negocio',
                path: '/configuracion/datos-negocio',
                icon: Store,
                rol: [Role.admin],
            },
            {
                name: 'Información Personal',
                path: '/configuracion/informacion-personal',
                icon: AccountCircle,
                rol: [Role.admin, Role.employee],
            },
        ],
    },
];

export enum ModalAction {
    Edit = 'edit',
    ChangePassword = 'changePassword',
    ChangeImage = 'changeImage',
    Suspend = 'suspend',
    Add = 'add',
    View = 'view',
}

export const ivaList: IvaList = [{ value: 0 }, { value: 15 }];

//initial data
export const initialPurchase: RegisterPurchaseForm = {
    usersId: 0,
    suppliersId: 0,
    invoiceNumber: 0,
    date: getLocalDateString(),
    iva: 0,
    detailsPurchases: [],
    subtotal: 0,
    discount: 0,
    total: 0,
};

export const initialSale: RegisterSaleForm = {
    usersId: 0,
    paymentMethodId: 0,
    bankId: 0,
    invoiceNumber: 0,
    transactionReference: '',
    date: getLocalDateString(),
    iva: 0,
    detailsSales: [],
    subtotal: 0,
    discount: 0,
    total: 0,
};

export const initialAuthState = {
    id: 0,
    email: '',
    status: false,
    roleId: 0,
    roles: {
        name: '',
    },
};

export enum PaymentMethodsLabel {
    cash = 'Efectivo',
    bankTransfer = 'Transferencia Bancaria',
}
