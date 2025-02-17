type SuspendProps = {
    status: boolean;
    onClose: () => void;
    handleSuspend: () => void;
};

export default function Suspend({
    status,
    onClose,
    handleSuspend,
}: SuspendProps) {
    return (
        <>
            <div className="pb-5 px-2">
                {status ? (
                    <p className="text-gray-800 text-lg">
                        ¿Estás seguro que deseas suspenderlo?
                    </p>
                ) : (
                    <p className="text-gray-800 text-lg">
                        ¿Estás seguro que deseas habilitarlo de nuevo?
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 ">
                <button className="btn-confirm w-fit" onClick={handleSuspend}>
                    Confirmar
                </button>
                <button className="btn-cancel w-fit" onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </>
    );
}
