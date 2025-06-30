import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useNotifications';
import { AuthForm } from '@/types/index';
import InputEmail from '@/components/authForm/InputEmail';
import InputPassword from '@/components/authForm/InputPassword';
import Spinner from '@/components/Utils/Spinner';
import RegisterForm from '@/components/authForm/RegisterForm';
import { registerAccount } from '@/api/auth/auth';

export default function RegisterViews() {
    const navigate = useNavigate();
    const toast = useToast();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: registerAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            navigate('/login');
            reset();
        },
    });

    const handleData = (data: AuthForm) => {
        mutate(data);
    };

    return (
        <div className="bg-white rounded-md py-10 px-5">
            <h2 className="text-2xl text-center pb-4 text-cyan-700">
                Registrar usuario
            </h2>

            <form
                onSubmit={handleSubmit(handleData)}
                className="text-gray-700 flex flex-col justify-around gap-5  "
                noValidate
            >
                <RegisterForm register={register} errors={errors} />
                <InputEmail register={register} errors={errors} />
                <InputPassword register={register} errors={errors} />

                <input
                    type="submit"
                    className="btn-primary"
                    value={'Registrarse'}
                />
            </form>
            {isPending && <Spinner />}

            <div className="flex flex-col md:flex-row justify-around gap-4 pt-5">
                <Link
                    to={'/login'}
                    className="text-sm text-gray-500 hover:text-gray-700 text-center"
                >
                    ¿Tienes una cuenta? Iniciar sesión
                </Link>
                <Link
                    to={'/olvide-password'}
                    className="text-sm text-gray-500 hover:text-gray-700 text-center"
                >
                    ¿Olvidaste tu contraseña? Restablecer
                </Link>
            </div>
        </div>
    );
}
