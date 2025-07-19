import { AuthForm } from '@/types/index';
import ErrorMessage from '../Utils/ErrorMessage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type InputsProps = {
    register: UseFormRegister<AuthForm>;
    errors: FieldErrors<AuthForm>;
};
export default function InputEmail({ register, errors }: InputsProps) {
    console.log(errors);
    return (
        <>
            <div className="flex flex-col gap-1  items-start md:gap-3 text-gray-800">
                <label htmlFor="email" className="font-semibold">
                    Email
                </label>
                <div className="flex w-full">
                    <input
                        type="email"
                        placeholder="Ingresa email"
                        className={`border rounded-md p-2 w-full ${
                            errors.email ? 'border-red-500' : ''
                        }`}
                        {...register('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido',
                            },
                        })}
                    />
                </div>{' '}
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}
