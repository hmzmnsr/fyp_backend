import { userRouter } from "../routes/user.router.js";
import { programRouter } from "../routes/program.route.js";

const defineRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/programs', programRouter);  // Add the program router
};

export { defineRoutes };
