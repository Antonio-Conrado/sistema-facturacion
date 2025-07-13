import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useAppStore } from '@/store/useAppStore';
import { SearchFilterValues } from '@/types/index';
import useAuth from '../useAuth';
import useToast from '../useNotifications';
import { initialSale } from '@/data/index';
import { createSaleAPI } from '@/api/sale/sale';
import { ModalKeyList } from '@/types/zustandTypes';

export default function useSale() {
    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const [filters, setFilters] = useState<Partial<SearchFilterValues>>({});

    const { userAuth } = useAuth();
    const toast = useToast();
    const sale = useAppStore((store) => store.sale);
    const addSale = useAppStore((store) => store.addSale);
    const resetSale = useAppStore((store) => store.resetSale);
    const saveFinalizedSaleId = useAppStore(
        (store) => store.saveFinalizedSaleId,
    );

    const queryClient = useQueryClient();

    // react-hook-form
    const formMethods = useForm({
        defaultValues: {
            ...initialSale,
            usersId: userAuth.id,
        },
        mode: 'onChange',
    });
    const { setValue, watch } = formMethods;

    //fetch
    const { mutate } = useMutation({
        mutationFn: createSaleAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data.msg);
            let bankId = sale.bankId;
            // reset data
            resetSale(); //reset store
            formMethods.reset({
                ...initialSale,
                usersId: userAuth.id,
            });
            setFilters({ paymentMethodId: 0, ivaId: 0 });
            saveFinalizedSaleId(data.saleId); //save product ID to upload invoice reference document or photo
            if (bankId) {
                //upload invoice
                addedFromModal(true, 'uploadBankInvoiceReference');
            }
            bankId = 0;

            addedFromModal(true, ModalKeyList.SaleInvoice);
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['invoiceNumber'] });
        },
    });

    const discount = watch('discount');
    const subtotal = watch('subtotal');

    useEffect(() => {
        setValue('subtotal', sale.subtotal);
        setValue('total', sale.total);
        if (discount < 0 || discount > 100) {
            setValue('discount', 0);
        }
    }, [setValue, sale, discount, subtotal]);

    useEffect(() => {
        if (discount) {
            addSale({
                ...sale,
                discount: +discount,
            });
        }
    }, [discount]);

    const handleData = () => {
        const data = { ...sale, date: new Date(sale.date) };
        mutate(data);
    };

    return {
        //context and state
        addSale,
        sale,
        filters,
        // react-hook-form
        formMethods,
        //functions
        setFilters,
        handleData,
    };
}
