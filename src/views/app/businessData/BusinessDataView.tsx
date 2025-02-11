import {
    updateBusinessDataAPI,
    uploadImageBusinessDataAPI,
} from '@/api/businessData/businessData';
import BusinessDataForm from '@/components/businessData/BusinessDataForm';
import InputEmailsForm from '@/components/Utils/InputEmailForm';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import PageTitle from '@/components/Utils/PageTitle';
import useToast from '@/hooks/useNotifications';
import { BusinessData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function BusinessDataView() {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const toast = useToast();
    // Get business information from cache
    const queryClient = useQueryClient();
    const info = queryClient.getQueryData<BusinessData>(['businessData']);

    const initialValues: BusinessData = {
        name: info ? info?.name : '',
        email: info ? info?.email : '',
        image: info ? info.image : '',
        direction: info ? info?.direction : '',
        id: 1,
        ruc: info ? info?.ruc : '',
        description: info ? info?.description : '',
        telephone: info ? info?.telephone : '',
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const mutationData = useMutation({
        mutationFn: updateBusinessDataAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['businessData'] });
            setIsReadOnly(true);
        },
    });

    const handleData = (formData: BusinessData) => {
        const { image, ...data } = formData;
        mutationData.mutate(data);
    };

    return (
        <>
            <PageTitle
                title="Datos del Negocio"
                isReadOnly={isReadOnly}
                setIsReadOnly={setIsReadOnly}
            />
            <div className="bg-white  py-10 rounded-b-lg shadow-lg">
                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className=" grid grid-cols-2 gap-5 mb-5 px-5">
                        <BusinessDataForm
                            isReadOnly={isReadOnly}
                            register={register}
                            errors={errors}
                        />

                        <InputEmailsForm
                            isReadOnly={isReadOnly}
                            register={register}
                            errors={errors}
                        />
                        <div className="flex flex-col justify-center items-center gap-2">
                            <img
                                src={info?.image || '/img/logo.png'}
                                alt="image"
                                className="h-20 w-fit rounded-full "
                            />

                            {!isReadOnly && (
                                <InputFileUpload
                                    text="Subir Imagen"
                                    infoCache="businessData"
                                    mutationFn={uploadImageBusinessDataAPI}
                                />
                            )}
                        </div>
                    </div>

                    {!isReadOnly && (
                        <div className="flex justify-center ">
                            <input
                                type="submit"
                                className="btn-primary-form"
                                value={'Guardar cambios'}
                            />
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}
