"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  createClient
} = _core.dogma.use(require("redis"));
const pi = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    const {
      ini,
      fin
    } = pi;
    let state;
    let redis;
    setup(async () => {
      {
        ({
          redis: redis
        } = state = (0, await ini({
          'host': "localhost",
          'port': 6379
        })));
      }
    });
    teardown(async () => {
      {
        0, await fin(state);
      }
    });
    suite("PING", () => {
      {
        const {
          ping
        } = pi.ops;
        test("perform ping for getting pong", async () => {
          {
            const out = (0, await ping.fun({
              'state': state,
              'params': {}
            }));
            expected(out).equalTo("PONG");
          }
        });
      }
    });
    suite("XCREATE GROUP", () => {
      {
        const xcreate = _core.dogma.getItem(pi.ops, "xgroup.create");
        const stream = "my-stream";
        const group = "my-group";
        test("create a consumer group", async () => {
          {
            const out = (0, await xcreate.fun({
              'state': state,
              'params': {
                ["stream"]: stream,
                ["group"]: group
              }
            }));
            expected(out).equalTo("OK");
            const groups = (0, await redis.sendCommand(["XINFO", "GROUPS", stream]));
            expected(_core.dogma.getItem(groups, 0)).second.equalTo(group);
          }
        });
      }
    });
  }
});