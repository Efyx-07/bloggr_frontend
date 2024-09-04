import './Tiptap.scss';
import { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface TipTapProps {
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (value: string) => void;
}

const Tiptap: React.FC<TipTapProps> = ({ name, value, required, onChange }) => {
  // Configure l'editor
  // ===========================================================================================
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    content: value || '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Configure l'extension link
  // ===========================================================================================
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }
    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  // Nettoie l'editor au démontage du composant
  // ===========================================================================================
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-container">
      <div className="tiptap-toolbar">
        {/* BOLD */}
        <div className="control-group">
          <div className="button-group">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive('bold') ? 'is-active' : ''}
            >
              Toggle bold
            </button>
            <button
              onClick={() => editor?.chain().focus().setBold().run()}
              disabled={editor?.isActive('bold')}
            >
              Set bold
            </button>
            <button
              onClick={() => editor?.chain().focus().unsetBold().run()}
              disabled={!editor?.isActive('bold')}
            >
              Unset bold
            </button>
          </div>
        </div>
        {/* ITALIC */}
        <div className="control-group">
          <div className="button-group">
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive('italic') ? 'is-active' : ''}
            >
              Toggle italic
            </button>
            <button
              onClick={() => editor?.chain().focus().setItalic().run()}
              disabled={editor?.isActive('italic')}
            >
              Set italic
            </button>
            <button
              onClick={() => editor?.chain().focus().unsetItalic().run()}
              disabled={!editor?.isActive('italic')}
            >
              Unset italic
            </button>
          </div>
        </div>
        {/* LINK */}
        <div className="control-group">
          <div className="button-group">
            <button
              onClick={setLink}
              className={editor.isActive('link') ? 'is-active' : ''}
            >
              Set link
            </button>
            <button
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive('link')}
            >
              Unset link
            </button>
          </div>
        </div>
        {/* HEADING */}
        <div className="control-group">
          <div className="button-group">
            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </button>
            <button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              H3
            </button>
          </div>
        </div>
      </div>
      <div className="tiptap-editor">
        <EditorContent editor={editor} />
        <input
          type="hidden"
          name={name}
          value={editor?.getHTML() || ''}
          required={required}
        />
      </div>
    </div>
  );
};

export default Tiptap;
