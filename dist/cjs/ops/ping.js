"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Perform a ping to a Redis instance.",
  ["title"]: "redis: ping",
  ["fun"]: handle
};
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    state
  } = ctx;
  {
    return state.redis.ping();
  }
}