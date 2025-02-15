import { updateUserAPI, uploadImageUserAPI } from '@/api/user/user';
import UserForm from '@/components/businessData/UserForm';
import ChangePasswordForm from '@/components/security/ChangePasswordForm';
import BasicModal from '@/components/Utils/BasicModal';
import InputEmailsForm from '@/components/Utils/InputEmailForm';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import PageTitle from '@/components/Utils/PageTitle';
import useToast from '@/hooks/useNotifications';
import { User } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserView() {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const toast = useToast();
    // Get business information from cache
    const queryClient = useQueryClient();
    const info = queryClient.getQueryData<User>(['user']);

    const initialValues: User = {
        id: 1,
        roleId: info ? info?.roleId : 0,
        name: info ? info?.name : '',
        surname: info ? info?.surname : '',
        telephone: info ? info.telephone : '',
        email: info ? info?.email : '',
        roles: info?.roles ? { name: info.roles.name } : undefined,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const mutationData = useMutation({
        mutationFn: updateUserAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setIsReadOnly(true);
        },
    });

    const handleData = (formData: User) => {
        const { image, roles, ...data } = formData;
        mutationData.mutate(data);
    };

    return (
        <>
            <PageTitle
                title="Datos del Usuario"
                isReadOnly={isReadOnly}
                setIsReadOnly={setIsReadOnly}
            />
            <div className="bg-white py-5  rounded-b-lg shadow-lg">
                {/* change password */}
                <button
                    className=" btn-confirm mb-5 mx-2"
                    onClick={() => setOpenModal(true)}
                >
                    Actualizar contraseña
                </button>
                {openModal && info && (
                    <BasicModal
                        openModal={openModal}
                        onClose={() => setOpenModal(false)}
                    >
                        <ChangePasswordForm
                            id={info.id}
                            onClose={() => setOpenModal(false)}
                        />
                    </BasicModal>
                )}

                {/* form */}
                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className=" grid grid-cols-2 gap-5 mb-5 px-5">
                        <UserForm
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
                                    infoCache="user"
                                    mutationFn={uploadImageUserAPI}
                                    id={info?.id}
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
