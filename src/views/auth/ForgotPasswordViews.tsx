
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { forgotPassword } from '@/api/auth/auth';
import useToast from '@/hooks/useNotifications';
import { AuthForm } from '@/types/index';
import InputEmail from '@/components/authForm/InputEmail';
import Spinner from '@/components/Utils/Spinner';

export default function ForgotPasswordViews() {
    const toast = useToast()
    const { register, reset, handleSubmit, formState: { errors } } = useForm<AuthForm>({
        defaultValues: {
            email: ''
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if(data) toast.success(data)
            reset()
        }
    })
    
    const handleData = (formData: AuthForm) => {
        mutate(formData)
    }

    return (
        <div className="bg-white rounded-md py-10 px-5">
            <h2 className="text-2xl text-center pb-4 text-cyan-700">Olvidé password</h2>

            <form
                onSubmit={handleSubmit(handleData)}
                className='text-gray-700 flex flex-col justify-around gap-5 '
                noValidate
            >
                <InputEmail
                    register={register}
                    errors={errors}
                />
                <input
                    type="submit"
                    className='btn-primary'
                    value={'Restablecer password'}
                />
            </form>
            {isPending && <Spinner />}

            <div className="flex flex-col md:flex-row justify-around gap-4 pt-5">
                <Link
                    to={'/registrar'}
                    className='text-sm bg-cyan-8 text-gray-500 hover:text-gray-700 text-center'
                >
                    ¿No tienes una cuenta? Registrarse
                </Link>
                <Link
                    to={'/login'}
                    className='text-sm text-gray-500 hover:text-gray-700 text-center'
                >
                    ¿Tienes una cuenta? Iniciar sesión
                </Link>
            </div>

        </div>
    );
}