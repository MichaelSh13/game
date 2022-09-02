import { useQuery } from "react-query";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loading } from "../../components/Loading";
import { Game } from "../../container/game";
import { Side } from "../../container/side";
import { getBalance } from "../../http/session";

import './index.scss'

export const Main = () => {
  const { data, isLoading, isError, error } = useQuery("balance", () => getBalance(1000));

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (isError || (
    !isLoading && !data
  )) {
    return (
      <ErrorMessage error={error || "Something went wrong."} />
    );
  }

  // TODO!;
  // if (data?.balance === 0) {
  //   <ModalWindow>
  //     End Game

  //     <button>
  //       restart
  //     </button>
  //   </ModalWindow>
  // }

  return (
    <div className="screen">
      <div className="header">
        <h1>Balance: {data.balance || "waiting..."}.</h1>
        {data.win !== undefined && (
          <h1>Win: {data.win}.</h1>
        )}
      </div>
      <div className="main">
        <div className="body">
          <Game />
        </div>

        <div className="side">
          <Side balance={data.balance} />
        </div>
      </div>
    </div>
  );
}