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
    <div className="grid grid-cols-2 gap-2 bg-lime-100 rounded p-2 shadow-md text-xs">
      <div className="flex items-center">
        {picture ? (
          <img
            src={picture}
            alt={register.Nombre}
            className="w-20 rounded-full mr-2"
          />
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="w-20 block mr-2"
            title="Agregar foto de perfil"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold">{register.Nombre}</h2>
          <p className="text-gray-500">{register.Area}</p>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <p className="text-gray-500 mb-2">Nivel Jerárquico</p>
        <p className="text-lg font-semibold mb-1">{register['Nivel Jerárquico']}</p>
        <p className="text-gray-500 mb-2">Sueldo Bruto</p>
        <p className="text-lg font-semibold mb-1">{Number(register['Sueldo bruto']).toLocaleString('es')}</p>
        <p className="text-gray-500 mb-2">Fecha de ingreso</p>
        <p className={isNew ? 'font-bold text-cyan text-lg' : 'text-lg'}>{formatter.format(register['Fecha de ingreso'])}</p>
      </div>
    </div>
  );
}
