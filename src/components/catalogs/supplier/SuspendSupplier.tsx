import { SuspendSupplierAPI } from '@/api/catalogs/supplier';
import Suspend from '@/components/Utils/Suspend';
import useToast from '@/hooks/useNotifications';
import { Supplier } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type SuspendSupplierProps = {
    supplier: Supplier;
    onClose: () => void;
};
export default function SuspendSupplier({
    supplier,
    onClose,
}: SuspendSupplierProps) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: SuspendSupplierAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            onClose();
        },
    });

    const handleSuspend = () => {
        mutate(supplier.id);
    };
    return (
        <Suspend
            status={supplier.status}
            onClose={onClose}
            handleSuspend={handleSuspend}
        />
    );
}
