import React, { useEffect, useState, useRef } from 'react';
import { Button, MenuItem } from '@/components';
import styles from './MenuList.module.scss';
import classNames from 'classnames/bind';
import { PropsBase, CustomEventTarget } from '@types';
import { usePrevious } from '@/utils';
const cx = classNames.bind(styles);

export interface MenuListProps extends PropsBase {
  value?: string | CustomEventTarget;
  placeholder?: string;
  classNames?: string;
  options?: CustomEventTarget[];
  onChange?: (menuItem: CustomEventTarget) => void;
}
export interface MenuListData {
  selectMenuItem: CustomEventTarget;
  display: boolean;
}
export const MenuList = (props: MenuListProps) => {
  // console.log('MenuList : ', props);
  const {
    children,
    id,
    name,
    value,
    options = [],
    placeholder = '선택',
    classNames,
    onChange = () => {},
  } = props;

  const [data, setData] = useState<MenuListData>({
    selectMenuItem: {
      label: '',
      value: '',
    },
    display: false,
  });
  const prevData = usePrevious<MenuListData>(data);
  const componentRef = useRef<HTMLDivElement>(null);

  const changeMenu = (changeMenuItem: CustomEventTarget) => {
    setData({
      selectMenuItem: changeMenuItem,
      display: false,
    });
  };

  const changeDisplay = () => {
    setData({ ...data, display: !data.display });
  };

  useEffect(() => {
    if (
      !prevData ||
      JSON.stringify(prevData?.selectMenuItem) === JSON.stringify(data.selectMenuItem)
    )
      return;
    onChange({ id: id, name: name, ...data.selectMenuItem });
  }, [data.selectMenuItem]);

  useEffect(() => {
    const onClickEvent = (e: Event) => {
      const target = e.target as HTMLElement;
      const id = componentRef.current && componentRef.current.id;
      if (!target.closest(`#${id}`)) {
        changeDisplay();
        return;
      }
    };

    if (data.display) {
      document.addEventListener('click', onClickEvent);
    }
    return () => {
      document.removeEventListener('click', onClickEvent);
    };
  }, [data.display]);

  useEffect(() => {
    const valueProp = typeof value === 'string' ? value : (value as CustomEventTarget)?.value;
    if (value && options.length > 0) {
      const selectMenuItem = options.find((v) => v.value === valueProp) as CustomEventTarget;
      setData({
        ...data,
        selectMenuItem: selectMenuItem,
      });
    }
  }, []);
  return (
    <div
      id={id || name}
      className={cx('root', { focus: data.display }, classNames)}
      ref={componentRef}
    >
      <Button className={cx('button')} onClick={changeDisplay}>
        {data.selectMenuItem.label || placeholder}
      </Button>
      <div className={cx('dropdown')} style={{ display: data.display ? 'block' : 'none' }}>
        <ul className={cx('list')}>
          {/* children map 바로 돌리면 Type Error */}
          {options.length > 0 &&
            options.map((option, i) => {
              return (
                <MenuItem
                  key={`select_${id}_${i}`}
                  label={option.label}
                  value={option.value}
                  onClick={changeMenu}
                />
              );
            })}
          {/* {children && children} */}
          {children &&
            React.Children.map(children, () => {
              return (
                <li className={cx('item')}>dd</li>
                // <MenuItem
                //   key={`select_${id}_${i}`}
                //   title={`select_${id}_${i}`}
                //   {...props}
                //   onClick={changeMenu}
                // />
              );
            })}
        </ul>
      </div>
    </div>
  );
};
