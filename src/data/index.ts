import { LinksSideBar } from '../types';

import {
    Analytics,
    AttachMoney,
    Inventory,
    GridView,
    Person,
    Settings,
    Store,
    AccountCircle,
} from '@mui/icons-material';

export const links: LinksSideBar[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: Analytics,
        rol: ['administrador'],
    },
    {
        name: 'Venta',
        path: '/ventas',
        icon: AttachMoney,
        rol: ['administrador', 'empleado'],
        links: [
            {
                name: 'Nueva Venta',
                path: '/ventas',
                icon: AttachMoney,
                rol: ['administrador', 'empleado'],
            },
            {
                name: 'Historial de Ventas',
                path: '/historial-ventas',
                icon: AttachMoney,
                rol: ['administrador', 'empleado'],
            },
        ],
    },
    {
        name: 'Compras',
        path: '/compras',
        icon: AttachMoney,
        rol: ['administrador', 'empleado'],
        links: [
            {
                name: 'Nueva Compra',
                path: '/compras',
                icon: AttachMoney,
                rol: ['administrador', 'empleado'],
            },
            {
                name: 'Historial de Compras',
                path: '/historial-compras',
                icon: AttachMoney,
                rol: ['administrador', 'empleado'],
            },
        ],
    },
    {
        name: 'Productos',
        path: '/productos',
        icon: Inventory,
        rol: ['administrador', 'empleado'],
    },

    {
        name: 'Catálogos',
        path: '/catalogos',
        icon: GridView,
        rol: ['administrador', 'empleado'],
        links: [
            {
                name: 'Proveedores',
                path: '/catalogos/proveedores',
                icon: Person,
                rol: ['administrador', 'empleado'],
            },
            {
                name: 'Categorías',
                path: '/catalogos/categorias',
                icon: GridView,
                rol: ['administrador', 'empleado'],
            },
        ],
    },
    {
        name: 'Seguridad',
        path: '/seguridad',
        icon: Person,
        rol: ['administrador'],
    },
    {
        name: 'Configuración',
        path: '/configuracion',
        icon: Settings,
        rol: ['administrador', 'empleado'],
        links: [
            {
                name: 'Datos del Negocio',
                path: '/configuracion/datos-negocio',
                icon: Store,
                rol: ['administrador'],
            },
            {
                name: 'Información Personal',
                path: '/configuracion/informacion-personal',
                icon: AccountCircle,
                rol: ['administrador', 'empleado'],
            },
        ],
    },
];
