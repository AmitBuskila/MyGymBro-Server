import { Router } from 'express';
import {
  addTemplate,
  getTemplates,
  removeTemplate,
  updateTemplate,
  getTemplateStats,
} from '../controllers/template.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.middleware';

const templateRouter = Router();

templateRouter.post(
  '/addTemplate',
  authenticateToken,
  asyncErrorHandler(addTemplate),
);
templateRouter.delete(
  '/removeTemplate/:templateId',
  authenticateToken,
  asyncErrorHandler(removeTemplate),
);
templateRouter.put(
  '/updateTemplate/:templateId',
  authenticateToken,
  asyncErrorHandler(updateTemplate),
);
templateRouter.get(
  '/getTemplates/:userId',
  authenticateToken,
  asyncErrorHandler(getTemplates),
);

templateRouter.get(
  '/getTemplateStats/:templateId',
  authenticateToken,
  asyncErrorHandler(getTemplateStats),
);

export default templateRouter;
