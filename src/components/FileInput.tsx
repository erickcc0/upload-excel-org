import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { read, utils } from 'xlsx';
import { RawRegister, Register } from '../models';
import { normaliseDate } from '../utils';

export function FileInput({
  setData
}: {
  setData: Dispatch<SetStateAction<Register[] | null>>;
}) {

  const readUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    /*  const xlsx = await importerFactory.from('./my-awesome-books.xlsx');
  const books: Array<Book> = xlsx.getAllItems<Book>(config.books); */
    e.preventDefault();
    if (e.target.files && e.target.files?.length >= 1) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;

        const workbook = read(data, {
          type: 'array',
          cellDates: false,
          dateNF: ''
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet, {
          raw: false
        });
        setData(
          (json as Array<RawRegister>).map((register: RawRegister) => {
            return {
              ...register,
              'Fecha de ingreso': new Date(
                normaliseDate(register['Fecha de ingreso'])
              ),
              Mes: new Date(normaliseDate(register.Mes))
            } as Register;
          })
        );
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <label className="p-4 text-1 font-bold">EXCEL</label>
      <input className="text-1 font-bold" type="file" onChange={readUploadFile} />
    </div>
  );
}
