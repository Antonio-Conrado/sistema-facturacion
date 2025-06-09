import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createPurchasesSlice } from './PurchasesSlice';
import { PurchasesSlice } from '@/types/zustandTypes';
import { createGeneralSlice } from './GeneralSlice';
import { GeneralSlice } from '../types/zustandTypes';

type AppState = PurchasesSlice & GeneralSlice;

export const useAppStore = create<AppState>()(
    devtools((...a) => ({
        ...createPurchasesSlice(...a),
        ...createGeneralSlice(...a),
    })),
);
