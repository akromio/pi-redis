"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  createClient
} = _core.dogma.use(require("redis"));
const pi = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    suite("ping", () => {
      {
        const {
          ini,
          fin
        } = pi;
        const {
          ping
        } = pi.ops;
        let state;
        setup(async () => {
          {
            state = (0, await ini({
              'host': "localhost",
              'port': 6379
            }));
          }
        });
        teardown(async () => {
          {
            0, await fin(state);
          }
        });
        test("ping must return pong", async () => {
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
  }
});