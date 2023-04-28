import { useState } from 'react';
import './App.css';
import { FileInput } from './components/FileInput';

import { Register } from './models';

import { EmployeesTree } from './components/Tree';

function App() {
  const [data, setData] = useState<Register[] | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

  const formatter = new Intl.DateTimeFormat('es', {});

  return (
    <>
      {!data && <FileInput setData={setData} />}
      {data && !confirm && (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>

                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mes</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Ingreso</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sueldo Bruto</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  División</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subarea</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Lider</th>
                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel Jerárquico</th>
              </tr>

            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((register) => {
                return (
                  <tr key={register.ID}>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {formatter.format(register.Mes)}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {register.Nombre}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {register.ID}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {formatter.format(register['Fecha de ingreso'])}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {Number(register['Sueldo bruto']).toLocaleString()}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {register.División}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {register.Area}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {register.Subarea}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {register['ID Lider']}</td>
                    <td className="px-2 py-2 whitespace-nowrap" >
                      {register['Nivel Jerárquico']}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      {data && confirm && <EmployeesTree data={data} />}
    </>
  );
}

export default App;
