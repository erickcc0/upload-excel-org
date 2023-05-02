import { ChangeEvent, useState } from 'react';
import { Register } from '../models';
import { Header } from '../models/Header';

export function LeaderTable({
  register,

  headers
}: {
  register: Register;
  month: number;
  headers: Header;
}) {
  
  const [picture, setPicture] = useState<string>();
  const formatter = new Intl.DateTimeFormat('es', {});

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
          <h2 className="text-lg font-bold">{register.Nombre}</h2>
          <p className="text-gray-500 mb-2">{headers['Area']}</p>
          <p className="text-base text-sm font-semibold mb-2">{register.Area}</p>
          <p className="text-gray-500 mb-2">{headers['Subarea']}</p>
          <p className="text-base font-semibold text-sm">{register.Subarea}</p>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <p className="text-gray-500 mb-2">{headers['Nivel Jerárquico']}</p>
        <p className="text-base font-semibold mb-1">
          {register['Nivel Jerárquico']}
        </p>
        <p className="text-gray-500 mb-2">{headers['Sueldo Bruto']}</p>
        <p className="text-base font-semibold mb-1">
          {Number(register['Sueldo bruto']).toLocaleString('es')}
        </p>
        <p className="text-gray-500 mb-2">{headers['Fecha de Ingreso']}</p>
        <p className={'text-base'}>
          {formatter.format(register['Fecha de ingreso'])}
        </p>
      </div>
    </div>
  );
}
