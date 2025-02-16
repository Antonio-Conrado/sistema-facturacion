import useToast from '@/hooks/useNotifications';
import { Roles, User } from '@/types/index';
import { useForm } from 'react-hook-form';
import Input from '../Utils/Input';
import InputEmailsForm from '../Utils/InputEmailForm';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserAPI } from '@/api/user/user';
import Select from '../Utils/Select';

type SecurityFormProps = {
    user: User;
    onClose: () => void;
};

export default function SecurityForm({ user, onClose }: SecurityFormProps) {
    const toast = useToast();

    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<Roles>(['roles']);
    const initialValues: User = {
        id: user.id,
        roleId: user.roleId,
        name: user.name,
        surname: user.surname,
        email: user.email,
        telephone: user.telephone ? user.telephone : '',
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
        mutationFn: updateUserAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['AllUsers'] });
            onClose();
        },
    });
    const handleData = (formData: User) => {
        const dataUser = { ...formData, roleId: +formData.roleId };
        mutate(dataUser);
    };

    if (data)
        return (
            <div className="min-w-[220px] md:min-w-[550px] lg:min-w-[850px]">
                <h1 className="text-cyan-800 text-2xl mb-5">Editar usuario</h1>

                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                        <Input
                            title="Nombres"
                            name="name"
                            type="text"
                            msg="El nombre es obligatorio"
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                        <Input
                            title="Apellidos"
                            name="surname"
                            type="text"
                            msg="El apellido es obligatorio"
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                        <InputEmailsForm
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
                        <Select
                            title="Rol"
                            name="roleId"
                            options={data.map((role) => ({
                                value: role.id,
                                label: role.name,
                            }))}
                            msg="El rol es obligatorio"
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                    </div>
                    <div className="flex justify-center pt-5">
                        <input
                            type="submit"
                            value={'Guardar cambios'}
                            className="btn-confirm w-2/4"
                        />
                    </div>
                </form>
            </div>
        );
}
