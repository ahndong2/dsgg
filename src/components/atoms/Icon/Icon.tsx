import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, IconPrefix, IconPack } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';
const cx = classNames.bind(styles);

// type SizeProps =
//   | '2xs'
//   | 'xs'
//   | 'sm' // 0.875em
//   | 'lg' // 1.25em
//   | 'xl'
//   | '2xl'
//   | '1x'
//   | '2x'
//   | '3x'
//   | '4x'
//   | '5x'
//   | '6x'
//   | '7x'
//   | '8x'
//   | '9x'
//   | '10x';
type IconDefinitionOrPack = IconDefinition | IconPack;

interface ImportedIcons {
  [key: string]: IconPrefix | IconDefinitionOrPack;
}

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => (Icons as ImportedIcons)[icon]);

library.add(...(iconList as IconDefinitionOrPack[]));
export const Icon = (props: FontAwesomeIconProps) => {
  // console.log('Icon : ', props);
  const { className } = props;
  return (
    <>
      <FontAwesomeIcon {...props} className={cx('root', className)} />
    </>
  );
};
