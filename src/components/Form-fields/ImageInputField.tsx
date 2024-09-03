import { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
import Image from 'next/image';
import FileInputField from './FileInputField';

interface ImageInputFieldProps {
  label: string;
  previewUrl: string | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputRef: RefObject<HTMLInputElement>;
  required: boolean;
}

export default function ImageInputField({
  label,
  previewUrl,
  onClick,
  onChange,
  inputRef,
  required,
}: ImageInputFieldProps) {
  return (
    <div className="image-input-field">
      <label>{label}</label>
      {previewUrl ? (
        <div className="image-preview-container">
          <Image
            className="img"
            src={previewUrl}
            width={250}
            height={250}
            alt="Article preview"
            priority
          />
          <button className="remove-btn" type="button" onClick={onClick}>
            Remove
          </button>
        </div>
      ) : (
        <FileInputField
          name="imageUrl"
          id="imageUrl"
          ref={inputRef}
          required={required}
          onChange={onChange}
        />
      )}
    </div>
  );
}
