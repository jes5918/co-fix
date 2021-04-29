import { createGlobalStyle } from "styled-components";
import NotoSans from "./noto-sans-kr-v13-latin_korean-regular.woff";
import Roboto from "./roboto-v27-latin-regular.woff";
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
        font-family: 'GTWalsheim';
        src: local("GT Walsheim Regular"), local("GTWalsheimRegular"),
          url('https://dtw4trybgkr7y.cloudfront.net/_nuxt/fonts/gt-walsheim-regular-webfont.2c80ee7.woff2')
            format("woff2"),
          url('https://dtw4trybgkr7y.cloudfront.net/_nuxt/fonts/gt-walsheim-regular-webfont.45d0ab2.woff')
            format("woff");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
  `;
