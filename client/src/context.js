import { createContext } from "react";
import { lightTheme, darkTheme } from "./theme";

export const UserContext = createContext(false);
export const ThemeContext = createContext(lightTheme);
