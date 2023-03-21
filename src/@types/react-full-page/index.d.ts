declare module 'react-full-page' {
  type ControlComponentsProps = {
    getCurrentSlideIndex: () => number;
    onNext: () => void;
    onPrev: () => void;
    scrollToSlide: (n: number) => void;
    slidesCount: number;
  };

  type FullPageProps = {
    children: React.ReactNode;
    initialSlide?: number;
    duration?: number;
    controls?: boolean | React.FC<ControlComponentsProps>;
    controlProps?: any;
    beforeChange?: (v) => void;
    afterChange?: (v) => void;
    scrollMode?: 'full-page' | 'normal';
  };
  export const FullPage: React.FC<FullPageProps>;

  export const Slide: React.FC<Props>;
}
