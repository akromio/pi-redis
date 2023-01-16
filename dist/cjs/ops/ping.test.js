"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const pi = _core.dogma.use(require("./ping"));
suite(__filename, () => {
  {
    const handle = pi.fun;
    suite("handle()", () => {
      {
        test("when connected, nothing must be returned", async () => {
          {
            const params = {};
            const redis = sim({
              'ping': method.resolves("PONG")
            });
            const out = (0, await handle({
              'state': {
                ["redis"]: redis
              },
              'params': params
            }));
            expected(out).equalTo("PONG");
          }
        });
      }
    });
  }
});