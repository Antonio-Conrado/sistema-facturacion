import { validateToken } from "@/api/auth/auth";
import useToast from "@/hooks/useNotifications";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type ResetPasswordTokenProps = {
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResetPasswordToken({ token, setToken, setIsValidToken }: ResetPasswordTokenProps) {
    const toast = useToast()
    const [isComplete, setIsComplete] = useState(false)

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            if (data) toast.success(data)
            setIsValidToken(true)
            setToken(token)
        }
    })
    const handleChange = (token: string) => {
        setIsValidToken(false)
        setToken(token)
    }
    const handleComplete = (token: string) => {
        setIsComplete(true)
        mutate(token)
    }
    return (
        <>
            <h2 className="text-2xl text-center pb-4 text-cyan-700">Reestablecer password</h2>
            <p className="text-gray-500 text-center pb-5">Ingresa el token que ha sído enviado a tu correo</p>

            <div className="flex justify-center gap-4">
                <PinInput
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                </PinInput>
            </div>
        </>
    );
}