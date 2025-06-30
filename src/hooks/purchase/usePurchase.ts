import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { SearchFilterValues } from '@/types/index';
import { useForm } from 'react-hook-form';
import useAuth from '../useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPurchaseAPI } from '@/api/purchase/purchase';
import useToast from '../useNotifications';
import { initialPurchase } from '@/data/index';

export default function usePurchase() {
    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const [filters, setFilters] = useState<Partial<SearchFilterValues>>({});

    const { userAuth } = useAuth();
    const toast = useToast();
    const purchase = useAppStore((store) => store.purchase);
    const addPurchase = useAppStore((store) => store.addPurchase);
    const resetPurchase = useAppStore((store) => store.resetPurchase);
    const saveFinalizedPurchaseId = useAppStore(
        (store) => store.saveFinalizedPurchaseId,
    );

    const queryClient = useQueryClient();

    // react-hook-form
    const formMethods = useForm({
        defaultValues: {
            ...initialPurchase,
            usersId: userAuth.id,
        },
        mode: 'onChange',
    });
    const { setValue, watch } = formMethods;

    //fetch
    const { mutate } = useMutation({
        mutationFn: createPurchaseAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data.msg);
            // reset data
            resetPurchase(); //reset store
            formMethods.reset({
                ...initialPurchase,
                usersId: userAuth.id,
            });
            setFilters({ suppliersId: 0, ivaId: 0 });

            //upload invoice
            saveFinalizedPurchaseId(data.purchaseId); //save product ID to upload invoice reference document or photo
            addedFromModal(true, 'purchaseInvoice');
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const discount = watch('discount');
    const subtotal = watch('subtotal');

    useEffect(() => {
        setValue('subtotal', purchase.subtotal);
        setValue('total', purchase.total);
        if (discount < 0 || discount > 100) {
            setValue('discount', 0);
        }
    }, [setValue, purchase, discount, subtotal]);

    useEffect(() => {
        if (discount) {
            addPurchase({
                ...purchase,
                discount: +discount,
            });
        }
    }, [discount]);

    const handleData = () => {
        const data = { ...purchase, date: new Date(purchase.date) };
        mutate(data);
    };

    return {
        //context and state
        addPurchase,
        purchase,
        filters,
        // react-hook-form
        formMethods,
        //functions
        setFilters,
        handleData,
    };
}
