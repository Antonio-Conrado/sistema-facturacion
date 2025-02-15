import { Edit } from '@mui/icons-material';

type PageTitleProps = {
    title: string;
    isReadOnly?: boolean;
    setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function PageTitle({
    title,
    isReadOnly,
    setIsReadOnly,
}: PageTitleProps) {
    const handleEdit = () => {
        setIsReadOnly?.(!isReadOnly);
    };
    return (
        <div className="bg-cyan-800 text-white py-5 px-3 text-3xl rounded-t-lg">
            {title}{' '}
            {isReadOnly ? (
                <Edit className="cursor-pointer" onClick={handleEdit} />
            ) : null}
        </div>
    );
}
