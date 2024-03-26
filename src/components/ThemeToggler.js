import React from "react";

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
};

export default ThemeToggler;
