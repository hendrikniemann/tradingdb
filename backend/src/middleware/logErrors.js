/* @flow */

export default () => async function logErrors(
  ctx: { state: { logger: Object } },
  next: () => Promise<any>,
) {
  try {
    await next();
  } catch (error) {
    if (ctx.status === 500) {
      ctx.state.logger.error(
        `[middleware/logErrors]: A server error was thrown by a middle up the chain ${error}`,
      );
    }
    throw error;
  }
};
