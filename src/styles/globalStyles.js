import { createGlobalStyle } from 'styled-components'
import { theme } from './variables'


export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        box-sizing: border-box;
    }

    body {
        background: ${theme.bg2};
        color: ${theme.text};
        font-family: 'Roboto', sans-sherif;
        letter-spacing: .6px;
    }
`