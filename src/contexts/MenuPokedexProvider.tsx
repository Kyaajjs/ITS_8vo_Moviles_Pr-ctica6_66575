import { JSX, ReactNode, useState } from "react";
import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from "./MenuPokedexContext";

export const MenuPokedexProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);

  const setScreenOption = (option: EPokedexScreen) => {
    setScreen(option);
  };

  const getScreenOption = () => {
    return screen;
  }

 const setMenuOptionValue = (option: EPokedexMenuOption) => {
   setMenuOption(option);
   window.dispatchEvent(new CustomEvent("menuOption-changed"));
 };


  const getMenuOption = () => {
    return menuOption;
  }

  return (
    <MenuPokedexContext.Provider
      value={{
        screen: getScreenOption(),
        setScreen: setScreenOption,
        menuOption: getMenuOption(),
        setMenuOption: setMenuOptionValue,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  )
}