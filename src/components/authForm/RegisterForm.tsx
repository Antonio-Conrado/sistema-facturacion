import { AuthForm } from "@/types/index";
import ErrorMessage from "../Utils/ErrorMessage";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type InputsProps = {
    register: UseFormRegister<AuthForm>
    errors: FieldErrors<AuthForm>
}
export default function RegisterForm({ register, errors }: InputsProps) {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">
                <label htmlFor="name" className="md:w-20">Nombre:</label>
                <div className="flex-grow">
                    <input
                        type="text"
                        className="rounded-sm p-1 border-2 w-full"
                        {...register('name', {
                            required: 'El nombre es obligatorio',
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">
                <label htmlFor="surname" className="md:w-20">Apellido:</label>
                <div className="flex-grow">
                    <input
                        type="text"
                        className="rounded-sm p-1 border-2 w-full"
                        {...register('surname', {
                            required: 'El apellido es obligatorio',
                        })}
                    />
                    {errors.surname && <ErrorMessage>{errors.surname.message}</ErrorMessage>}
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">
                <label htmlFor="telephone" className="md:w-20">Telefóno:</label>
                <div className="flex-grow">
                    <input
                        type="text"
                        className="rounded-sm p-1 border-2 w-full"
                        {...register('telephone')}
                    />
                </div>
            </div>
        </>
    );
}