/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback, forwardRef, LegacyRef } from 'react';
import { ItemInterface, ReactSortable } from 'react-sortablejs';
import { Button, TextInput, Select, Date, SelectOptionType } from '@/components';
import { CustomEventTarget, PropsBase } from '@types';
import { usePrevious } from '@/utils';
import { ReactComponent as IconAsterisk } from '@/assets/images/icon-asterisk.svg';
import { ReactComponent as IconHandle } from '@/assets/images/icon-handle.svg';
import { ReactComponent as IconTrash } from '@/assets/images/icon-trash.svg';
import styles from './Grid.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface HeaderUnit {
  key: number | string;
  label: string;
  fieldType: 'Text' | 'Select' | 'Date';
  selectOptions?: SelectOptionType[];
  required?: boolean;
}
export interface Griditem {
  [key: string]: any;
}
export interface GridProps extends PropsBase {
  header: HeaderUnit[];
  items: Griditem[];
  editable?: boolean;
  errorRow?: number;
  onChange: (i: Griditem[]) => void;
}

export const Grid = forwardRef(({ ...props }: GridProps, ref: LegacyRef<HTMLDivElement>) => {
  const { header, items = [], editable = true, onChange = () => {}, errorRow = -1 } = props;
  // const gridFormItems = items.map((v, i) => {
  //   return { ...v, id: `${v.key}_${i}` };
  // });
  // const [gridItems, setGridItems] = useState<ItemInterface[]>(gridFormItems);
  const [gridItems, setGridItems] = useState<ItemInterface[]>([]);
  const prevData = usePrevious({ items });
  const [focusRow, setFocusRow] = useState<number | null>(null);
  const [negativeRow, setNegativeRow] = useState(errorRow);
  // Text Input Change
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const newGridItems = gridItems.map((v, i) => {
      if (idx === i) {
        return {
          ...v,
          [name.split('_')[0]]: value,
        };
      }
      return { ...v };
    });
    setGridItems(newGridItems);
    onChange(newGridItems);
  };
  // Select Date Change
  const onChangeCustomComponent = (data: CustomEventTarget, idx: number) => {
    const { name, value } = data;
    const key = String(name?.split('_')[0]);
    const newGridItems = gridItems.map((v, i) => {
      if (idx === i) {
        return {
          ...v,
          [key]: value.split('_')[0],
        };
      }
      return { ...v };
    });
    setGridItems(newGridItems);
  };

  // 선택행 삭제
  const deleteRow = () => {
    if (!gridItems || gridItems.length === 1) return;
    const newGridItems = gridItems.filter((v, i) => i !== focusRow);
    setGridItems([...newGridItems]);
    onChange(newGridItems);
  };

  // gridItemUnit 생성
  const defaultGridItemUnit = () => {
    const unit: ItemInterface = { id: '' };
    header.forEach((v) => {
      const value = '';
      // if (v.fieldType === 'Date') {
      //   value = dayjs().format('YYYY-MM-DD');
      // }
      unit[v.key] = value;
    });

    return unit;
  };
  // 위에 행 삽입
  const addRowAbove = () => {
    const newGridItems = [...gridItems];
    newGridItems.splice(Number(focusRow), 0, defaultGridItemUnit());
    setGridItems([...newGridItems]);
  };
  //  아래 행 삽입
  const addRowBelow = () => {
    const newGridItems = [...gridItems];
    newGridItems.splice(Number(focusRow) + 1, 0, defaultGridItemUnit());
    setGridItems([...newGridItems]);
  };

  // Blur Event
  const onBluContainer = (e: any) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.g')) {
      setFocusRow(null);
      document.removeEventListener('click', onBluContainer);
    }
  };

  // 선택된 Row만들기
  const onClickRow = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest('.r')) {
        const id = target.closest('.r')?.id;
        const idx = id?.split('_')[1];
        setFocusRow(Number(idx));
        document.addEventListener('click', onBluContainer);
      }
    },
    [focusRow]
  );

  // gridItems -> parent (onChange)
  // useEffect(() => {
  //   console.log(items);
  //   if (JSON.stringify(prevData) === JSON.stringify(gridItems)) return;
  //   onChange(gridItems);
  // }, [gridItems]);
  useEffect(() => {
    setNegativeRow(errorRow);
  }, [errorRow]);
  // items -> gridItmes
  useEffect(() => {
    if (items.length === 0 || JSON.stringify(prevData) === JSON.stringify(items)) return;
    setGridItems(
      items.map((v, i) => {
        return { ...v, id: `${v.key}_${i}` };
      })
    );
  }, [items]);
  return (
    <div className={cx('root', 'g')} ref={ref} data-editable={editable}>
      <div className={styles.head}>
        <div className={styles.row}>
          {header.map((h: HeaderUnit, i: number) => {
            const key = `header_${h.key}_${i}`;
            return (
              <div key={key} className={styles.cell} data-required={h.required}>
                {h.label}
                {h.required && <IconAsterisk className="icon-required" />}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.body}>
        <ReactSortable
          // disabled={!editable}
          disabled={true}
          list={gridItems}
          setList={(items) => {
            if (items && items.length > 1) {
              setGridItems(items);
              onChange(items);
            }
          }}
          handle=".h"
          onStart={() => {
            setFocusRow(null);
          }}
        >
          {gridItems.length > 0 ? (
            gridItems.map((item: Griditem, i: number) => {
              const key = `item_${i}`;
              return (
                <div
                  key={key}
                  id={key}
                  data-focused={focusRow === i}
                  data-error={negativeRow === i}
                  className={cx('row', 'r')}
                  onMouseDown={onClickRow}
                >
                  {header.map((headerUnit, j) => {
                    const data = item[headerUnit.key];
                    const unitKey = `unit_${headerUnit.key}_${j}`;
                    return (
                      <div
                        key={unitKey}
                        data-required={headerUnit.required}
                        data-error={false}
                        className={styles.cell}
                      >
                        {headerUnit.fieldType === 'Text' && (
                          <TextInput
                            name={`${headerUnit.key}_${i}_${j}`}
                            variant="none"
                            align="center"
                            value={data}
                            error={false}
                            readOnly={editable ? false : true}
                            // onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            //   onChangeInput(e, i);
                            // }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              onChangeInput(e, i);
                            }}
                          />
                        )}
                        {headerUnit.fieldType === 'Select' && (
                          <Select
                            variant="none"
                            name={String(`${headerUnit.key}_${i}_${j}`)}
                            options={headerUnit.selectOptions || []}
                            value={data}
                            onChange={(d: CustomEventTarget) => {
                              onChangeCustomComponent(d, i);
                            }}
                          />
                        )}
                        {headerUnit.fieldType === 'Date' && (
                          <Date
                            variant="none"
                            name={String(`${headerUnit.key}_${i}_${j}`)}
                            value={data}
                            onChange={(d: CustomEventTarget) => {
                              onChangeCustomComponent(d, i);
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  <Button className={cx('handle', 'h')}>
                    <IconHandle width={16} height={16} />
                  </Button>
                </div>
              );
            })
          ) : (
            <div className={styles.row}>행을 추가해주세요</div>
          )}
        </ReactSortable>
      </div>
      {editable && (
        <div className={styles.foot}>
          <Button
            size="xs"
            variant="negative"
            outline
            className="mr-auto"
            disabled={focusRow === null}
            onClick={() => deleteRow()}
          >
            선택 행 삭제
            <IconTrash width={16} height={16} className="ml-0.5" />
          </Button>
          <Button
            size="xs"
            variant="ghost"
            outline={true}
            disabled={focusRow === null}
            onClick={() => addRowAbove()}
          >
            위에 행 삽입
          </Button>
          <Button
            size="xs"
            variant="ghost"
            outline={true}
            disabled={focusRow === null}
            onClick={() => addRowBelow()}
          >
            아래 행 삽입
          </Button>
        </div>
      )}
    </div>
  );
});
