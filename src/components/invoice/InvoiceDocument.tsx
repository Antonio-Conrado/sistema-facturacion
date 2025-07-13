import { createTw } from 'react-pdf-tailwind';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { BusinessData, Sale } from '@/types/index';
import { formatDate } from '@/utils/formatDate';
import { PaymentMethodsLabel } from '@/data/index';
import { formatCurrency } from '../../utils/formatCurrency';

const tw = createTw({ theme: {}, extend: {} });

type InvoiceDocumentProps = {
    data: Sale;
    businessData: BusinessData;
};

const InvoiceDocument = ({ data, businessData }: InvoiceDocumentProps) => {
    return (
        <Document>
            <Page size="A4" style={tw('bg-white p-6 text-sm')}>
                {/* Business Info */}
                <View style={tw('text-center mb-4')}>
                    <Text style={tw('text-xl font-bold text-gray-900')}>
                        FACTURA
                    </Text>
                    <Image
                        src={`${businessData.image || '/img/no-image.jpg'}`}
                        style={tw('h-20 w-20 mx-auto my-2 rounded-full')}
                    />
                    <Text style={tw('font-bold text-xl')}>
                        {businessData.name}
                    </Text>
                    <Text>{businessData.direction}</Text>

                    {businessData.email && (
                        <Text>
                            <Text style={tw('font-bold')}>Email: </Text>
                            <Text style={tw('font-normal')}>
                                {businessData.email}
                            </Text>
                        </Text>
                    )}
                    {businessData.telephone && (
                        <Text>
                            <Text style={tw('font-bold')}>Teléfono: </Text>
                            <Text style={tw('font-normal')}>
                                {businessData.telephone}
                            </Text>
                        </Text>
                    )}
                    <Text>
                        <Text style={tw('font-bold')}>RUC: </Text>
                        <Text style={tw('font-normal')}>
                            {businessData.ruc}
                        </Text>
                    </Text>
                </View>

                {/* Sale Info */}
                <View style={tw('mb-4')}>
                    <Text>
                        <Text style={tw('font-bold')}>Vendedor: </Text>
                        <Text style={tw('font-normal')}>
                            {`${data.users.name} ${data.users.surname}`}
                        </Text>
                    </Text>

                    <Text>
                        <Text style={tw('font-bold')}>Fecha de emisión: </Text>
                        <Text style={tw('font-normal')}>
                            {formatDate(data.date)}
                        </Text>
                    </Text>

                    <Text>
                        <Text style={tw('font-bold')}>Número de factura: </Text>
                        <Text style={tw('font-normal')}>
                            {data.invoiceNumber}
                        </Text>
                    </Text>

                    <Text>
                        <Text style={tw('font-bold')}>Método de pago: </Text>
                        <Text style={tw('font-normal')}>
                            {data.paymentMethods.name}
                        </Text>
                    </Text>

                    {data.paymentMethods.name ===
                        PaymentMethodsLabel.bankTransfer && (
                        <Text>
                            <Text style={tw('font-bold')}>
                                Referencia bancaria:{' '}
                            </Text>
                            <Text style={tw('font-normal')}>
                                {data.transactionReference ||
                                    'No se ingreso una referencia bancaria'}
                            </Text>
                        </Text>
                    )}

                    {/* Anulación */}
                    {!data.status && (
                        <>
                            <Text style={tw('mt-2 text-red-600 font-bold')}>
                                ¡FACTURA ANULADA!
                            </Text>
                            <Text>
                                <Text style={tw('font-bold')}>
                                    Motivo de anulación:{' '}
                                </Text>
                                <Text style={tw('font-normal')}>
                                    {data.cancellationReason || 'Sin motivo'}
                                </Text>
                            </Text>
                            {data.annulledAt && (
                                <Text>
                                    <Text style={tw('font-bold')}>
                                        Fecha de anulación:{' '}
                                    </Text>
                                    <Text style={tw('font-normal')}>
                                        {formatDate(data.annulledAt)}
                                    </Text>
                                </Text>
                            )}
                        </>
                    )}
                </View>

                {/* Product Table */}
                <View style={tw('border-t border-b py-2 mb-4')}>
                    <Text style={tw('font-bold mb-2 text-center')}>
                        Detalle de productos
                    </Text>

                    {/* Table header */}
                    <View style={tw('flex-row border-b pb-1')}>
                        <Text style={tw('w-[15%] font-bold text-center')}>
                            Código
                        </Text>
                        <Text style={tw('w-[30%] font-bold text-center')}>
                            Producto
                        </Text>
                        <Text style={tw('w-[15%] font-bold text-center')}>
                            Precio
                        </Text>
                        <Text style={tw('w-[10%] font-bold text-center')}>
                            Cantidad
                        </Text>
                        <Text style={tw('w-[15%] font-bold text-center')}>
                            Descuento
                        </Text>
                        <Text style={tw('w-[15%] font-bold text-center')}>
                            Subtotal
                        </Text>
                    </View>

                    {/* Table rows */}
                    {data.detailsSales.map((item, index) => (
                        <View key={index} style={tw('flex-row py-1 border-b')}>
                            <Text style={tw('w-[15%] text-center')}>
                                {
                                    item.storedProducts.detailsProducts.products
                                        .code
                                }
                            </Text>
                            <Text style={tw('w-[30%] text-center')}>
                                {
                                    item.storedProducts.detailsProducts.products
                                        .name
                                }
                            </Text>
                            <Text style={tw('w-[15%] text-center')}>
                                {formatCurrency(item.price)}
                            </Text>
                            <Text style={tw('w-[10%] text-center')}>
                                {item.amount}
                            </Text>
                            <Text style={tw('w-[15%] text-center')}>
                                {formatCurrency(item.discount)}
                            </Text>
                            <Text style={tw('w-[15%] text-center')}>
                                {formatCurrency(item.subtotal)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={tw('text-right')}>
                    <Text>
                        <Text style={tw('font-bold')}>Subtotal: </Text>
                        <Text style={tw('font-normal')}>
                            ${data.subtotal.toFixed(2)}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={tw('font-bold')}>Descuento: </Text>
                        <Text style={tw('font-normal')}>
                            ${data.discount.toFixed(2)}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={tw('font-bold')}>IVA: </Text>
                        <Text style={tw('font-normal')}>
                            ${data.iva.toFixed(2)}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={tw('font-bold')}>Total: </Text>
                        <Text style={tw('font-normal')}>
                            ${data.total.toFixed(2)}
                        </Text>
                    </Text>
                </View>

                {/* Footer */}
                <View style={tw('mt-6')}>
                    <Text style={tw('text-center text-xl font-bold')}>
                        ¡Gracias por preferirnos!
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoiceDocument;
