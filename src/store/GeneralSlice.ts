import { GeneralSlice, ModalKey } from '@/types/zustandTypes';
import { StateCreator } from 'zustand';

export const createGeneralSlice: StateCreator<
    GeneralSlice,
    [],
    [],
    GeneralSlice
> = (set) => ({
    isActiveModal: false,
    activeModalKey: 'default',
    addedFromModal: (isActiveModal: boolean, activeModalKey: ModalKey) => {
        set(() => ({
            isActiveModal,
            activeModalKey,
        }));
    },
});
