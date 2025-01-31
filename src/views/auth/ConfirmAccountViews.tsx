
import { useMutation } from '@tanstack/react-query'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { Link, useNavigate } from 'react-router-dom';
import { confirmAccount } from '@/api/auth/auth';
import useToast from '@/hooks/useNotifications';
import { useState } from 'react';
import Spinner from '@/components/Utils/Spinner';

export default function ConfirmAccountViews() {
    const navigate = useNavigate()
    const toast = useToast()
    const [token, setToken] = useState('')
    const handleChange = (token: string) => {
        setToken(token)
    }

    const handleComplete = (token: string) => {
        mutate(token)
    }
    const { mutate, isPending } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data)
            navigate('/login')
        }
    })

    return (
        <div className="bg-white rounded-md py-10 px-5">
            <h2 className="text-2xl text-center pb-4 text-cyan-700">Confirma tu cuenta con el código enviado a tu email</h2>

            <div className="grid grid-cols-3 grid-rows-2 md:flex justify-around gap-2 w-2/3 mx-auto py-5">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    <PinInputField className='w-10 h-10 rounded-lg border-2 border-gray-300 placeholder-white text-center' />
                    <PinInputField className='w-10 h-10 rounded-lg border-2 border-gray-300 placeholder-white text-center' />
                    <PinInputField className='w-10 h-10 rounded-lg border-2 border-gray-300 placeholder-white text-center' />
                    <PinInputField className='w-10 h-10 rounded-lg border-2 border-gray-300 placeholder-white text-center' />
                    <PinInputField className='w-10 h-10 rounded-lg border-2 border-gray-300 placeholder-white text-center' />
                    <PinInputField className='w-10 h-10 rounded-lg border-2 border-gray-300 placeholder-white text-center' />
                </PinInput>
            </div>
            
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