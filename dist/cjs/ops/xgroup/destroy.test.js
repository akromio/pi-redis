"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  sim,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const op = _core.dogma.use(require("./destroy"));
const buildParams = op.parameterizer;
const buildTitle = op.title;
const handle = op.fun;
suite(__filename, () => {
  {
    const stream = "my-stream";
    const group = "my-group";
    suite("buildParams()", () => {
      {
        test("when list, {stream, group} must be returned", () => {
          {
            const args = [stream, group];
            const out = buildParams(args);
            expected(out).equalTo({
              'stream': stream,
              'group': group
            });
          }
        });
        test("when map, {stream, group} must be returned", () => {
          {
            const args = {
              ["stream"]: stream,
              ["group"]: group
            };
            const out = buildParams(args);
            expected(out).equalTo({
              'stream': stream,
              'group': group
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a title must be returned", () => {
          {
            const params = {
              ["stream"]: stream,
              ["group"]: group
            };
            const out = buildTitle(params);
            expected(out).equalTo(`redis: XGROUP DESTROY ${stream} ${group}`);
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when called, redis.sendCommand() must be called", async () => {
          {
            const params = {
              ["stream"]: stream,
              ["group"]: group
            };
            const redis = monitor(sim({
              'sendCommand': method.resolves(1)
            }));
            const state = {
              ["redis"]: redis
            };
            const out = (0, await handle({
              'state': state,
              'params': params
            }));
            expected(out).equalTo(1);
            const sendCommand = monitor.log(redis, {
              'clear': true
            });
            expected(sendCommand.calls).equalTo(1);
            expected(sendCommand.call.args).first.equalTo(["XGROUP", "DESTROY", stream, group]);
          }
        });
      }
    });
  }
});