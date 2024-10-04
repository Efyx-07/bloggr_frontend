import { Icon } from '@iconify/react';

interface PasswordFieldProps {
  id: string;
  label: string;
  requirement?: string;
  type: string;
  name: string;
  value: string | undefined;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: React.MouseEventHandler<HTMLElement>;
  isPasswordVisible: boolean;
}

export default function PasswordField({
  id,
  label,
  requirement,
  type,
  name,
  value,
  required,
  onChange,
  onClick,
  isPasswordVisible,
}: PasswordFieldProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      {requirement && (
        <p className="text-xs font-semibold opacity-75">{requirement}</p>
      )}
      <div className="flex items-center">
        <input
          className="
            w-full h-[3rem] 
            text-base 
            pl-[1rem] 
            border border-black25 focus:border-accent
            outline-none
          "
          id={id}
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
        />
        <div
          onClick={onClick}
          className="
            w-12 h-12
            flex items-center justify-center
            border border-l-0 border-black25
            cursor-pointer
          "
        >
          {isPasswordVisible ? (
            <Icon icon="mdi:eye-off" className="text-xl text-black75" />
          ) : (
            <Icon icon="mdi:eye" className="text-xl text-black75" />
          )}
        </div>
      </div>
    </div>
  );
}
