import { Icon } from '@iconify/react';
import { MouseEventHandler } from 'react';
import { Keyword } from '@/interfaces/article.interface';

interface KeywordsFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: MouseEventHandler<HTMLDivElement>;
  keywords: Keyword[];
  onRemoveKeyword: (keywordToRemove: Keyword['name']) => void;
}

export default function KeywordsField({
  id,
  label,
  type,
  name,
  value,
  onChange,
  onClick,
  keywords,
  onRemoveKeyword,
}: KeywordsFieldProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <p className="text-xs font-semibold opacity-75">
        Choisir un à plusieurs mots-clé pour le réferencement de l&apos;article
      </p>
      <div className="flex items-center gap-1">
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
          onChange={onChange}
        />
        <div
          onClick={onClick}
          className="
            w-full max-w-[2.25rem] h-[2.25rem]
            flex items-center justify-center
            border border-black25 rounded-full
            cursor-pointer
          "
        >
          <Icon icon="ic:baseline-plus" className="text-2xl" />
        </div>
      </div>
      <div className="flex gap-1">
        {keywords.map((keyword) => (
          <div
            key={keyword.name}
            className="
              flex items-center gap-1
              p-[.25rem]
              border border-black25 border-solid
            "
          >
            <p className="text-sm">{keyword.name}</p>
            <Icon
              icon="mdi:remove-bold"
              onClick={() => onRemoveKeyword(keyword.name)}
              className="text-sm cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
