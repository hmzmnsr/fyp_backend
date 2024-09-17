import { userRouter } from "../routes/user.router.js";
import { programRouter } from "../routes/program.route.js";
import { downloadRouter } from "../routes/download.route.js";
import { facultyRouter } from "../routes/faculty.route.js";
import { albumRouter } from "../routes/gallery.route.js";

const defineRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/programs', programRouter);
  app.use('/api/downloads', downloadRouter);
  app.use('/api/faculty', facultyRouter);
  app.use('/api/gallery', albumRouter)
};

export { defineRoutes };
