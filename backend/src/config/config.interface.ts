export interface Config {
  common: {
    NODE_ENV: string;
    PORT: number;
  };
  session: {
    cookieMaxAge: number;
    storageCheckPeriod: number;
  };
  beginBalance?: number;
}
