import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/api/auth/auth';
import useToast from '@/hooks/useNotifications';
import { AuthForm } from '@/types/index';
import InputEmail from '@/components/authForm/InputEmail';
import InputPassword from '@/components/authForm/InputPassword';
import Spinner from '@/components/Utils/Spinner';
import useAuth from '@/hooks/useAuth';

export default function LoginViews() {
    const navigate = useNavigate();
    const toast = useToast();
    const { setTokenJWT } = useAuth();
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
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: async (data) => {
            if (data) localStorage.setItem('token', data);
            setTokenJWT(localStorage.getItem('token'));
            reset();
            toast.success('Sesión iniciada correctamente');
            navigate('/ventas');
        },
    });

    const handleData = (formData: AuthForm) => {
        mutate(formData);
    };

    return (
        <div className="bg-white rounded-md py-10 px-5">
            <h2 className="text-2xl text-center pb-4 text-cyan-700">
                Iniciar sesión
            </h2>

            <form
                onSubmit={handleSubmit(handleData)}
                className="text-gray-700 flex flex-col justify-around gap-5 "
                noValidate
            >
                <InputEmail register={register} errors={errors} />
                <InputPassword register={register} errors={errors} />
                <input
                    type="submit"
                    className="btn-primary"
                    value={'Iniciar sesión'}
                />
            </form>
            {isPending && <Spinner />}

            <div className="flex flex-col md:flex-row justify-around gap-4 pt-5">
                <Link
                    to={'/registrar'}
                    className="text-sm bg-cyan-8 text-gray-500 hover:text-gray-700 text-center"
                >
                    ¿No tienes una cuenta? Registrarse
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
