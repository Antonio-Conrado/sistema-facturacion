import Input from '@/components/Utils/Input';
import { ModalAction } from '@/data/index';
import useToast from '@/hooks/useNotifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Bank } from '../../../types/index';
import { CreateBankAPI, UpdateBankAPI } from '@/api/catalogs/bank';

type BankFormProps = {
    bank?: Bank;
    action: string;
    onClose: () => void;
};

export default function BankForm({ bank, action, onClose }: BankFormProps) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const initialValues: Bank = {
        id: bank?.id || 0,
        name: bank?.name || '',
        status: bank?.status || true,
    };
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    useEffect(() => {
        reset(initialValues); //if modal is close, reset form
    }, [onClose]);

    const { mutate } = useMutation({
        mutationFn: action === ModalAction.Edit ? UpdateBankAPI : CreateBankAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['banks'] });
            onClose();
        },
    });
    const handleData = (formData: Bank) => {
        mutate(formData);
    };

    return (
        <>
            <div className="min-w-[220px] md:min-w-[320px] ">
                <h1 className="text-center text-cyan-800 text-2xl mb-5">
                    {action === ModalAction.Edit
                        ? 'Editar Banco'
                        : 'Crear Banco'}
                </h1>

                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className="grid grid-cols-1 gap-3 ">
                        <Input
                            title="Nombre"
                            name="name"
                            type="text"
                            msg="El nombre es obligatorio"
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                    </div>
                    <div className="flex justify-center pt-5">
                        <input
                            type="submit"
                            value={
                                action === ModalAction.Edit
                                    ? 'Guardar cambios'
                                    : 'Crear banco'
                            }
                            className="btn-confirm"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
