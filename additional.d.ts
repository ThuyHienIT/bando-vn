/// <reference path="./typings/api.d.ts" />

// You may need the next line in some situations
// import * as IronSession from "iron-session";

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserInfo;
    jwt_token?: string;
    jwt_expires?: number;
  }
}

declare global {
  var __RECOIL_DATA__: {
    user?: UserInfo;
  };
}

export {};
