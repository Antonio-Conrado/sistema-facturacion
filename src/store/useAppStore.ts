import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createPurchasesSlice } from './PurchasesSlice';
import { PurchasesSlice, SalesSlice } from '@/types/zustandTypes';
import { createGeneralSlice } from './GeneralSlice';
import { GeneralSlice } from '../types/zustandTypes';
import { createSalesSlice } from './SalesSlice';

type AppState = PurchasesSlice & GeneralSlice & SalesSlice;

export const useAppStore = create<AppState>()(
    devtools((...a) => ({
        ...createPurchasesSlice(...a),
        ...createGeneralSlice(...a),
        ...createSalesSlice(...a),
    })),
);
