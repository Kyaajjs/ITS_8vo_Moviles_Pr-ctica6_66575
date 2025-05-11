import { faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { EPokedexMenuOption, MenuPokedexContext } from "../../contexts/MenuPokedexContext"

export const PokedexMenu = () => {
  const { menuOption } = useContext(MenuPokedexContext)

  const isSelected = (selectedOption: EPokedexMenuOption) => {
    return menuOption === selectedOption
  }

  return (
    <div
      className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)]"
      style={{
        backgroundColor: '#ffffff', // verde brillante

        color: '#003300',
      }}
    >
      <ul>
        <li>
          <div className="flex flex-row justify-end">
            <FontAwesomeIcon
              className={`${isSelected(EPokedexMenuOption.POKEDEX) ? "" : "!hidden"
                }`}
              icon={faCaretRight}
            />
            <span className="w-full"></span>
            <span>Pokedex</span>
          </div>
        </li>
        <li>
          <div className="flex flex-row justify-end">
            <FontAwesomeIcon
              className={`${isSelected(EPokedexMenuOption.PACK) ? "" : "!hidden"
                }`}
              icon={faCaretRight}
            />
            <span className="w-full"></span>
            <span>Objectos</span>
          </div>
        </li>
        <li>
          <div className="flex flex-row justify-end">
            <FontAwesomeIcon
              className={`${isSelected(EPokedexMenuOption.EXIT) ? "" : "!hidden"
                }`}
              icon={faCaretRight}
            />
            <span className="w-full"></span>
            <span>Salir</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
