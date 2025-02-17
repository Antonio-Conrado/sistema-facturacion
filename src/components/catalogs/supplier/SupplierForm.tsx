import { CreateSupplierAPI, UpdateSupplierAPI } from '@/api/catalogs/supplier';
import Input from '@/components/Utils/Input';
import InputEmailsForm from '@/components/Utils/InputEmailForm';
import { ModalAction } from '@/data/index';
import useToast from '@/hooks/useNotifications';
import { Supplier } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type SupplierFormProps = {
    supplier?: Supplier;
    action: string;
    onClose: () => void;
};

export default function SupplierForm({
    supplier,
    action,
    onClose,
}: SupplierFormProps) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const initialValues: Supplier = {
        id: supplier?.id || 0,
        ruc: supplier?.ruc || '',
        name: supplier?.name || '',
        direction: supplier?.direction || null,
        telephone: supplier?.telephone || null,
        email: supplier?.email || null,
        status: supplier?.status || true,
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
        mutationFn:
            action === ModalAction.Edit ? UpdateSupplierAPI : CreateSupplierAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            onClose();
        },
    });
    const handleData = (formData: Supplier) => {
        mutate(formData);
    };

    return (
        <>
            <div className="min-w-[220px] md:min-w-[550px] lg:min-w-[850px]">
                <h1 className="text-cyan-800 text-2xl mb-5">
                    {action === ModalAction.Edit
                        ? 'Editar Proveedor'
                        : 'Crear Proveedor'}
                </h1>

                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                        <Input
                            title="Ruc"
                            name="ruc"
                            type="text"
                            msg="El ruc es obligatorio"
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                        <Input
                            title="Nombre"
                            name="name"
                            type="text"
                            msg="El nombre es obligatorio"
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                        <Input
                            title="Dirección"
                            name="direction"
                            type="text"
                            msg=""
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />

                        <Input
                            title="Teléfono"
                            name="telephone"
                            type="text"
                            msg=""
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                        <InputEmailsForm
                            isReadOnly={false}
                            requiredMsg=""
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
                                    : 'Crear proveedor'
                            }
                            className="btn-confirm"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
