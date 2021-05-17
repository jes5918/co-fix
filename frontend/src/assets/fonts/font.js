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
import JalOneul from './JalOneul.otf';
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
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Basic.woff') format('woff');
    font-weight: normal;
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
  @font-face {
    font-family: 'Jal_Onuel';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Onuel.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'HangeulNuri-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/HangeulNuri-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'SDSamliphopangche_Basic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Basic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
     font-family: 'S-CoreDream-7ExtraBold';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
@font-face {
     font-family: 'S-CoreDream-6Bold';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
@font-face {
     font-family: 'S-CoreDream-5Medium';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
  
   `;
