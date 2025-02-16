import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Block, Edit, Image, Key } from '@mui/icons-material';
import BasicModal from '../Utils/BasicModal';
import { useState } from 'react';
import SuspendUser from './SuspendUser';
import { listSecurityHead } from '@/data/tableHeadData';
import TableBodyCellSecurity from './TableBodyCellSecurity';
import useAuth from '@/hooks/useAuth';
import SecurityForm from './SecurityForm';
import { User, Users } from '@/types/index';
import useToast from '@/hooks/useNotifications';
import ChangeImage from './ChangeImage';
import ChangePasswordForm from './ChangePasswordForm';
import BasicTable from '../Utils/BasicTable';

enum ModalAction {
    Edit = 'edit',
    ChangePassword = 'changePassword',
    ChangeImage = 'changeImage',
    Suspend = 'suspend',
}

export default function SecurityData({ data }: { data: Users }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const toast = useToast();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [user, setUser] = useState<User>();
    const { userAuth } = useAuth();

    const handleOpenModal = (action: ModalAction, id: number) => {
        setOpenModal(true);
        setModalContent(action);
        const user = data.find((user) => user.id === id);
        if (!user) {
            toast.error(
                'Hubo un error! Intenta nuevamente o actualiza la página',
            );
            setOpenModal(false);
            return;
        }
        setUser(user);
    };
    return (
        <>
            <BasicTable
                rows={data}
                listHead={listSecurityHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            >
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
                            <TableBodyCellSecurity row={row} />
                            {/* actions */}
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
                                <Key
                                    className="text-zinc-800  hover:text-zinc-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.ChangePassword,
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
                                {row.id !== userAuth.id && (
                                    <>
                                        <Block
                                            className="text-red-800 hover:text-red-700 cursor-pointer"
                                            onClick={() =>
                                                handleOpenModal(
                                                    ModalAction.Suspend,
                                                    row.id,
                                                )
                                            }
                                        />
                                    </>
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
                {modalContent === ModalAction.Edit && user && (
                    <SecurityForm
                        user={user}
                        onClose={() => setOpenModal(false)}
                    />
                )}
                {modalContent === ModalAction.ChangePassword && user && (
                    <ChangePasswordForm
                        id={user.id}
                        onClose={() => setOpenModal(false)}
                    />
                )}
                {modalContent === ModalAction.ChangeImage && user && (
                    <ChangeImage user={user} />
                )}
                {modalContent === ModalAction.Suspend && user && (
                    <SuspendUser
                        user={user}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </BasicModal>
        </>
    );
}
