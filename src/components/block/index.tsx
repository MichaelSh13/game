import { Symbols, TSymbols } from "./interface";
import './index.scss'

interface IBlock {
  symbols: TSymbols[];
  checked?: string;
}

export const Block = ({ symbols, checked }: IBlock) => {
  const winSymbol = Symbols.findIndex((symbol) => symbol === checked?.toLocaleLowerCase());

  return (
    <div className="block">
      <div className="block_inner">
        {symbols.map((symbol, i) => (
          <div
            key={`block_img_${symbol}`}
            className="block_img"
            style={winSymbol !== -1 ? {
              top: `-${winSymbol * 100}%`
            } : {}}
          >
            {checked ? (
              <img src={`/icons/${symbol}.png`} alt="" />
            ) : (
              <img src={`/icons/time.png`} alt="" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}