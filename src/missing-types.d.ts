declare module 'koa-websocket' {
  namespace websocketify {}
  function websocketify(arg: any) : any;
  export = websocketify;
}

declare module 'koa-route' {
  export function all(path: string, rest:any): any;
}
