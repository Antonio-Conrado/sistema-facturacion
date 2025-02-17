import { CreateCategoryAPI, UpdateCategoryAPI } from '@/api/catalogs/category';
import Input from '@/components/Utils/Input';
import { ModalAction } from '@/data/index';
import useToast from '@/hooks/useNotifications';
import { Category } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type CategoryFormProps = {
    category?: Category;
    action: string;
    onClose: () => void;
};

export default function CategoryForm({
    category,
    action,
    onClose,
}: CategoryFormProps) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const initialValues: Category = {
        id: category?.id || 0,
        name: category?.name || '',
        description: category?.description || '',
        status: category?.status || true,
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
            action === ModalAction.Edit ? UpdateCategoryAPI : CreateCategoryAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            onClose();
        },
    });
    const handleData = (formData: Category) => {
        mutate(formData);
    };

    return (
        <>
            <div className="min-w-[220px] md:min-w-[550px] lg:min-w-[850px]">
                <h1 className="text-cyan-800 text-2xl mb-5">
                    {action === ModalAction.Edit
                        ? 'Editar Categoría'
                        : 'Crear Categoría'}
                </h1>

                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
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
                            title="Descripción"
                            name="description"
                            type="text"
                            msg=""
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
                                    : 'Crear categoría'
                            }
                            className="btn-confirm"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
