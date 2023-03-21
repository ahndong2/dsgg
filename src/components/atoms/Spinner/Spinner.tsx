import { TailSpin } from 'react-loader-spinner';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  // type?: React.FunctionComponent;
  width?: number;
  height?: number;
  color?: string;
  ariaLabel?: string;
  radius?: number;
}

// 참고 https://mhnpd.github.io/react-loader-spinner/grid
// module에 'RotatingLines' 존재 x
export const Spinner = (props: SpinnerProps) => {
  const {
    // type = 'RotatingLines',
    width = 50,
    height = 50,
    color,
    ariaLabel,
    radius = 1,
  } = props;

  return (
    <div className={styles.root}>
      <TailSpin width={width} height={height} color={color} radius={radius} ariaLabel={ariaLabel} />
    </div>
  );
};
