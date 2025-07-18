import { CalendarMonth, Paid, TrendingUp } from '@mui/icons-material';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/formatDate';

type StatCardProps = {
    id?: number;
    date?: string;
    invoiceNumber?: number;
    typeTransaction?: 'PURCHASES' | 'SALES';
    title: string;
    subtitle: string;
    total: number;
    totalDay?: number;
};

export default function Card({
    id,
    date,
    invoiceNumber,
    typeTransaction,
    title,
    subtitle,
    total,
    totalDay,
}: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-xl p-4 min-h-32 ">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full`}>
                    <TrendingUp />
                </div>
                <div>
                    <p className="text-sm text-gray-500">
                        {title}
                        {invoiceNumber && (
                            <span className="font-semibold px-1">
                                {invoiceNumber}
                            </span>
                        )}
                    </p>
                    <p className="text-xl font-semibold text-gray-800">
                        {formatCurrency(total)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
                <div className={`p-3 rounded-full`}>
                    {totalDay != null && totalDay >= 0 ? (
                        <Paid />
                    ) : date ? (
                        <CalendarMonth />
                    ) : null}
                </div>
                <div>
                    <p className="text-sm text-gray-500">{subtitle}</p>

                    {totalDay != null && totalDay >= 0 ? (
                        <p className="text-xl font-semibold text-gray-800">
                            {formatCurrency(totalDay)}
                        </p>
                    ) : date ? (
                        <p className="text-xl font-semibold text-gray-800">
                            {formatDate(date)}
                        </p>
                    ) : null}
                </div>
            </div>

            {typeTransaction && id && (
                <div className="flex justify-end mt-5">
                    <div>
                        {typeTransaction === 'PURCHASES' ? (
                            <Link
                                to={`/historial-compras/${id}`}
                                className="btn-primary "
                            >
                                Ver más información
                            </Link>
                        ) : (
                            <Link
                                to={`/historial-ventas/${id}`}
                                className="btn-primary "
                            >
                                Ver más información
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
