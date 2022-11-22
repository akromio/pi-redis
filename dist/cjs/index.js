"use strict";

var _core = require("@dogmalang/core");
const {
  createClient
} = _core.dogma.use(require("@redis/client"));
module.exports = exports = {
  ["plugin"]: "redis",
  ["desc"]: "Akromio plugin for working with Redis.",
  ["tags"]: [],
  ["ini"]: initialize,
  ["fin"]: finalize,
  ["ops"]: {
    ["ping"]: _core.dogma.use(require("./ops/ping"))
  }
};
async function initialize(args) {
  let state = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    var _args$host, _args$port, _args$readonly;
    const client = createClient(Object.assign({}, {
      ["socket"]: {
        ["host"]: (_args$host = args.host) !== null && _args$host !== void 0 ? _args$host : "localhost",
        ["port"]: (_args$port = args.port) !== null && _args$port !== void 0 ? _args$port : 6379
      },
      ["readonly"]: (_args$readonly = args.readonly) !== null && _args$readonly !== void 0 ? _args$readonly : false
    }, args.username ? {
      ["username"]: args.username
    } : {}, args.password ? {
      ["password"]: args.password
    } : {}));
    0, await client.connect();
    _core.dogma.update(state, {
      name: "redis",
      visib: ".",
      assign: "=",
      value: client
    });
  }
  return state;
}
async function finalize(state) {
  /* c8 ignore next */_core.dogma.expect("state", state, _core.dogma.intf("inline", {
    redis: {
      optional: false,
      type: null
    }
  }));
  let {
    redis
  } = state;
  {
    0, await redis.disconnect();
  }
}