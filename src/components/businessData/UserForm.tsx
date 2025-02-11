import { User } from '@/types/index';
import Input from '../Utils/Input';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type UserFormProps = {
    isReadOnly: boolean;
    register: UseFormRegister<User>;
    errors: FieldErrors<User>;
};

export default function UserForm({
    isReadOnly,
    register,
    errors,
}: UserFormProps) {
    return (
        <>
            <Input
                title="Nombre"
                name="name"
                msg="El nombre es obligatorio"
                type="text"
                isReadOnly={isReadOnly}
                register={register}
                errors={errors}
            />
            <Input
                title="Apellido"
                name="surname"
                msg="El apellido es obligatorio"
                type="text"
                isReadOnly={isReadOnly}
                register={register}
                errors={errors}
            />
            <Input
                title="Rol"
                name="roles.name"
                msg="El rol es obligatorio"
                type="text"
                isReadOnly={true}
                register={register}
                errors={errors}
            />
            <Input
                title="Teléfono"
                name="telephone"
                msg=""
                type="text"
                isReadOnly={isReadOnly}
                register={register}
                errors={errors}
            />
        </>
    );
}
