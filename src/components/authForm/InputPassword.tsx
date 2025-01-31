import { AuthForm } from "@/types/index";
import ErrorMessage from "../Utils/ErrorMessage";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type InputsProps = {
    register: UseFormRegister<AuthForm>
    errors: FieldErrors<AuthForm>
}
export default function InputPassword({ register, errors }: InputsProps) {
    
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">
                <label htmlFor="password" className="md:w-20">Password:</label>
                <div className="flex-grow">
                    <input
                        type="password"
                        className="rounded-sm p-1 border-2 w-full"
                        {...register('password', {
                            required: 'El password es obligatorio',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres',
                            },
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>
            </div>
            
        </>
    );
}