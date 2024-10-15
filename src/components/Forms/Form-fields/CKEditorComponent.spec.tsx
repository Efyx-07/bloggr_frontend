import { render, screen } from '@testing-library/react';
import CKEditorComponent from '@/components/Forms/Form-fields/CKEditorComponent';

describe('CKEditorComponent', () => {
  it('should render CKEditor correctly', () => {
    render(
      <CKEditorComponent
        id="editor"
        name="editor"
        value="test"
        onChange={() => {}}
      />,
    );
    expect(screen.getByTestId('ckeditor')).toBeInTheDocument();
  });
});
