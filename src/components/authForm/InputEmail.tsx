import { AuthForm } from "@/types/index";
import ErrorMessage from "../Utils/ErrorMessage";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type InputsProps = {
    register: UseFormRegister<AuthForm>
    errors: FieldErrors<AuthForm>
}
export default function InputEmail({ register, errors }: InputsProps) {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">
                <label htmlFor="email" className="md:w-20">Email:</label>
                <div className="flex-grow">
                    <input
                        type="email"
                        className="rounded-sm p-1 border-2 w-full"
                        {...register('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
            </div>
        </>
    );
}