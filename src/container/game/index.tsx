import { useQueryClient } from "react-query";
import { Block } from "../../components/block";
import { Symbols } from "../../components/block/interface";
import { IBalance } from "../../http/session/interface";
import "./index.scss"

interface IGame {
  countBlocks?: number;
}

export const Game = ({ countBlocks = 3 }: IGame) => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<IBalance>("balance");
  const row = data && data.row ? data.row : [];

  return (
    <div className="game">
      {Array(countBlocks).fill("").map((_, index) => (
        <div className="item" key={`block_${index}`}>
          <Block symbols={[...Symbols]} checked={row[index]} />
        </div>
      ))}
    </div>
  );
};
