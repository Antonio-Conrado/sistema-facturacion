import { SuspendCategoryAPI } from '@/api/catalogs/category';
import Suspend from '@/components/Utils/Suspend';
import useToast from '@/hooks/useNotifications';
import { Category } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type SuspendCategoryProps = {
    category: Category;
    onClose: () => void;
};
export default function SuspendCategory({
    category,
    onClose,
}: SuspendCategoryProps) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: SuspendCategoryAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            onClose();
        },
    });

    const handleSuspend = () => {
        mutate(category.id);
    };
    return (
        <Suspend
            status={category.status}
            onClose={onClose}
            handleSuspend={handleSuspend}
        />
    );
}
