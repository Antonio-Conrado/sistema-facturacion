import { getAllRolesAPI } from '@/api/auth/auth';
import { getUsersAPI } from '@/api/user/user';
import SecurityData from '@/components/security/SecurityData';
import RegisterUser from '@/components/security/RegisterUser';
import BasicModal from '@/components/Utils/BasicModal';
import DataNotFound from '@/components/Utils/DataNotFound';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import InputSearch from '@/components/Utils/InputSearch';
import { User } from '@/types/index';

export default function SecurityView() {
    const [filteredResults, setFilteredResults] = useState<User[]>([]); //input search
    const [openModal, setOpenModal] = useState(false);

    //fetch
    const roles = useQuery({
        queryKey: ['roles'],
        queryFn: getAllRolesAPI,
    });
    const user = useQuery({
        queryKey: ['AllUsers'],
        queryFn: getUsersAPI,
    });

    if (user.isLoading && roles.isLoading) return <Spinner />;
    if (user.isError && roles.isError) return <DataNotFound />;
    if (user.data && roles.data)
        return (
            <>
                <PageTitle title="Seguridad" />

                <div className="bg-white  py-5 px-5 rounded-b-lg shadow-lg">
                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center mb-8">
                        {/* register user */}
                        <button
                            className=" btn-confirm"
                            onClick={() => setOpenModal(true)}
                        >
                            Agregar Usuario
                        </button>
                        {openModal && (
                            <BasicModal
                                openModal={openModal}
                                onClose={() => setOpenModal(false)}
                            >
                                <RegisterUser
                                    roles={roles.data}
                                    onClose={() => setOpenModal(false)}
                                />
                            </BasicModal>
                        )}

                        {/* search */}
                        <InputSearch
                            value={['name', 'surname']}
                            placeholder="Ingresa tu búsqueda por nombre"
                            dataCache="AllUsers"
                            setFilteredResults={setFilteredResults}
                        />
                    </div>

                    {/* users */}
                    <SecurityData
                        data={
                            filteredResults.length > 0
                                ? filteredResults
                                : user.data
                        }
                    />
                </div>
            </>
        );
}
