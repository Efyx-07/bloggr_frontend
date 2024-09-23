import './FormContainer.scss';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function FormContainer({ title, children }: FormContainerProps) {
  return (
    <div className="form-container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
