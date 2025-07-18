import { BarChart } from '@mui/x-charts/BarChart';
import { DashboardSummary } from '../../types/index';
import SelectDate from './SelectDate';
import { getDay, getMonth, getYear } from '@/utils/formatDate';
import { useState } from 'react';

const chartSetting = {
    xAxis: [
        {
            label: 'Cantidad C$',
        },
    ],
    margin: { left: 0 },
};

function valueFormatter(value: number | null) {
    return `C$ ${value}`;
}

type HorizontalBarsProps = {
    title: string;
    type: 'sales' | 'purchases';
    data: DashboardSummary;
};

export default function HorizontalBars({
    title,
    type,
    data,
}: HorizontalBarsProps) {
    const [date, setDate] = useState<'byDay' | 'byMonth' | 'byYear' | 'total'>(
        'byMonth',
    );

    let datasetFormatted: {
        label: string;
        total: number;
    }[] = [];

    if (date === 'byMonth') {
        datasetFormatted = data[type].byMonth.map((item) => ({
            ...item,
            label: getMonth(item.month),
        }));
    } else if (date === 'byDay') {
        datasetFormatted = data[type].byDay.map((item) => ({
            ...item,
            label: getDay(item.day),
        }));
    } else if (date === 'byYear') {
        datasetFormatted = data[type].byYear.map((item) => ({
            ...item,
            label: getYear(item.year),
        }));
    } else {
        datasetFormatted = [
            {
                label: 'Total',
                total: data[type].total,
            },
        ];
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-4 mt-5">
            <div className="flex justify-start gap-4">
                <SelectDate date={date} setDate={setDate} />
            </div>

            <BarChart
                dataset={datasetFormatted}
                yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
                series={[
                    {
                        dataKey: 'total',
                        label: title,
                        ...(date !== 'total' && { valueFormatter }),
                        color: type === 'purchases' ? '#0F828C' : '#b14dac',
                    },
                ]}
                layout="horizontal"
                height={500}
                {...chartSetting}
            />
        </div>
    );
}
