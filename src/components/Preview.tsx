import { Dispatch, SetStateAction } from 'react';
import { Register } from '../models';
import { Header } from '../models/Header';
import { Input } from './Input';

export function Preview({
  headers,
  setHeaders,
  data
}: {
  setHeaders: Dispatch<SetStateAction<Header>>;
  headers: Header;
  data: Register[];
}) {
  const formatter = new Intl.DateTimeFormat('es', {});
  return (
    <div>

    <h1 className='text-center font-semibold'>PREVISUALIZACION</h1>
    <hr /> <br />
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input setValue={setHeaders} value={headers['Mes']} keyword="Mes" />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['Nombre']}
              keyword="Nombre"
            />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input setValue={setHeaders} value={headers['ID']} keyword="ID" />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['Fecha de Ingreso']}
              keyword="Fecha de Ingreso"
            />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['Sueldo Bruto']}
              keyword="Sueldo Bruto"
            />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['División']}
              keyword="División"
            />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['Area']}
              keyword="Area"
            />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['Subarea']}
              keyword="Subarea"
            />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['ID Lider']}
              keyword="ID Lider"
            />
          </th>
          <th
            scope="col"
            className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <Input
              setValue={setHeaders}
              value={headers['Nivel Jerárquico']}
              keyword="Nivel Jerárquico"
            />
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((register) => {
          return (
            <tr key={register.ID}>
              <td className="px-2 py-2 whitespace-nowrap">
                {formatter.format(register.Mes)}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">{register.Nombre}</td>
              <td className="px-2 py-2 whitespace-nowrap">{register.ID}</td>
              <td className="px-2 py-2 whitespace-nowrap">
                {formatter.format(register['Fecha de ingreso'])}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">
                {Number(register['Sueldo bruto']).toLocaleString()}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">
                {register.División}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">{register.Area}</td>
              <td className="px-2 py-2 whitespace-nowrap">
                {register.Subarea}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">
                {register['ID Lider']}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">
                {register['Nivel Jerárquico']}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}
