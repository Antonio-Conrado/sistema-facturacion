import ErrorMessage from './ErrorMessage';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Path,
} from 'react-hook-form';

type InputEmailsFormProps<T extends FieldValues> = {
    isReadOnly: boolean;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
};

export default function InputEmailsForm<T extends FieldValues>({
    isReadOnly,
    register,
    errors,
}: InputEmailsFormProps<T>) {
    return (
        <>
            <div className="flex flex-row items- gap-3 text-gray-800">
                <label htmlFor="email" className="w-24">
                    Email:
                </label>
                <div className="flex flex-col w-full">
                    <input
                        id="email"
                        type="email"
                        className={`border rounded-md p-2 w-full ${
                            errors.email ? 'border-red-500' : ''
                        }`}
                        readOnly={isReadOnly}
                        {...register('email' as Path<T>, {
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
