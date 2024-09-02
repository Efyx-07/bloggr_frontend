/*'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface TiptapProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const Tiptap: React.FC<TiptapProps> = ({ content, setContent }) => {
  // Etat pour gérer l'initialisation côté client
  const [isClient, setIsClient] = useState<boolean>(false);

  // Effet pour définir isClient à true après le premier montage du composant
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialise l'éditeur uniquement après le premier rendu côté client
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Le composant ne rend rien tant que isClient est faux
  if (!isClient) {
    return null;
  }

  // Effet pour nettoyer l'éditeur lorsqu'il est démonté
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;*/
