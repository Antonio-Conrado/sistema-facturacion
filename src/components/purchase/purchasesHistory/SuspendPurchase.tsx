import { SuspendPurchaseAPI } from '@/api/purchase/purchase';
import Suspend from '@/components/Utils/Suspend';
import useToast from '@/hooks/useNotifications';
import { PurchaseHistoryTable } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type SuspendPurchaseProps = {
    purchase: PurchaseHistoryTable;
    onClose: () => void;
};
export default function SuspendPurchase({
    purchase,
    onClose,
}: SuspendPurchaseProps) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: SuspendPurchaseAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['purchases'] });
            onClose();
        },
    });

    const handleSuspend = () => {
        mutate(purchase.id);
    };

    if (purchase.status !== undefined)
        return (
            <Suspend
                status={purchase.status}
                onClose={onClose}
                handleSuspend={handleSuspend}
            />
        );
}
