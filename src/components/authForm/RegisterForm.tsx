import { AuthForm } from '@/types/index';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from '../Utils/Input';

type InputsProps = {
    register: UseFormRegister<AuthForm>;
    errors: FieldErrors<AuthForm>;
};
export default function RegisterForm({ register, errors }: InputsProps) {
    return (
        <>
            <Input
                title="Nombre"
                name="name"
                type="text"
                msg="El nombre debe ser obligatorio"
                isReadOnly={false}
                errors={errors}
                register={register}
            />
            <Input
                title="Apellido"
                name="surname"
                type="text"
                msg="El apellido debe ser obligatorio"
                isReadOnly={false}
                errors={errors}
                register={register}
            />

            <Input
                title="Telefóno"
                name="telephone"
                type="text"
                msg=""
                isReadOnly={false}
                errors={errors}
                register={register}
            />
        </>
    );
}
