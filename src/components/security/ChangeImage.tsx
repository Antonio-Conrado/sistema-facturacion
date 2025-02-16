import { User } from '@/types/index';
import InputFileUpload from '../Utils/InputFileUpload';
import { uploadImageUserAPI } from '@/api/user/user';

type ChangeRolProps = {
    user: User;
};

export default function ChangeImage({ user }: ChangeRolProps) {
    return (
        <div className="flex justify-center w-72 mx-auto">
            <InputFileUpload
                text="Subir Imagen"
                infoCache="AllUsers"
                mutationFn={uploadImageUserAPI}
                id={user.id}
            />
        </div>
    );
}
