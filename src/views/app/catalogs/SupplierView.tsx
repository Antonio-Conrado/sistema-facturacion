import { getSuppliersAPI } from '@/api/catalogs/supplier';
import SupplierForm from '@/components/catalogs/supplier/SupplierForm';
import SuppliersData from '@/components/catalogs/supplier/SuppliersData';
import BasicModal from '@/components/Utils/BasicModal';
import DataNotFound from '@/components/Utils/DataNotFound';
import InputSearch from '@/components/Utils/InputSearch';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { ModalAction } from '@/data/index';
import { Suppliers } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SupplierView() {
    const [openModal, setOpenModal] = useState(false);
    const [filteredResults, setFilteredResults] = useState<Suppliers>([]);

    const {
        data: suppliers,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['suppliers'],
        queryFn: getSuppliersAPI,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <DataNotFound />;
    if (suppliers)
        return (
            <>
                <PageTitle title="Proveedores" />
                <div className="bg-white  py-5 px-5 rounded-b-lg shadow-lg">
                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center mb-8">
                        {/* register user */}
                        <button
                            className="btn-confirm"
                            onClick={() => setOpenModal(true)}
                        >
                            Agregar proveedor
                        </button>
                        {openModal && (
                            <BasicModal
                                openModal={openModal}
                                onClose={() => setOpenModal(false)}
                            >
                                <SupplierForm
                                    onClose={() => setOpenModal(false)}
                                    action={ModalAction.Add}
                                />
                            </BasicModal>
                        )}

                        <InputSearch
                            value={['ruc', 'name']}
                            placeholder="Ingresa tu búsqueda por ruc o nombre "
                            dataCache="suppliers"
                            setFilteredResults={setFilteredResults}
                        />
                    </div>

                    {/* data */}
                    <SuppliersData
                        data={
                            filteredResults.length > 0
                                ? filteredResults
                                : suppliers
                        }
                    />
                </div>
            </>
        );
}
