import { Router } from 'express';
import { addTemplate, getTemplates } from '../controllers/template.controller';
import authenticateToken from '../middlewares/auth.middleware';

const templateRouter = Router();

templateRouter.post('/addTemplate', authenticateToken, addTemplate);
templateRouter.get('/getTemplates/:userId', authenticateToken, getTemplates);

export default templateRouter;
