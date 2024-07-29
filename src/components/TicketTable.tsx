import React from 'react';

interface Product {
    producto: string;
    precio: number;
    cantidad: number;
    timestamp: string;
}

interface Props {
    items: Product[];
}

const ProductList: React.FC<Props> = ({ items }) => {
    const downloadCSV = () => {
        const datatable = document.querySelector('.datatable');
        if (!datatable) return;

        const items = Array.from(datatable.children).map((row) => {
            const cells = row.children;
            return {
                producto: cells[0].children[1].textContent || '',
                precio: cells[1].children[1].textContent || '',
                cantidad: cells[2].children[1].textContent || '',
                timestamp: cells[3].children[1].textContent || '',
            };
        });

        const csv = 'Producto,Precio,Cantidad,Fecha\n' + items.map((item) => `${item.producto},${item.precio},${item.cantidad},${item.timestamp}`).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-mercadona-${items[0].timestamp}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-4">
            <table className="w-full border-collapse border border-neutral-300 hidden md:table">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Producto</th>
                        <th className="border px-4 py-2">Precio</th>
                        <th className="border px-4 py-2">Cantidad</th>
                        <th className="border px-4 py-2">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.producto}>
                            <td className="border px-4 py-2">{item.producto}</td>
                            <td className="border px-4 py-2">{item.precio}</td>
                            <td className="border px-4 py-2">{item.cantidad}</td>
                            <td className="border px-4 py-2">{item.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col gap-4 md:hidden datatable">
                {items.map((item) => (
                    <div className="border border-neutral-300 p-4" key={item.producto}>
                        <div className="mb-2">
                            <span className="font-semibold">Producto: </span>
                            <span>{item.producto}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Precio: </span>
                            <span>{item.precio}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Cantidad: </span>
                            <span>{item.cantidad}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Fecha: </span>
                            <span>{item.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 px-4 md:px-16">
                <button onClick={downloadCSV} className="p-2 bg-blue-500 text-white rounded-md">Descargar CSV</button>
            </div>


            <style >{`
        @media (max-width: 640px) {
          .lg\\:hidden {
            display: block !important;
          }
          .hidden {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
};

export default ProductList;
