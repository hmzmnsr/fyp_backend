import { userRouter } from "../routes/user.router.js";
import { downloadRouter } from "../routes/download.route.js";
import { facultyRouter } from "../routes/faculty.route.js";
import { albumRouter } from "../routes/gallery.route.js";
import { alumniRouter } from "../routes/alumni.route.js";
import { eventRouter } from "../routes/event.route.js";
import { bscsRouter } from "../routes/bscs.route.js";
import { bsseRouter } from "../routes/bsse.route.js";
import { adpcsRouter } from "../routes/adpcs.route.js";
import { mscsRouter } from "../routes/mscs.route.js";
import { phdcsRouter } from "../routes/phdcs.route.js";
;

const defineRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/bscs', bscsRouter );
  app.use('/api/bsse', bsseRouter );
  app.use('/api/adpcs', adpcsRouter );
  app.use('/api/mscs', mscsRouter );
  app.use('/api/phdcs', phdcsRouter );
  app.use('/api/downloads', downloadRouter);
  app.use('/api/faculty', facultyRouter);
  app.use('/api/gallery', albumRouter);
  app.use('/api/alumni', alumniRouter);
  app.use('/api/event', eventRouter);
};

export { defineRoutes };
