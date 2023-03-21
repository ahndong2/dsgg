import { useState } from 'react';
import { CustomEventTarget, PropsBase } from '@types';
import { TextInput, Button } from '@/components';
import { ReactComponent as IconSearch } from '@/assets/images/icon-search.svg';

export interface SearchProps extends PropsBase {
  placeholder?: string;
  onChange?: (data: CustomEventTarget) => void;
  onSearch?: () => void;
}

const Search = (props: SearchProps) => {
  const {
    id,
    name,
    size,
    placeholder = '검색어 입력',
    className,
    disabled,
    onChange = () => {},
    onSearch = () => {},
  } = props;
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
    onChange({
      id: id,
      name: name,
      value: value,
    });
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === 'Enter') {
      onSearch();
    }
  };

  return (
    <TextInput
      size={size}
      placeholder={placeholder}
      className={className}
      value={text}
      disabled={disabled}
      onKeyPress={onKeyPress}
      onChange={handleChange}
    >
      <Button
        className="button"
        onClick={() => {
          onSearch();
        }}
      >
        <span className="sr-only">검색</span>
        <IconSearch className="text-gray-2" />
      </Button>
    </TextInput>
  );
};
export { Search };
