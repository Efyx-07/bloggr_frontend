'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Paragraph,
  Heading,
  Bold,
  Essentials,
  Italic,
  Link,
  Undo,
  Alignment,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

interface CKEditorComponentProps {
  id: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (value: string) => void;
}

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({
  id,
  name,
  value,
  required,
  onChange,
}: CKEditorComponentProps) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={value || '<p></p>'}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'heading',
              'bold',
              'italic',
              'link',
              'alignment',
            ],
          },
          plugins: [
            Bold,
            Essentials,
            Italic,
            Link,
            Heading,
            Paragraph,
            Undo,
            Alignment,
          ],
          link: {
            decorators: {
              openInNewTab: {
                mode: 'manual',
                label: 'Ouvrir dans un nouvel onglet',
                defaultValue: true,
                attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
              },
            },
          },
        }}
      />
      <input
        type="hidden"
        id={id}
        name={name}
        value={value}
        required={required}
      />
    </div>
  );
};

export default CKEditorComponent;
