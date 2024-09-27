import './FormContainer.scss';
import HeadTitle from '../Sharables/Others/HeadTitle';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function FormContainer({ title, children }: FormContainerProps) {
  return (
    <div className="form-container">
      <HeadTitle title={title} />
      {children}
    </div>
  );
}
