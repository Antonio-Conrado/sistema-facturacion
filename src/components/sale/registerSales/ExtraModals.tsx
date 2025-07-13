import ProductForm from '@/components/products/ProductForm';
import BasicModal from '@/components/Utils/BasicModal';
import { ModalAction } from '@/data/index';
import { useAppStore } from '@/store/useAppStore';

export default function ExtraModals() {
    const isActiveModal = useAppStore((store) => store.isActiveModal);
    const activeModalKey = useAppStore((store) => store.activeModalKey);
    const addedFromModal = useAppStore((store) => store.addedFromModal);

    return (
        <>
            {/* show modal to add  a products */}
            {isActiveModal && activeModalKey === 'products' && (
                <BasicModal
                    openModal={isActiveModal}
                    onClose={() => addedFromModal(false, 'products')}
                >
                    <ProductForm
                        onClose={() => addedFromModal(false, 'products')}
                        action={ModalAction.Add}
                    />
                </BasicModal>
            )}
        </>
    );
}
