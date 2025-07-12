import { getCategoriesAPI } from '@/api/catalogs/category';
import { getProductsApi } from '@/api/product/product';
import ProductForm from '@/components/products/ProductForm';
import ProductsData from '@/components/products/ProductsData';
import AutoCompleteSearch from '@/components/Utils/AutoCompleteSearch';
import BasicModal from '@/components/Utils/BasicModal';
import DataNotFound from '@/components/Utils/DataNotFound';
import InputSearch from '@/components/Utils/InputSearch';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { ModalAction } from '@/data/index';
import { StoredProducts } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function ProductView() {
    const [openModal, setOpenModal] = useState(false);
    const [filteredResultsByTerm, setFilteredResultsByTerm] =
        useState<StoredProducts>([]);
    const [filteredResults, setFilteredResults] = useState<StoredProducts>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null,
    );

    const products = useQuery({
        queryKey: ['products'],
        queryFn: getProductsApi,
    });

    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesAPI,
    });

    useEffect(() => {
        if (!products.data) return;

        // If the user searches by term, reset the selected category
        if (filteredResultsByTerm.length > 0) {
            setSelectedCategory(null); // Reset select category to null
            setFilteredResults(filteredResultsByTerm);
            return;
        }

        // If there is no search term, apply the category filter
        const filteredByCategory = selectedCategory
            ? products.data.filter(
                  (product) =>
                      product.detailsProducts.products.categoriesId ===
                      selectedCategory,
              )
            : products.data;

        setFilteredResults(filteredByCategory);
    }, [filteredResultsByTerm, selectedCategory, products.data]);

    if (products.isLoading || categories.isLoading) return <Spinner />;
    if (products.isError || categories.isError) return <DataNotFound />;
    if (products.data && categories.data)
        return (
            <>
                <PageTitle title="Productos" />
                <div className="bg-white p-5 rounded-b-lg shadow-lg">
                    <div className="flex flex-col gap-3 md:flex-row items-center  justify-around mt-3">
                        <div className="flex items-center">
                            {/* register user */}
                            <button
                                className="btn-confirm w-fit max-h-10 mx-auto md:mx-0"
                                onClick={() => setOpenModal(true)}
                            >
                                Agregar Producto
                            </button>
                            {openModal && (
                                <BasicModal
                                    openModal={openModal}
                                    onClose={() => setOpenModal(false)}
                                >
                                    <ProductForm
                                        onClose={() => setOpenModal(false)}
                                        action={ModalAction.Add}
                                    />
                                </BasicModal>
                            )}
                        </div>
                        <div className="flex items-center">
                            {categories.data && (
                                <AutoCompleteSearch
                                    options={categories.data.map(
                                        (category) => ({
                                            value: category.id,
                                            label: category.name,
                                        }),
                                    )}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    title="Categoría"
                                />
                            )}
                        </div>
                        <InputSearch
                            value={[
                                'detailsProducts.products.name',
                                'detailsProducts.products.code',
                            ]}
                            placeholder="Ingresa tu búsqueda por código o nombre"
                            dataCache="products"
                            setFilteredResults={setFilteredResultsByTerm}
                        />
                    </div>

                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center mb-8"></div>
                    <ProductsData
                        data={
                            filteredResults.length > 0
                                ? filteredResults
                                : products.data
                        }
                    />
                </div>
            </>
        );
}
