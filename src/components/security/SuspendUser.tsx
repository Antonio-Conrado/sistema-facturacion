import { SuspendUserAPI } from '@/api/user/user';
import useToast from '@/hooks/useNotifications';
import { User } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type SuspendUserProps = {
    user: User;
    onClose: () => void;
};
export default function SuspendUser({ user, onClose }: SuspendUserProps) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: SuspendUserAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['AllUsers'] });
            onClose();
        },
    });

    const handleSuspend = () => {
        mutate(user.id);
    };
    return (
        <>
            <div className="pb-5 px-2">
                {user.status ? (
                    <p className="text-gray-800 text-lg">
                        ¿Estás seguro que deseas suspender a este usuario?
                    </p>
                ) : (
                    <p className="text-gray-800 text-lg">
                        ¿Estás seguro que deseas habilitar de nuevo a este
                        usuario?
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 ">
                <button className="btn-confirm w-fit" onClick={handleSuspend}>
                    Confirmar
                </button>
                <button className="btn-cancel w-fit" onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </>
    );
}
