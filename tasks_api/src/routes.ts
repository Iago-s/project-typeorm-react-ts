import { Router, Request, Response } from 'express';

const routes = Router();
import { read, readTask, create, update, finishedTask, remove } from './controller/TaskController';

routes.get('/', (req: Request, res: Response) => {
  res.json({message: 'Hello api'});
});

routes.get('/tasks', read);
routes.get('/tasks/:id', readTask);
routes.post('/tasks', create);
routes.put('/tasks/:id', update);
routes.patch('/tasks/:id', finishedTask);
routes.delete('/tasks/:id', remove);

export default routes;
