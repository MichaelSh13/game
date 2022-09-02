import { createRef, CSSProperties, MouseEvent, useState } from 'react'
import { Button } from "../../components/Button"
import { randomWithChance } from "../../helpers/randomWithChance"
import { IBalance } from "../../http/session/interface"
import "./index.scss"

type ICashout = Pick<IBalance, 'balance'>

export const Cashout = ({ balance }: ICashout) => {
  const ref = createRef<HTMLButtonElement>();

  const [buttonStyle, setButtonStyle] = useState<CSSProperties>({});

  const tricky = (event: MouseEvent<HTMLButtonElement>) => {
    if (ref.current) {
      ref.current.disabled = randomWithChance(40);

      triggerMovving()
    }
  };

  const triggerMovving = () => {
    if (ref.current) {
      const direction = randomWithChance(50) ? 'top' : 'right';
      const side = direction === 'right' ? 'offsetLeft' : 'offsetTop';
      const value = randomWithChance(50) ? ref.current[side] + 300 : ref.current[side] - 300;


      // const style = {
      //   ...buttonStyle,
      //   [direction]: value,
      // };

      // console.log(style);


      // setButtonStyle(style)
    }
  }

  return (
    <Button
      ref={ref}
      className="cashout"
      style={buttonStyle}
      disabled={!balance}
      onMouseEnter={tricky}
    >
      Cashout
    </Button>
  )
}