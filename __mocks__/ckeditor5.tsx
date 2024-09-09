import React from 'react';

export const CKEditor = ({
  onChange,
  data,
}: {
  onChange: (event: any, editor: any) => void;
  data: string;
}) => {
  console.log('CKEditor mock utilisé');
  return (
    <textarea
      data-testid="ckeditor"
      value={data}
      onChange={(e) => onChange(null, { getData: () => e.target.value })}
    />
  );
};
