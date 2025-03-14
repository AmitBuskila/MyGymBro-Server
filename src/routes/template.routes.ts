import { Router } from 'express';
import { addTemplate, getTemplates } from '../controllers/template.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.middleware';

const templateRouter = Router();

templateRouter.post(
  '/addTemplate',
  authenticateToken,
  asyncErrorHandler(addTemplate),
);
templateRouter.get(
  '/getTemplates/:userId',
  authenticateToken,
  asyncErrorHandler(getTemplates),
);

export default templateRouter;
