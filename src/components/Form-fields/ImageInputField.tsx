import './ImageInputField.scss';
import { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
import Image from 'next/image';
import FileInputField from './FileInputField';

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
    <div className="input-container image-input-field">
      <label htmlFor={id}>{label}</label>
      <p className="requirement">
        Pour un rendu optimal, choisir une image au format 3:2
      </p>
      {previewUrl ? (
        <div className="image-preview-container">
          <div className="image-container">
            <Image
              className="img"
              src={previewUrl}
              width={300}
              height={200}
              alt="Article preview"
              priority
            />
          </div>
          <button className="remove-button" type="button" onClick={onClick}>
            Supprimer
          </button>
        </div>
      ) : (
        <>
          <div className="skeleton-image-container">
            <Image
              className="img"
              src="https://placehold.co/3000x2000/1D1D1D/f8f8f8.png"
              width={300}
              height={200}
              alt=""
              priority
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
