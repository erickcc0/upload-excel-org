import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Header } from '../models/Header';

export function Input({
  setValue,
  value,
  keyword
}: {
  Component?: FC;
  value: string;
  keyword: string;
  setValue: Dispatch<SetStateAction<Header>>;
}) {
  const [active, setActive] = useState(false);
  const onDoubleClick = () => {
    setActive(true);
  };

  return active ? (
      <input
        type="text"
        value={value}
        /*   onDoubleClick={onDoubleClick} */
        onBlur={() => setActive(false)}
        onChange={(e) => {
          setValue((headers) => ({
            ...headers,
            [keyword]: e.target.value
          }));
        }}
      />

  ) : (
    <div onDoubleClick={onDoubleClick}>{value}</div>
  );
}
