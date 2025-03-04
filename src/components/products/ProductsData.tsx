import { ModalAction } from '@/data/index';
import useToast from '@/hooks/useNotifications';
import { StoredProduct, StoredProducts, User } from '@/types/index';
import { useState } from 'react';
import BasicTable from '../Utils/BasicTable';
import { listProductHead } from '@/data/tableHeadData';
import NoDataMessage from '../Utils/NoDataMessage';
import { TableCell, TableRow } from '@mui/material';
import { Block, Edit, Image, Info } from '@mui/icons-material';
import BasicModal from '../Utils/BasicModal';
import TableBodyCellProduct from './TableBodyCellProduct';
import ProductForm from './ProductForm';
import SuspendProduct from './SuspendProduct';
import InputFileUpload from '../Utils/InputFileUpload';
import { uploadImageProductAPI } from '@/api/product/product';
import { useQuery } from '@tanstack/react-query';

export default function ProductsData({ data }: { data: StoredProducts }) {
    const { data: user } = useQuery<User>({ queryKey: ['user'] });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [product, setProduct] = useState<StoredProduct>();

    const toast = useToast();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction, id: number) => {
        setOpenModal(true);
        setModalContent(action);
        const product = data.find((product) => product.id === id);
        if (!product) {
            toast.error(
                'Hubo un error! Intenta nuevamente o actualiza la página',
            );
            setOpenModal(false);
            return;
        }
        setProduct(product);
    };

    return (
        <>
            <BasicTable
                rows={data}
                listHead={listProductHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            >
                {/* validata if data */}
                {data.length === 0 && (
                    <NoDataMessage
                        msg="productos"
                        cols={listProductHead.length}
                    />
                )}

                {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                        >
                            <TableBodyCellProduct row={row} />

                            <TableCell align="center" className="space-x-1 ">
                                <Info
                                    className="text-cyan-800  hover:text-amber-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.View,
                                            row.id,
                                        )
                                    }
                                />
                                <Edit
                                    className="text-cyan-800  hover:text-cyan-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.Edit,
                                            row.id,
                                        )
                                    }
                                />
                                <Image
                                    className="text-amber-800 hover:text-amber-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.ChangeImage,
                                            row.id,
                                        )
                                    }
                                />
                                {user.roles?.name === 'administrador' && (
                                    <Block
                                        className="text-red-800 hover:text-red-700 cursor-pointer"
                                        onClick={() =>
                                            handleOpenModal(
                                                ModalAction.Suspend,
                                                row.id,
                                            )
                                        }
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
            </BasicTable>
            {/* Open a modal when a security action has been executed */}
            <BasicModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
            >
                {modalContent === ModalAction.View && product && (
                    <ProductForm
                        product={product}
                        isReadOnly={true}
                        onClose={() => setOpenModal(false)}
                        action={ModalAction.View}
                    />
                )}

                {modalContent === ModalAction.Edit && product && (
                    <ProductForm
                        product={product}
                        isReadOnly={false}
                        onClose={() => setOpenModal(false)}
                        action={ModalAction.Edit}
                    />
                )}
                {modalContent === ModalAction.ChangeImage && product && (
                    <div className="flex justify-center w-72 mx-auto">
                        <InputFileUpload
                            text="Subir Imagen"
                            infoCache="products"
                            mutationFn={uploadImageProductAPI}
                            id={product.detailsProducts.id}
                        />
                    </div>
                )}
                {modalContent === ModalAction.Suspend && product && (
                    <SuspendProduct
                        product={product}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </BasicModal>
        </>
    );
}
