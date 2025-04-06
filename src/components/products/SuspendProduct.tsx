import { SuspendProductAPI } from '@/api/product/product';
import Suspend from '@/components/Utils/Suspend';
import useToast from '@/hooks/useNotifications';
import { StoredProduct } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type SuspendProductProps = {
    product: StoredProduct;
    onClose: () => void;
};
export default function SuspendProduct({
    product,
    onClose,
}: SuspendProductProps) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: SuspendProductAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['products'] });
            onClose();
        },
    });

    const handleSuspend = () => {
        mutate(product.id);
    };

    if (product.status !== undefined)
        return (
            <Suspend
                status={product.status}
                onClose={onClose}
                handleSuspend={handleSuspend}
            />
        );
}
