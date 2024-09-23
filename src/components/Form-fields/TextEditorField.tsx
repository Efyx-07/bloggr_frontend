import dynamic from 'next/dynamic';

const CKEditorComponent = dynamic(
  () => import('@/components/Form-fields/CKEditorComponent'),
  { ssr: false },
);

interface TextEditorFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
}

export default function TextEditorField({
  id,
  label,
  name,
  value,
  onChange,
  required,
}: TextEditorFieldProps) {
  return (
    <div className="input-container text-editor-field ">
      <label htmlFor={id}>{label}</label>
      <CKEditorComponent
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
