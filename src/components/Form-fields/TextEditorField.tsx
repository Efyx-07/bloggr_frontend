import CKEditorComponent from './CKEditorComponent';

interface TextEditorFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
}

export default function TextEditorField({
  label,
  name,
  value,
  onChange,
  required,
}: TextEditorFieldProps) {
  return (
    <div className="text-editor-field">
      <label>{label}</label>
      <CKEditorComponent
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
