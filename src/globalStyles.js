import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100vh;

    display: flex;
  }

  body { 
    font-family: sans-serif;
    font-size: 16px; 
    line-height: 1.5;
    color: black;
    background-color: white;
  }

  #root {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  [disabled] { pointer-events: none; }
`

export default GlobalStyles
