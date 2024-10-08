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
          heading: {
            options: [
              {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph',
              },
              {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1',
              },
              {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2',
              },
              {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3',
              },
            ],
          },
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
