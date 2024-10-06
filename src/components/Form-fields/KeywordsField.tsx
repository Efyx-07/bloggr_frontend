import { Icon } from '@iconify/react';
import { MouseEventHandler } from 'react';
import { Keyword } from '@/interfaces/article.interface';
import './field-common-styles.css';

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
    <div className="field-container">
      <label htmlFor={id}>{label}</label>
      <p className="requirement">
        Choisir un à plusieurs mots-clé pour le réferencement de l&apos;article
      </p>
      <div className="input-container gap-2">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        <div onClick={onClick} className="plus-container">
          <Icon icon="ic:baseline-plus" className="plus-icon text-2xl" />
        </div>
      </div>
      <div className="flex gap-1">
        {keywords.map((keyword) => (
          <div key={keyword.name} className="field-keyword-container">
            <p className="text-sm">{keyword.name}</p>
            <Icon
              icon="mdi:remove-bold"
              onClick={() => onRemoveKeyword(keyword.name)}
              className="text-sm hover:text-accent cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
