import { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
import Image from 'next/image';
import FileInputField from './FileInputField';
import './field-common-styles.css';

interface ImageInputFieldProps {
  id: string;
  label: string;
  previewUrl: string | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputRef: RefObject<HTMLInputElement>;
  required: boolean;
}

export default function ImageInputField({
  id,
  label,
  previewUrl,
  onClick,
  onChange,
  inputRef,
  required,
}: ImageInputFieldProps) {
  return (
    <div className="field-container">
      <label htmlFor={id}>{label}</label>
      <p className="requirement">
        Pour un rendu optimal, choisir une image au format 3:2
      </p>
      {previewUrl ? (
        <div className="flex flex-col gap-2">
          <div className="image-container preview-image-container-size">
            <Image
              className="image"
              src={previewUrl}
              alt="Article preview"
              priority
              sizes="100%"
              fill
            />
          </div>
          <button
            type="button"
            onClick={onClick}
            className="delete-preview-button"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <>
          <div className="image-container preview-image-container-size">
            <Image
              className="image"
              src="https://placehold.co/3000x2000/1D1D1D/f8f8f8.png"
              alt=""
              priority
              sizes="100%"
              fill
            />
          </div>
          <FileInputField
            name="imageUrl"
            id={id}
            ref={inputRef}
            required={required}
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
}
