import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
    radius: string;
    flex: (direction?: string, justify?: string, align?: string) => string;
  }
}
