import 'styled-components';
import { Theme } from '../../src/styles/types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    z?: string;
  }
}
