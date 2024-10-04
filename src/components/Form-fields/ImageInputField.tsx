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
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <p className="text-xs font-semibold opacity-75">
        Pour un rendu optimal, choisir une image au format 3:2
      </p>
      {previewUrl ? (
        <div className="flex flex-col gap-2">
          <div
            className="
              w-full max-w-[18.75rem] h-[12.5rem]
              block
              relative
              overflow-hidden
            "
          >
            <Image
              className="
                inline-block
                relative
                w-full h-auto
                object-cover
              "
              src={previewUrl}
              width={300}
              height={200}
              alt="Article preview"
              priority
            />
          </div>
          <button
            type="button"
            onClick={onClick}
            className="
              text-base
              w-[10rem] h-[2rem]
              border border-black25 border-solid
              cursor-pointer
            "
          >
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
