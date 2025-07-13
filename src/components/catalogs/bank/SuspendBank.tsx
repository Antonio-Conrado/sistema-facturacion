import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SuspendBankAPI } from '@/api/catalogs/bank';
import Suspend from '@/components/Utils/Suspend';
import useToast from '@/hooks/useNotifications';
import { Bank } from '@/types/index';

type SuspendBankProps = {
    bank: Bank;
    onClose: () => void;
};
export default function SuspendBank({ bank, onClose }: SuspendBankProps) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: SuspendBankAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['banks'] });
            onClose();
        },
    });

    const handleSuspend = () => {
        mutate(bank.id);
    };
    return (
        <Suspend
            status={bank.status}
            onClose={onClose}
            handleSuspend={handleSuspend}
        />
    );
}
