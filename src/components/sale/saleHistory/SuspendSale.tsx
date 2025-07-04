import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaleHistoryTable } from '@/types/index';
import { SuspendSaleAPI } from '@/api/sale/sale';
import Suspend from '@/components/Utils/Suspend';
import useToast from '@/hooks/useNotifications';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/Utils/ErrorMessage';

type SuspendSaleProps = {
    sale: SaleHistoryTable;
    onClose: () => void;
};
export default function SuspendSale({ sale, onClose }: SuspendSaleProps) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cancellationReason: '',
        },
    });

    const { mutate } = useMutation({
        mutationFn: SuspendSaleAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['sales'] });
            onClose();
        },
    });

    const handleData = (data: { cancellationReason: string }) => {
        const { cancellationReason } = data;
        const formData = { id: sale.id, cancellationReason };
        mutate(formData);
    };

    if (sale.status !== undefined)
        return (
            <>
                <form onSubmit={handleSubmit(handleData)}>
                    <Suspend
                        label={`¿Está seguro que desea anular la factura №: ${sale.invoiceNumber}?`}
                        status={sale.status}
                        onClose={onClose}
                    >
                        <>
                            <div className="my-3 flex flex-col gap-1 md:flex-row md:gap-3 text-gray-800">
                                <label
                                    htmlFor="description"
                                    className="font-semibold"
                                >
                                    Razón de anulación
                                </label>

                                <textarea
                                    {...register('cancellationReason', {
                                        required:
                                            'La razón de cancelación debe ser obligatoria',
                                    })}
                                    className="border rounded-lg w-full px-2 min-h-fit"
                                    rows={5}
                                    placeholder="Por favor, escriba la razón de anulación"
                                />
                                {errors?.['cancellationReason']?.message && (
                                    <ErrorMessage>
                                        {String(
                                            errors['cancellationReason']
                                                ?.message,
                                        )}
                                    </ErrorMessage>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 ">
                                <input
                                    type="submit"
                                    className="btn-confirm w-fit"
                                    value="Confirmar"
                                />
                                <button
                                    className="btn-cancel w-fit"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    </Suspend>
                </form>
            </>
        );
}
