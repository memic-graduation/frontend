import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export default createGlobalStyle`
    ${reset}
    *, *::before, *::after{
        box-sizing: border-box;
    }
    html{
        font-size: 1vw;
    }
    a{
        color: inherit;
    }
    ul{
        list-style: none;
    }
    body{
        padding: 0;
        margin: 0;
        font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    };
    button{
        border: none;
        outline: none;
        background-color: inherit ;
        cursor: pointer;
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
    }
`;
