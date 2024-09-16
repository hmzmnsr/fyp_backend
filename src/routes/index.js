import { userRouter } from "../routes/user.router.js"

const defineRoutes = (app) => {
  app.use('/api/users', userRouter);

};

export { defineRoutes };
 