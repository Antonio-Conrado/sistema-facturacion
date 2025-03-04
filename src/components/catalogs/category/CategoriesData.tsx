import BasicTable from '@/components/Utils/BasicTable';
import NoDataMessage from '@/components/Utils/NoDataMessage';
import { listCategoryHead } from '@/data/tableHeadData';
import useToast from '@/hooks/useNotifications';
import { Categories, Category } from '@/types/index';
import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import TableBodyCellCategory from './TableBodyCellCategory';
import { Block, Edit } from '@mui/icons-material';
import BasicModal from '@/components/Utils/BasicModal';
import { ModalAction } from '@/data/index';
import SuspendCategory from './SuspendCategory';
import CategoryForm from './CategoryForm';

export default function CategoriesData({ data }: { data: Categories }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [category, setCategory] = useState<Category>();

    const toast = useToast();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction, id: number) => {
        setOpenModal(true);
        setModalContent(action);
        const category = data.find((category) => category.id === id);
        if (!category) {
            toast.error(
                'Hubo un error! Intenta nuevamente o actualiza la página',
            );
            setOpenModal(false);
            return;
        }
        setCategory(category);
    };
    return (
        <>
            <BasicTable
                rows={data}
                listHead={listCategoryHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            >
                {/* validata if data */}
                {data.length === 0 && (
                    <NoDataMessage
                        msg="categorías"
                        cols={listCategoryHead.length}
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
                            <TableBodyCellCategory row={row} />

                            <TableCell align="center" className="space-x-1 ">
                                <Edit
                                    className="text-cyan-800  hover:text-cyan-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.Edit,
                                            row.id,
                                        )
                                    }
                                />
                                <Block
                                    className="text-red-800 hover:text-red-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.Suspend,
                                            row.id,
                                        )
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
            </BasicTable>
            {/* Open a modal when a security action has been executed */}
            <BasicModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
            >
                {modalContent === ModalAction.Edit && category && (
                    <CategoryForm
                        category={category}
                        onClose={() => setOpenModal(false)}
                        action={ModalAction.Edit}
                    />
                )}

                {modalContent === ModalAction.Suspend && category && (
                    <SuspendCategory
                        category={category}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </BasicModal>
        </>
    );
}
