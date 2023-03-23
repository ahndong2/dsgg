/* eslint-disable react-hooks/rules-of-hooks */
import React, { forwardRef, useState, useEffect } from "react";
import { InputBase, InputProps } from "./InputBase";
import styles from "./Input.module.scss";
import { useGetChampionQuery } from "@/query";
export interface SearchInputProps extends InputProps {
  showCount?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ children, showCount = false, ...props }, ref) => {
    const { value } = props;
    const DEBOUNCE_DELAY = 500;
    const [debouncedValue, setDebouncedValue] = useState<string>(value); // debounceValue
    const [items, setItems] = useState<string[]>([]); // item list
    const useGetChampionListAPI = useGetChampionQuery(value);
    const useFetchData = async (query: string) => {
      try {
        useGetChampionListAPI.refetch();
        return useGetChampionListAPI.data;
      } catch (e) {
        console.error(e);
      }
    };

    // input update
    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedValue(value);
      }, DEBOUNCE_DELAY);
      return () => clearTimeout(timerId);
    }, [value]);

    // debouncedValue update
    useEffect(() => {
      const search = async () => {
        console.log(debouncedValue);
        const result: any = await useFetchData(debouncedValue);
        console.log(result);
        setItems(result);
      };
      if (debouncedValue.length > 0) {
        search();
      } else {
        setItems([]);
      }
    }, [debouncedValue]);
    return (
      <InputBase type="text" {...props} ref={ref}>
        {children}
        {items.length > 0 && (
          <div className={styles.searchContainer}>
            {items.map((v: string, i: number) => (
              <div key={`item_${i}`}>{v}</div>
            ))}
          </div>
        )}
      </InputBase>
    );
  }
);
