"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Run a XGROUP DESTROY command.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handle
};
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          [params.stream, params.group] = _core.dogma.getArrayToUnpack(args, 2);
        }
      } else {
        {
          params = args;
        }
      }
    }
    _core.dogma.expect('params.stream', params.stream, _core.text);
    _core.dogma.expect('params.group', params.group, _core.text);
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    stream,
    group
  } = params;
  {
    return `redis: XGROUP DESTROY ${stream} ${group}`;
  }
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    state,
    params
  } = ctx;
  {
    return state.redis.sendCommand(["XGROUP", "DESTROY", params.stream, params.group]);
  }
}