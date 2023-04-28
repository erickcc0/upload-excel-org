import { ChangeEvent, useState } from 'react';
import { Register } from '../models';

export function LeaderTable({
  register,
  month
}: {
  register: Register;
  month: number;
}) {
  const [picture, setPicture] = useState<string>();
  const formatter = new Intl.DateTimeFormat('es', {});
  const isNew = month === register['Fecha de ingreso'].getMonth();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files && files[0].type.startsWith('image/')) {
      setPicture(URL.createObjectURL(files[0]));
    }
  };

  return (
    <table className="table-auto text-xs w-full bg-primary-2 rounded py-2">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Área</th>
          <th>Sueldo Bruto</th>
          <th>Fecha de ingreso</th>
          <th>Nivel Jerárquico</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {picture ? (
              <img
                src={picture}
                alt={register.Nombre}
                className="w-20 block m-auto"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className="w-20 block"
                title="Agregar foto de perfil"
              />
            )}
          </td>
          <td>{register.Nombre}</td>
          <td>{register.Area}</td>
          <td>{Number(register['Sueldo bruto']).toLocaleString('es')}</td>
          <td className={isNew ? 'font-bold text-cyan' : undefined}>
            {formatter.format(register['Fecha de ingreso'])}
          </td>
          <td>{register['Nivel Jerárquico']}</td>
        </tr>
      </tbody>
    </table>
  );
}
