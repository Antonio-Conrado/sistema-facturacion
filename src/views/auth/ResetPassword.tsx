
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ResetPasswordForm from '@/components/authForm/RepeatPasswordForm';
import ResetPasswordToken from '@/components/authForm/ResetPasswordToken';

export default function ResetPasswordViews() {
    const [isValidToken, setIsValidToken] = useState(false)
    const [token, setToken] = useState('')
    return (
        <div className="bg-white rounded-md py-10 px-5">
            {!isValidToken ? (
                <ResetPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <ResetPasswordForm
                    token={token}
                />
            )}

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