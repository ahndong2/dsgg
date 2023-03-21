import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components';
import { Menu } from '@types';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface SidebarProps {
  open: boolean;
  title: string;
  menuList: Menu[];
  onIsOpenToggle?: (isOpen: boolean) => void;
}
interface MenuElementProps {
  idx?: number;
  menu: Menu[];
  onExpandedToggle: (i: number, j: number) => void;
}
const MenuElement = ({ idx = 1, menu = [], onExpandedToggle = () => {} }: MenuElementProps) => {
  return (
    <ul className={cx('list', `depth-${idx}`)}>
      {menu.map((m, i) => {
        return (
          <li key={m.id} className={cx('item', { expanded: m.expanded })}>
            {m.menuList.length === 0 ? (
              <Link to={String(m.url)} className={cx('link')}>
                {m.name}
              </Link>
            ) : (
              <>
                <Button
                  className={cx('toggle')}
                  onClick={() => {
                    console.log('toggle');
                  }}
                >
                  {m.name}
                </Button>
                <ul className={cx('list', 'depth-3')}>
                  <MenuElement
                    idx={idx + 1}
                    menu={m.menuList}
                    onExpandedToggle={() => onExpandedToggle(idx, i)}
                  />
                </ul>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
const Sidebar = (props: SidebarProps) => {
  const { open = false, title = '', menuList = [], onIsOpenToggle = () => {} } = props;
  const [menuListData, setMenuListData] = useState(menuList);
  // toggle
  const toggleSidebar = () => onIsOpenToggle(!open);
  // expendedToggle i번째의 menuList의 j번째 menuList
  const onExpandedToggle = (i: number, j: number) => {
    console.log(i, j);
  };

  useEffect(() => {
    setMenuListData(menuList);
  }, [menuList]);

  return (
    <aside className={cx('root', { open: open })}>
      <Button
        title={`메뉴 ${open ? '닫기' : '열기'}`}
        className={styles.handle}
        onClick={toggleSidebar}
      />
      <nav className={styles.sidebar}>
        <div className={styles.title}>{title}</div>
        {menuListData.length > 0 && (
          <MenuElement menu={menuListData} onExpandedToggle={onExpandedToggle} />
        )}
      </nav>
    </aside>
  );
};
export { Sidebar };
