import { Warning } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

type ToolTipProps = {
    msg?: string;
    isError: boolean;
    hasPercentage?: boolean;
    children: React.JSX.Element;
};

export default function ToolTipComponent({
    msg = '',
    isError,
    hasPercentage,
    children,
}: ToolTipProps) {
    return (
        <Tooltip
            title={isError ? msg : ''}
            arrow
            disableHoverListener={!isError}
        >
            <div className="relative inline-block w-full">
                <div
                    className={`inline-flex items-center w-full ${
                        isError ? 'pr-10' : ''
                    }`}
                >
                    {children}

                    {hasPercentage && (
                        <span className="ml-2 text-gray-700 select-none z-0">
                            %
                        </span>
                    )}
                </div>

                {isError && (
                    <>
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-red-200 opacity-75 animate-ping"></span>
                        <Warning
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-red-700 z-10"
                            fontSize="small"
                        />
                    </>
                )}
            </div>
        </Tooltip>
    );
}
