"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  interceptor,
  sim,
  fun,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const redis = _core.dogma.use(require("@redis/client"));
suite(__filename, () => {
  {
    const redisPath = require.resolve("@redis/client");
    setup(() => {
      {
        const client = sim({
          'connect': method.resolves(),
          'disconnect': method.resolves()
        });
        interceptor.module(redisPath, {
          'createClient': fun.returns(client)
        });
      }
    });
    teardown(async () => {
      {
        interceptor.clear(redisPath);
      }
    });
    test("when called, api must be returned", () => {
      {
        const out = _core.dogma.use(require("./index"));
        expected(out.ops).toHave(["ping", "xgroup.create", "xgroup.destroy"]);
      }
    });
    test("when ini() called, state must be returned", async () => {
      {
        const pi = _core.dogma.use(require("./index"));
        const out = (0, await pi.ini({}));
        expected(out).toHave("redis");
      }
    });
    test("when ini(args) called, state must be returned", async () => {
      {
        const pi = _core.dogma.use(require("./index"));
        const out = (0, await pi.ini({
          'host': "localhost",
          'port': 6379,
          'username': "me",
          'password': "pass",
          'readonly': true
        }));
        expected(out).toHave("redis");
      }
    });
    test("when fin() called, state.redis used and nothing must be returned", async () => {
      {
        const pi = _core.dogma.use(require("./index"));
        const state = (0, await pi.ini({}));
        const out = (0, await pi.fin(state));
        expected(out).toBeNil();
      }
    });
  }
});