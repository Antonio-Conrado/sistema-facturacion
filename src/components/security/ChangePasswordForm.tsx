import { ChangePasswordUser, User } from '@/types/index';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../Utils/ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { updatePasswordAPI } from '@/api/auth/auth';
import useToast from '@/hooks/useNotifications';
import { useEffect } from 'react';

type ChangePasswordFormProps = {
    id: User['id'];
    onClose: () => void;
};
export default function ChangePasswordForm({
    id,
    onClose,
}: ChangePasswordFormProps) {
    const toast = useToast();
    const initialValues = {
        password: '',
        newPassword: '',
        repeatPassword: '',
    };
    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ChangePasswordUser>({
        defaultValues: initialValues,
    });
    const newPasswordVerify = watch('newPassword');

    useEffect(() => {
        reset(initialValues);
    }, [id]);

    const mutatePassword = useMutation({
        mutationFn: updatePasswordAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            reset(initialValues);
            onClose();
        },
    });

    const handleChangePassword = (formData: ChangePasswordUser) => {
        const data = { formData, id };
        mutatePassword.mutate(data);
    };

    return (
        <div className="min-w-[220px] md:min-w-[550px] lg:min-w-[850px]">
            <h1 className="text-cyan-800 text-2xl mb-5">Editar Contraseña</h1>

            <form
                onSubmit={handleSubmit(handleChangePassword)}
                className="flex gap-3 flex-col "
            >
                <div className="flex flex-col gap-2 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
                    <label htmlFor="password" className="w-24  font-semibold">
                        Contraseña:
                    </label>
                    <div className="flex flex-col w-full">
                        <input
                            type="password"
                            className={`border rounded-md p-2 w-full ${
                                errors.password ? 'border-red-500' : ''
                            }`}
                            id="password"
                            placeholder="Ingresa la contraseña actual"
                            {...register('password', {
                                required: 'La contraseña actual es obligatoria',
                            })}
                        />
                        {errors.password?.message && (
                            <ErrorMessage>
                                {String(errors.password?.message)}
                            </ErrorMessage>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
                    <label
                        htmlFor="newPassword"
                        className="w-24  font-semibold"
                    >
                        Nueva Contraseña:
                    </label>
                    <div className="flex flex-col w-full">
                        <input
                            type="password"
                            className={`border rounded-md p-2 w-full ${
                                errors.newPassword ? 'border-red-500' : ''
                            }`}
                            id="newPassword"
                            placeholder="Ingresa la nueva contraseña"
                            {...register('newPassword', {
                                required: 'La contraseña nueva es obligatoria',
                                minLength: {
                                    value: 6,
                                    message:
                                        'La contraseña debe tener al menos 6 caracteres',
                                },
                            })}
                        />
                        {errors.newPassword?.message && (
                            <ErrorMessage>
                                {String(errors.newPassword?.message)}
                            </ErrorMessage>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
                    <label
                        htmlFor="repeatPassword"
                        className="w-24  font-semibold"
                    >
                        Repite la nueva Contraseña:
                    </label>
                    <div className="flex flex-col w-full">
                        <input
                            type="password"
                            className={`border rounded-md p-2 w-full ${
                                errors.repeatPassword ? 'border-red-500' : ''
                            }`}
                            id="repeatPassword"
                            placeholder="Repite la nueva contraseña"
                            {...register('repeatPassword', {
                                required:
                                    'Repetir la nueva contraseña es obligatoria',
                                validate: (value) =>
                                    value === newPasswordVerify ||
                                    'Las nueva contraseña no coincide',
                            })}
                        />
                        {errors.repeatPassword?.message && (
                            <ErrorMessage>
                                {String(errors.repeatPassword?.message)}
                            </ErrorMessage>
                        )}
                    </div>
                </div>
                <div className="flex justify-center pt-5">
                    <input
                        type="submit"
                        value={'Actualizar contraseña'}
                        className="btn-confirm w-fit"
                    />
                </div>
            </form>
        </div>
    );
}
