import { ChangeEvent, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Register } from '../models';
import { EmployeeTable } from './EmployeeTable';
import { LeaderTable } from './LeaderTable';

export function EmployeesTree({ data }: { data: Register[] }) {
  const formatter = new Intl.DateTimeFormat('es', { month: 'long' });
  const [month, setMonth] = useState<number | undefined>();

  const registers = data.filter(({ Mes }) => {
    console.log(Mes.getMonth(), month);

    return Mes.getMonth() === month;
  });

  console.table(
    registers.sort((a, b) => {
      return a['ID Lider'] === b.ID ? -1 : 1;
    })
  );

  const onSelectMonth = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.currentTarget.value));
  };

  /* const printRef = useRef<HTMLDivElement>(null);
  const priRef = useRef<HTMLIFrameElement>(null); */
  const print = () => {
    /* if (printRef.current && priRef.current) { */
    window.print();
    /*  } */
  };
  return (
    <>
      <select onChange={onSelectMonth} value={month} defaultValue={0}>
        <option value={0} disabled>
          Seleciona un valor
        </option>
        {[...new Set(data.map(({ Mes }) => Mes.getMonth()))].map((month) => {
          return (
            <option value={month} key={month}>
              {formatter.format(new Date(`${month}/12/2012`))}
            </option>
          );
        })}
      </select>

      <iframe /* ref={priRef} */ className="h-0 w-0 absolute"></iframe>

      <div /* ref={printRef} */>
        {month && (
          <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<div>{formatter.format(new Date(`${month}/12/2012`))}</div>}
          >
            {registers.map((reg1) => {
              return registers.filter((register) => {
                return reg1.ID === register['ID Lider'];
              }).length > 0 ? (
                <TreeNode
                  key={reg1.ID}
                  className="border-spacing-4"
                  label={<LeaderTable register={reg1} month={month} />}
                >
                  {registers.map((reg2) => {
                    return reg1.ID === reg2['ID Lider'] ? (
                      <TreeNode
                        className="border-spacing-4"
                        label={reg2.Nombre}
                        key={reg2.ID}
                      >
                        <EmployeeTable register={reg2} month={month} />
                      </TreeNode>
                    ) : null;
                  })}
                </TreeNode>
              ) : null;
            })}
          </Tree>
        )}
        <div>
          <label>Total sueldos </label>
          {registers
            .map((reg) => Number(reg['Sueldo bruto']))
            .reduce((a, b) => a + b, 0)
            .toLocaleString('es')}
        </div>
      </div>

      <button className="p-2 bg-blue" onClick={print}>
        Imprimir
      </button>
    </>
  );
}
