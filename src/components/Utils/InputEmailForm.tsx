import ErrorMessage from './ErrorMessage';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Path,
} from 'react-hook-form';

type InputEmailsFormProps<T extends FieldValues> = {
    isReadOnly: boolean;
    requiredMsg?: string;
    errors: FieldErrors<T>;
    register: UseFormRegister<T>;
};

export default function InputEmailsForm<T extends FieldValues>({
    isReadOnly,
    requiredMsg,
    errors,
    register,
}: InputEmailsFormProps<T>) {
    return (
        <>
            <div className="flex flex-col gap-1 items-start md:gap-3 text-gray-800">
                <label htmlFor="email" className="w-24 font-semibold">
                    Email
                </label>
                <div className=" flex-col w-full">
                    <input
                        id="email"
                        type="email"
                        className={`border rounded-md p-2 w-full ${
                            errors.email ? 'border-red-500' : ''
                        }`}
                        readOnly={isReadOnly}
                        placeholder="Ingrese el email"
                        {...register('email' as Path<T>, {
                            required: requiredMsg,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido',
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>
                            {errors.email?.message?.toString()}
                        </ErrorMessage>
                    )}
                </div>
            </div>
        </>
    );
}
