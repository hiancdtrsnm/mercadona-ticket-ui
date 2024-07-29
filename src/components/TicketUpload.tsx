import { useState } from 'react';
import TicketTable from './TicketTable';
interface Props {
    api_url: string;
  }
const FileUploadComponent = ({api_url}: Props) => {
    const [file, setFile] = useState(null);
    const [elements, setElements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // @ts-ignore
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("¡Por favor, selecciona un archivo primero!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setIsLoading(true);

        try {
            const response = await fetch(api_url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('La respuesta de la red no fue satisfactoria');
            }

            const data = await response.json();
            setElements(data);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Ocurrió un error al abrir el archivo. Por favor, verifica que el archivo sea un ticket digital de Mercadona.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl md:text-3xl w-full mb-2">Sube tu ticket de Mercadona aqui:</h1>
            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className={`block w-full text-sm text-gray-900 border ${file ? 'border-green-500' : 'border-gray-300'} rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4 p-2`}
            />
            <button
                onClick={handleUpload}
                className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none`}
                disabled={isLoading}
            >
                {isLoading ? 'Subiendo...' : 'Subir'}
            </button>

            {elements.length > 0 && <TicketTable items={elements} />}
        </div>
    );
};

export default FileUploadComponent;
