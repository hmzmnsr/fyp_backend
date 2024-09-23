import { userRouter } from "../routes/user.router.js";
import { downloadRouter } from "../routes/download.route.js";
import { facultyRouter } from "../routes/faculty.route.js";
import { albumRouter } from "../routes/gallery.route.js";
import { alumniRouter } from "../routes/alumni.route.js";
import { eventRouter } from "../routes/event.route.js";
import { bscsRouter } from "../routes/bscs.route.js";
;

const defineRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/bscs', bscsRouter );
  app.use('/api/downloads', downloadRouter);
  app.use('/api/faculty', facultyRouter);
  app.use('/api/gallery', albumRouter);
  app.use('/api/alumni', alumniRouter);
  app.use('/api/event', eventRouter);
};

export { defineRoutes };
