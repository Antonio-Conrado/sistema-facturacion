import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    MutationFunction,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import useToast from '@/hooks/useNotifications';
import Spinner from './Spinner';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type InputFileUploadProps = {
    text: string;
    infoCache: string;
    mutationFn: MutationFunction<
        string | undefined,
        { id?: number; file: File }
    >;
    id?: number;
    width?: string;
};
export default function InputFileUpload({
    text,
    infoCache,
    id,
    width,
    mutationFn,
}: InputFileUploadProps) {
    const toast = useToast();
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn,
        onError(error) {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({
                queryKey: id ? [infoCache, id] : [infoCache],
            });
        },
    });

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        mutate(id ? { id, file } : { file });
        if (fileInputRef.current) {
            // Clean the file input field
            fileInputRef.current.value = '';
        }
    };
    if (isPending) return <Spinner />;

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className={width || 'w-2/4 '}
            sx={{
                background: '#7e22ce',
                textTransform: 'lowercase',
            }}
        >
            {text}
            <VisuallyHiddenInput
                ref={fileInputRef}
                type="file"
                onChange={(event) => handleUploadFile(event)}
                multiple
            />
        </Button>
    );
}
