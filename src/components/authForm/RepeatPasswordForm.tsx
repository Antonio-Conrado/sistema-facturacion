import { useForm } from 'react-hook-form';
import { AuthForm } from '@/types/index';
import InputPassword from '@/components/authForm/InputPassword';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordByToken } from '@/api/auth/auth';
import useToast from '@/hooks/useNotifications';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../Utils/ErrorMessage';

export default function RepeatPasswordForm({ token }: { token: string }) {
    const toast = useToast()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<AuthForm>({
        defaultValues: {
            password: '',
            repeatPassword: ''
        }
    })

    const password1 = watch('password')
    const { mutate } = useMutation({
        mutationFn: resetPasswordByToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            if (data) toast.success(data)
            navigate('/login')
        }
    })
    const handleData = (formData: AuthForm) => {
        const data = { formData, token }
        mutate(data)
    }
    return (
        <>
            <h2 className="text-2xl text-center pb-4 text-cyan-700">Restablecer cuenta</h2>

            <form
                onSubmit={handleSubmit(handleData)}
                className='text-gray-700 flex flex-col justify-around gap-5 '
                noValidate
            >
                <InputPassword
                    register={register}
                    errors={errors}
                />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">
                    <label htmlFor="repeatPassword" className="md:w-20">Repetir Password:</label>
                    <div className="flex-grow">
                        <input
                            type="password"
                            className="rounded-sm p-1 border-2 w-full"
                            {...register('repeatPassword', {
                                required: 'Repetir password es obligatorio',
                                validate: (value) =>
                                    value === password1 || 'Las contraseñas no coinciden',
                                minLength: {
                                    value: 6,
                                    message: 'La contraseña debe tener al menos 6 caracteres',
                                },
                            })}
                        />
                        {errors.repeatPassword && <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>}
                    </div>
                </div>

                <input
                    type="submit"
                    className='btn-primary'
                    value={'Restablecer password'}
                />
            </form>
        </>
    );
}