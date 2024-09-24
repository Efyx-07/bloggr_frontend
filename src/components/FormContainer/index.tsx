import './FormContainer.scss';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function FormContainer({ title, children }: FormContainerProps) {
  return (
    <div className="form-container">
      <div className="form-head">
        <h2>{title}</h2>
        <div className="separator"></div>
      </div>
      {children}
    </div>
  );
}
