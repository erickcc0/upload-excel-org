export interface Register {
  Mes: Date;
  Nombre: string;
  ID: string;
  'Fecha de ingreso': Date;
  'Sueldo bruto': string;
  División: string;
  Area: string;
  Subarea: string;
  'ID Lider': string;
  'Nivel Jerárquico': string;
}

export interface RawRegister {
  Mes: string;
  Nombre: string;
  ID: string;
  'Fecha de ingreso': string;
  'Sueldo bruto': string;
  División: string;
  Area: string;
  Subarea: string;
  'ID Lider': string;
  'Nivel Jerárquico': string;
}
