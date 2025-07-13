import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getBanksAPI } from '@/api/catalogs/bank';
import BanksData from '@/components/catalogs/bank/BanksData';
import BankForm from '@/components/catalogs/bank/BankForm';
import BasicModal from '@/components/Utils/BasicModal';
import DataNotFound from '@/components/Utils/DataNotFound';
import InputSearch from '@/components/Utils/InputSearch';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { ModalAction } from '@/data/index';
import { Banks } from '@/types/index';

export default function BankView() {
    const [openModal, setOpenModal] = useState(false);
    const [filteredResults, setFilteredResults] = useState<Banks>([]);

    const {
        data: banks,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['banks'],
        queryFn: getBanksAPI,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <DataNotFound />;
    if (banks)
        return (
            <>
                <PageTitle title="Bancos" />
                <div className="bg-white  py-5 px-5 rounded-b-lg shadow-lg">
                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center mb-8">
                        <button
                            className="btn-confirm"
                            onClick={() => setOpenModal(true)}
                        >
                            Agregar Banco
                        </button>
                        {openModal && (
                            <BasicModal
                                openModal={openModal}
                                onClose={() => setOpenModal(false)}
                            >
                                <BankForm
                                    onClose={() => setOpenModal(false)}
                                    action={ModalAction.Add}
                                />
                            </BasicModal>
                        )}

                        <InputSearch
                            value={['name']}
                            placeholder="Ingresa tu búsqueda por nombre"
                            dataCache="banks"
                            setFilteredResults={setFilteredResults}
                        />
                    </div>

                    {/* data */}
                    <BanksData
                        data={
                            filteredResults.length > 0 ? filteredResults : banks
                        }
                    />
                </div>
            </>
        );
}
