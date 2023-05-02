import { useState } from 'react';
import './App.css';
import { FileInput } from './components/FileInput';

import type { Register } from './models';

import { EmployeesTree } from './components/Tree';
import { Header } from './models/Header';
import { Preview } from './components/Preview';

function App() {
  const [data, setData] = useState<Register[] | null>(null);
  const [headers, setHeaders] = useState<Header>({
    Mes: 'Mes',
    Nombre: 'Nombre',
    ID: 'ID',
    'Fecha de Ingreso': 'Fecha de Ingreso',
    'Sueldo Bruto': 'Sueldo Bruto',
    División: 'División',
    Area: 'Area',
    Subarea: 'Subarea',
    'ID Lider': 'ID Lider',
    'Nivel Jerárquico': 'Nivel Jerárquico'
  });
  const [confirm, setConfirm] = useState<boolean>(false);

  return (
    <>
      {!data && <FileInput setData={setData} />}
      {data && !confirm && (
        <>
          <Preview headers={headers} data={data} setHeaders={setHeaders} />
          <div className="flex mb-4 p-4">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-green py-2 px-4 border border-blue-500 hover:border-transparent rounded w-1/2 h-12"
              onClick={() => {
                setData(null);
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-green py-2 px-4 border border-blue-500 hover:border-transparent rounded w-1/2 h-12"
              onClick={() => {
                setConfirm(true);
              }}
            >
              Crear organigrama
            </button>
          </div>
        </>
      )}
      {data && confirm && <EmployeesTree headers={headers} data={data} />}
    </>
  );
}

export default App;
