import React from "react";
import PokeballSVG from "../media/PokeballSvg";
import { Sprites } from "@pkmn/img";
interface SpriteImageProps {
  name: string;
  buttonSize?: number;
  maxButtonWidth?: number;
}
const SpriteImage: React.FC<SpriteImageProps> = ({
  name,
  buttonSize = 40,
  maxButtonWidth = 50,
}) => {
  const ButtonSizePX = `${buttonSize}px`;
  if (name === "Not revealed") {
    return (
      <span
        className={"picon"}
        style={{
          transform: "scale(1.5)",
          background:
            "transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-pokeball-sheet.png) no-repeat scroll -0px 4px",
        }}
      />
    );
  }
  const { url, w, h } = Sprites.getPokemon(name.toLowerCase(), {
    gen: 7,
    shiny: false,
  });

  if (url === "https://play.pokemonshowdown.com/sprites/gen5/0.png") {
    return (
      <img
        src={url}
        alt={"question mark"}
        style={{
          width: ButtonSizePX,
          height: ButtonSizePX,
        }}
      ></img>
    );
  }
  const width = `${(w / h) * buttonSize}px`;
  return (
    <img
      src={url}
      alt={name}
      style={{
        width: width,
        height: ButtonSizePX,
        maxWidth: `${maxButtonWidth}px`,
      }}
    ></img>
  );
};
export default SpriteImage;
