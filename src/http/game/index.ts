import axios from "../../helpers/webApiHelper";
import { RollingResponse } from "./interface";

export const doRolling = (): Promise<RollingResponse> => {
  return axios.post("/game/roll").then(({ data }) => data);
};
export const cashout = (): Promise<RollingResponse> => {
  return axios.post("/session/cashout").then(({ data }) => data);
};
