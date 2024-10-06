import dynamic from 'next/dynamic';
import './field-common-styles.css';

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
    <div className="field-container">
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
