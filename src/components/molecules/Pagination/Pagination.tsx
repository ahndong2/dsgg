import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { ReactComponent as IconArrowRight } from '@/assets/images/icon-arrow-right.svg';
import { ReactComponent as IconArrowLeft } from '@/assets/images/icon-arrow-left.svg';

export interface PaginationProps {
  size?: 'md' | 'lg';
  currentPage: number; // 현재 페이지
  itemsPerPage: number; // 한 페이지 List 갯수
  totalItems: number; // 전체 Item 갯수
  maxSize?: number; // 페이징 Number 갯수
  search: (page: number) => void; // 검색 return pageNumber
  className?: string;
}

export const Pagination = (props: PaginationProps) => {
  const {
    size = 'md',
    currentPage = 1,
    itemsPerPage = 20,
    totalItems = 0,
    maxSize = 5,
    search = () => {},
    className,
  } = props;

  const [page, setPage] = useState({
    startPage: 1,
    endPage: maxSize,
  });
  const [totalPage, setTotalPage] = useState(0);
  const [pageList, setPageList] = useState([] as number[]);

  const drawPaging = () => {
    const newArr: number[] = [];
    for (let i = page.startPage; i <= page.endPage; i += 1) {
      newArr.push(i);
    }
    if (newArr.length === 0) {
      newArr.push(1);
    }
    setPageList(newArr);
  };

  const getPages = pageList.map((v: number, i) => {
    return (
      <li key={i} className={cx({ active: v === currentPage })}>
        <a
          href="#none"
          className={styles.page}
          onClick={(e) => {
            e.preventDefault();
            search(v);
          }}
        >
          {v}
        </a>
      </li>
    );
  });

  const prevPage = (n: number) => {
    if (n === 0) return;
    const sp = page.startPage;
    const ep = page.endPage;

    if (n === 1) {
      // 맨앞
      const data = {
        startPage: 1,
        endPage: maxSize > totalPage ? totalPage : maxSize,
      };
      setPage(data);
    } else if (n < sp) {
      // 화면에 보이는 첫 페이지 번호
      const s = sp - maxSize < 1 ? 1 : sp - maxSize;
      const e = sp - maxSize < 1 ? maxSize : ep - maxSize;

      const data = {
        startPage: s,
        endPage: e,
      };
      setPage(data);
    }
    search(n);
  };
  const nextPage = (n: number) => {
    if (n > totalPage) return;
    const ep = page.endPage;
    if (n === totalPage) {
      // 맨뒤
      const data = {
        startPage: totalPage - (maxSize - 1) > 1 ? totalPage - (maxSize - 1) : 1,
        endPage: totalPage,
      };
      setPage(data);
    } else if (n > page.endPage) {
      // 화면에 보이는 마지막 페이지 번호
      const s = ep + maxSize > totalPage ? totalPage - (maxSize - 1) : ep + 1;
      const e = ep + maxSize > totalPage ? totalPage : ep + maxSize;
      // maxsize만큼 증가
      const data = {
        startPage: s,
        endPage: e,
      };
      setPage(data);
    }
    search(n);
  };

  // 페이지 변경
  useEffect(() => {
    drawPaging();
  }, [page]);

  useEffect(() => {
    const tp = Math.ceil(totalItems / itemsPerPage);
    setTotalPage(tp);

    const data = {
      startPage: 1,
      endPage: tp > maxSize ? maxSize : tp,
    };
    setPage(data);
  }, [totalItems]);

  return (
    <div data-size={size} className={cx('root', className)}>
      <ul className={styles.list}>
        <li className={cx({ disabled: currentPage === 1 })} hidden>
          <a
            href="#none"
            className={cx('nav', 'first')}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage === 1) {
                return;
              }
              prevPage(1);
            }}
          >
            <span className="sr-only">첫 페이지</span>
          </a>
        </li>
        <li className={cx({ disabled: currentPage === 1 })}>
          <a
            href="#none"
            className={cx('nav', 'prev')}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage === 1) {
                return;
              }
              prevPage(currentPage - 1);
            }}
          >
            <IconArrowLeft />
            <span className="sr-only">이전 페이지</span>
          </a>
        </li>
        {getPages}
        <li
          className={cx({
            disabled: totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage),
          })}
        >
          <a
            href="#none"
            className={cx('nav', 'next')}
            onClick={(e) => {
              e.preventDefault();
              if (totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage)) {
                return;
              }
              nextPage(currentPage + 1);
            }}
          >
            <IconArrowRight />
            <span className="sr-only">다음 페이지</span>
          </a>
        </li>
        <li
          className={cx({
            disabled: totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage),
          })}
          hidden
        >
          <a
            href="#none"
            className={cx('nav', 'last')}
            onClick={(e) => {
              e.preventDefault();
              if (totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage)) {
                return;
              }
              nextPage(totalPage);
            }}
          >
            <span className="sr-only">마지막 페이지</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
