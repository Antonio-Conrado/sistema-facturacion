import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { SearchFilterValues } from '@/types/index';
import { useForm } from 'react-hook-form';
import useAuth from '../useAuth';
import { useMutation } from '@tanstack/react-query';
import { createPurchaseAPI } from '@/api/purchase/purchase';
import useToast from '../useNotifications';
import { initialPurchase } from '@/data/index';

export default function usePurchase() {
    const [filters, setFilters] = useState<Partial<SearchFilterValues>>({});

    const { userAuth } = useAuth();
    const toast = useToast();
    const purchase = useAppStore((store) => store.purchase);
    const addPurchase = useAppStore((store) => store.addPurchase);

    const formMethods = useForm({
        defaultValues: {
            ...initialPurchase,
            usersId: userAuth.id,
        },
        mode: 'onChange',
    });
    const { setValue, watch } = formMethods;

    const { mutate } = useMutation({
        mutationFn: createPurchaseAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
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
        formMethods.reset();
        addPurchase(initialPurchase);
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
