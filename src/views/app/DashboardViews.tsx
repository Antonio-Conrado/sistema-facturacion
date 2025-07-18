import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '@/api/dashboard/dashboard';
import Card from '@/components/dashboard/Card';
import DataNotFound from '@/components/Utils/DataNotFound';
import Spinner from '@/components/Utils/Spinner';
import { getTodayMidnightISOString } from '@/utils/validateDate';
import HorizontalBars from '@/components/dashboard/HorizontalBars';

export default function DashboardViews() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardSummary,
    });

    if (isError) return <DataNotFound />;
    if (isLoading) return <Spinner />;

    const todaySales = data?.sales.byDay.find(
        (sale) => sale.day === getTodayMidnightISOString(),
    );
    const todayPurchases = data?.purchases.byDay.find(
        (sale) => sale.day === getTodayMidnightISOString(),
    );

    if (data)
        return (
            <>
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card
                        title="Total de Ventas"
                        subtitle="Ganancias del día"
                        total={data.sales.total}
                        totalDay={todaySales ? todaySales.total : 0}
                    />
                    <Card
                        id={data.sales.lastTransaction.id}
                        date={data.sales.lastTransaction.date}
                        invoiceNumber={data.sales.lastTransaction.invoiceNumber}
                        typeTransaction="SALES"
                        title="Ingreso de la última venta"
                        subtitle="Fecha de registro"
                        total={data.sales.lastTransaction.total}
                    />
                    <Card
                        title="Total de Compras"
                        subtitle="Gastos del día"
                        total={data.purchases.total}
                        totalDay={todayPurchases ? todayPurchases.total : 0}
                    />

                    <Card
                        id={data.purchases.lastTransaction.id}
                        date={data.purchases.lastTransaction.date}
                        invoiceNumber={
                            data.purchases.lastTransaction.invoiceNumber
                        }
                        typeTransaction="PURCHASES"
                        title="Ingreso de la última compra"
                        subtitle="Fecha de registro"
                        total={data.purchases.lastTransaction.total}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <HorizontalBars title="compras" type="sales" data={data} />
                    <HorizontalBars
                        title="ventas"
                        type="purchases"
                        data={data}
                    />
                </div>
            </>
        );
}
