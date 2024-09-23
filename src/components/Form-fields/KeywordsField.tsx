import './KeywordsField.scss';
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
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <div className="input-keyword-container">
        <input
          className="text-input"
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        <div className="icon-container" onClick={onClick}>
          <Icon icon="ic:baseline-plus" className="plus-icon" />
        </div>
      </div>
      <div className="keywords-list">
        {keywords.map((keyword) => (
          <div className="keyword-container" key={keyword.name}>
            <p className="keyword-name">{keyword.name}</p>
            <Icon
              icon="mdi:remove-bold"
              className="remove-icon"
              onClick={() => onRemoveKeyword(keyword.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
