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
      {previewUrl ? (
        <div className="image-preview-container">
          <Image
            className="img"
            src={previewUrl}
            width={300}
            height={200}
            alt="Article preview"
            priority
          />
          <button className="remove-btn" type="button" onClick={onClick}>
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className="skeleton-image-container">
            <Image
              className="img"
              src="/skeleton-image.png"
              width={300}
              height={200}
              alt="Article preview"
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
