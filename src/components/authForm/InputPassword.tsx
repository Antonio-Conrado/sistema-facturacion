import { AuthForm } from '@/types/index';
import ErrorMessage from '../Utils/ErrorMessage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type InputsProps = {
    register: UseFormRegister<AuthForm>;
    errors: FieldErrors<AuthForm>;
};
export default function InputPassword({ register, errors }: InputsProps) {
    return (
        <>
            <div className="flex flex-col gap-1  items-start md:gap-3 text-gray-800">
                <label htmlFor="password" className="font-semibold">
                    Contraseña
                </label>
                <div className="flex w-full">
                    <input
                        type="password"
                        placeholder="Ingresa contraseña"
                        className={`border rounded-md p-2 w-full ${
                            errors.password ? 'border-red-500' : ''
                        }`}
                        {...register('password', {
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message:
                                    'La contraseña debe tener al menos 6 caracteres',
                            },
                        })}
                    />
                </div>
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}
