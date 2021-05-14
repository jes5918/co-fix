import { createGlobalStyle } from 'styled-components';
import NotoSans from './noto-sans-kr-v13-latin_korean-regular.woff';
import Roboto from './roboto-v27-latin-regular.woff';
import Samlip from './SDSamliphopangcheBasic.otf';
import SCD_regular from './SCDream4.otf';
import SCD_medium from './SCDream5.otf';
import SCD_bold from './SCDream6.otf';
import SCD_eb from './SCDream7.otf';
import SCD_heavy from './SCDream8.otf';
import SCD_black from './SCDream9.otf';
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

  @font-face {
    font-family: 'Samlip';	
    src: local('Samlip'),
    url(${Samlip}) format('otf');
    font-weight: 300; 	
    font-style: normal;
  }
  @font-face {
    font-family: 'SCD_regular';	
    src: local('SCD_regular'),
    url(${SCD_regular}) format('otf');
    font-weight: 300; 	
    font-style: normal;
  }
  @font-face {
    font-family: 'SCD_medium';	
    src: local('SCD_medium'),
    url(${SCD_medium}) format('otf');
    font-weight: 300; 	
    font-style: normal;
  }
  @font-face {
    font-family: 'SCD_bold';	
    src: local('SCD_bold'),
    url(${SCD_bold}) format('otf');
    font-weight: 300; 	
    font-style: normal;
  }
  @font-face {
    font-family: 'SCD_eb';	
    src: local('SCD_eb'),
    url(${SCD_eb}) format('otf');
    font-weight: 300; 	
    font-style: normal;
  }
  @font-face {
    font-family: 'SCD_heavy';	
    src: local('SCD_heavy'),
    url(${SCD_heavy}) format('otf');
    font-weight: 300; 	
    font-style: normal;
  }
  @font-face {
    font-family: 'SCD_black';	
    src: local('SCD_black'),
    url(${SCD_black}) format('otf');
    font-weight: 300; 	
    font-style: normal;
  }

  
   `;
