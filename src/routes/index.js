import { userRouter } from "../routes/user.router.js";
import { programRouter } from "../routes/program.route.js";
import { downloadRouter } from "../routes/download.route.js";

const defineRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/programs', programRouter);
  app.use('/api/downloads', downloadRouter);
};

export { defineRoutes };
