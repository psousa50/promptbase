import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#F0F0F0",
  text: "#0D0D0D",
  toggleBorder: "#6B8096",
  background: "#E1E1E1",
  primary: "#FF5722",
};

export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  background: "#999",
  primary: "#FF5722",
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
`;
