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
          <table className="table-auto text-xs w-full bg-primary-2 rounded py-2">
            <thead>
              <tr>
                <th>Mes</th>
                <th>Nombre</th>
                <th>ID</th>
                <th>Fecha de Ingreso</th>
                <th>Sueldo Bruto</th>
                <th>División</th>
                <th>Area</th>
                <th>Subarea</th>
                <th>ID Lider</th>
                <th>Nivel Jerárquico</th>
              </tr>
            </thead>
            <tbody>
              {data.map((register) => {
                return (
                  <tr key={register.ID}>
                    <td>{formatter.format(register.Mes)}</td>
                    <td>{register.Nombre}</td>
                    <td>{register.ID}</td>
                    <td>{formatter.format(register['Fecha de ingreso'])}</td>
                    <td>{Number(register['Sueldo bruto']).toLocaleString()}</td>
                    <td>{register.División}</td>
                    <td>{register.Area}</td>
                    <td>{register.Subarea}</td>
                    <td>{register['ID Lider']}</td>
                    <td>{register['Nivel Jerárquico']}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex gap-2">
            <button
              className="bg-slate-700 rounded p-2"
              onClick={() => {
                setData(null);
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-lime-400 rounded p-2"
              onClick={() => {
                setConfirm(true);
              }}
            >
              Renderizar
            </button>
          </div>
        </>
      )}
      {data && confirm && <EmployeesTree data={data} />}
    </>
  );
}

export default App;
