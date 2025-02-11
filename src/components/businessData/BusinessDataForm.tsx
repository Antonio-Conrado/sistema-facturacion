import { BusinessData } from '@/types/index';
import Input from '../Utils/Input';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type BusinessDataFormProps = {
    isReadOnly: boolean;
    register: UseFormRegister<BusinessData>;
    errors: FieldErrors<BusinessData>;
};

export default function BusinessDataForm({
    isReadOnly,
    register,
    errors,
}: BusinessDataFormProps) {
    return (
        <>
            <Input
                title="Nombre"
                name="name"
                msg="El nombre del negocio es obligatorio"
                type="text"
                isReadOnly={isReadOnly}
                register={register}
                errors={errors}
            />
            <Input
                title="Ruc"
                name="ruc"
                msg="El ruc del negocio es obligatorio"
                type="text"
                isReadOnly={isReadOnly}
                register={register}
                errors={errors}
            />
            <Input
                title="Dirección"
                name="direction"
                msg="La dirección del negocio es obligatorio"
                type="text"
                isReadOnly={isReadOnly}
                register={register}
                errors={errors}
            />
            <Input
                title="Teléfono"
                name="telephone"
                msg="El teléfono del negocio es obligatorio"
                type="text"
                isReadOnly={isReadOnly}
                register={register}
                errors={errors}
            />
        </>
    );
}
