import { getCategoriesAPI } from '@/api/catalogs/category';
import CategoriesData from '@/components/catalogs/category/CategoriesData';
import CategoryForm from '@/components/catalogs/category/CategoryForm';
import BasicModal from '@/components/Utils/BasicModal';
import DataNotFound from '@/components/Utils/DataNotFound';
import InputSearch from '@/components/Utils/InputSearch';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { ModalAction } from '@/data/index';
import { Categories } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function CategoryView() {
    const [openModal, setOpenModal] = useState(false);
    const [filteredResults, setFilteredResults] = useState<Categories>([]);

    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesAPI,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <DataNotFound />;
    if (categories)
        return (
            <>
                <PageTitle title="Categorías" />
                <div className="bg-white  py-5 px-5 rounded-b-lg shadow-lg">
                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center mb-8">
                        {/* register user */}
                        <button
                            className="btn-confirm"
                            onClick={() => setOpenModal(true)}
                        >
                            Agregar Categoría
                        </button>
                        {openModal && (
                            <BasicModal
                                openModal={openModal}
                                onClose={() => setOpenModal(false)}
                            >
                                <CategoryForm
                                    onClose={() => setOpenModal(false)}
                                    action={ModalAction.Add}
                                />
                            </BasicModal>
                        )}

                        <InputSearch
                            value={['name']}
                            placeholder="Ingresa tu búsqueda por nombre"
                            dataCache="categories"
                            setFilteredResults={setFilteredResults}
                        />
                    </div>

                    {/* data */}
                    <CategoriesData
                        data={
                            filteredResults.length > 0
                                ? filteredResults
                                : categories
                        }
                    />
                </div>
            </>
        );
}
