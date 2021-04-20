import { createGlobalStyle } from 'styled-components';
import NotoSans from './noto-sans-kr-v13-latin_korean-regular.woff';
import Roboto from './roboto-v27-latin-regular.woff';
export default createGlobalStyle`
  @font-face {
    font-family: 'NotoSans';	
    src: local('NotoSans'),
    url(${NotoSans}) format('woff');
    font-weight: 300; 	
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';	
    src: local('Roboto'),
    url(${Roboto}) format('woff');
    font-weight: 300; 	
    font-style: normal;
  }

  `;
