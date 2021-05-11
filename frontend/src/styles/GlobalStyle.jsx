import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing:border-box;
    }
    html, body, #root {
        width: 100%;
        height: 100%;
        margin:0;
    }
    body{
        margin:0;
    
        font-size:14px;
        font-family: 'Roboto';
    }
    a{
        text-decoration:none;
        color:inherit;
    }
    ol, ul, li {
        list-style: none;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    input, button {
        background-color: transparent;
        outline: none;
        border: none;
    }
    h1, h2, h3, h4, h5, h6 {
    font-family: 'NotoSans';
  }
`;
export default GlobalStyles;
