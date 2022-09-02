import axios from "../../helpers/webApiHelper";
import { IBalance } from "./interface";

export const getBalance = (delay: number = 0): Promise<IBalance> => {
  const request = axios.get("/session").then(({ data }) => data as IBalance);

  return new Promise<IBalance>((res, rej) => {
    setTimeout(() => {
      res(request);
    }, delay);
  });
};
