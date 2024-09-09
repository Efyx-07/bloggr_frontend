import React from 'react';

console.log('CKEditor mock used');
// Le composant CKEditor mocké
export const CKEditor = ({
  id,
  name,
  value,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <textarea
    data-testid="ckeditor"
    id={id}
    name={name}
    value={value}
    onChange={onChange}
  />
);
