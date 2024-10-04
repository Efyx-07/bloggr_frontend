import { forwardRef } from 'react';

interface FileInputProps {
  name: string;
  id: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInputField = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInputField({ name, id, required, onChange }, ref) {
    return (
      <input
        className="file-input text-base"
        type="file"
        name={name}
        id={id}
        ref={ref}
        required={required}
        onChange={onChange}
      />
    );
  },
);

export default FileInputField;
