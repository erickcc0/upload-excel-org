import { ChangeEvent, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Register } from '../models';
import { Header } from '../models/Header';
import { EmployeeTable } from './EmployeeTable';
import { LeaderTable } from './LeaderTable';

export function EmployeesTree({
  data,
  headers
}: {
  data: Register[];
  headers: Header;
}) {
  const formatter = new Intl.DateTimeFormat('es', { month: 'long' });
  const [month, setMonth] = useState<number | undefined>();

  const registers = data.filter(({ Mes }) => {
    return Mes.getMonth() === month;
  });

  // console.table(
  //   registers.sort((a, b) => {
  //     return a['ID Lider'] === b.ID ? -1 : 1;
  //   })
  // );

  const onSelectMonth = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.currentTarget.value));
  };
  const print = () => {
    window.print();
  };
  return (
    <>
      <div className="inline-block relative w-64 p-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={onSelectMonth}
          value={month}
          defaultValue={0}
        >
          <option value={0} disabled>
            Seleciona un mes
          </option>
          {[...new Set(data.map(({ Mes }) => Mes.getMonth()))].map((month) => {
            return (
              <option value={month} key={month}>
                {formatter.format(new Date(`${month + 1}/12/2012`))}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-9 right-5 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <iframe className="h-0 w-0 absolute"></iframe>

      <div>
        {month && (
          <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={
              <div className="p-2">
                {formatter.format(new Date(`${month}/12/2012`))}
              </div>
            }
          >
            {registers.map((reg1) => {
              return registers.filter((register) => {
                return reg1.ID === register['ID Lider'];
              }).length > 0 ? (
                <TreeNode
                  key={reg1.ID}
                  className="border-spacing-4"
                  label={
                    <LeaderTable
                      headers={headers}
                      register={reg1}
                      month={month}
                    />
                  }
                >
                  {registers.map((reg2) => {
                    return reg1.ID === reg2['ID Lider'] ? (
                      <TreeNode
                        className="border-spacing-4"
                        label=""
                        key={reg2.ID}
                      >
                        <EmployeeTable
                          register={reg2}
                          month={month}
                          headers={headers}
                        />
                      </TreeNode>
                    ) : null;
                  })}
                </TreeNode>
              ) : null;
            })}
          </Tree>
        )}
        <div className="p-4">
          <label>Total de sueldos: </label>
          {registers
            .map((reg) => Number(reg['Sueldo bruto']))
            .reduce((a, b) => a + b, 0)
            .toLocaleString('es')}
        </div>
      </div>

      <button
        className="p-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-green py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={print}
      >
        Imprimir
      </button>
    </>
  );
}
