export interface OptionProps {
  children?: React.ReactNode;
  label?: string;
  value?: string | number;
  disabled?: boolean;
  selected?: boolean;
  hidden?: boolean;
}

export const Option = (props: OptionProps) => {
  const { children, value, disabled, selected, hidden } = props;

  return (
    <option value={value} disabled={disabled} selected={selected} hidden={hidden}>
      {children}
    </option>
  );
};
