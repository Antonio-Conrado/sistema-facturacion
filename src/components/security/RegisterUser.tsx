import { Roles, User } from '@/types/index';
import { useForm } from 'react-hook-form';
import UserForm from '../businessData/UserForm';
import InputEmailsForm from '../Utils/InputEmailForm';
import Select from '../Utils/Select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserAPI } from '@/api/user/user';
import useToast from '@/hooks/useNotifications';
import ErrorMessage from '../Utils/ErrorMessage';

type RegisterUserProps = {
    roles: Roles;
    onClose: () => void;
};
export default function RegisterUser({ roles, onClose }: RegisterUserProps) {
    const toast = useToast();
    const initialValues: User = {
        id: 0,
        name: '',
        surname: '',
        password: '',
        email: '',
        telephone: '',
        roleId: 0,
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    // fetch
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createUserAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['AllUsers'] });;
            if (data) toast.success(data);
            onClose();
        },
    });
    const handleData = (formData: User) => {
        const dataUser = { ...formData, roleId: +formData.roleId };
        mutate(dataUser);
    };
    return (
        <>
            <div className="min-w-[220px] md:min-w-[550px] lg:min-w-[850px]">
                <h1 className="text-cyan-800 text-2xl mb-5">
                    Crear nuevo usuario
                </h1>

                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5">
                        <UserForm
                            isReadOnly={false}
                            register={register}
                            errors={errors}
                            createUser={true}
                        />
                        <InputEmailsForm
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                        />
                        <div className="flex flex-col gap-2 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
                            <label
                                htmlFor="password"
                                className="w-24 font-semibold"
                            >
                                Contraseña:
                            </label>
                            <div className="flex flex-col w-full">
                                <input
                                    type="password"
                                    className={`border rounded-md p-2 w-full ${
                                        errors.password ? 'border-red-500' : ''
                                    }`}
                                    id="password"
                                    placeholder="Ingresa la contraseña"
                                    {...register('password', {
                                        required:
                                            'La contraseña es obligatoria',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'La contraseña debe tener al menos 6 caracteres',
                                        },
                                    })}
                                />
                                {errors.password?.message && (
                                    <ErrorMessage>
                                        {String(errors.password?.message)}
                                    </ErrorMessage>
                                )}
                            </div>
                        </div>
                        <Select
                            title="Rol"
                            name="roleId"
                            options={roles.map((role) => ({
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
        </>
    );
}
