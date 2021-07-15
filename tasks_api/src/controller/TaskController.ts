import {getRepository} from 'typeorm';
import {Tasks} from '../entity/Tasks';
import {Request, Response} from 'express';

export const read = async (req: Request, res: Response) => {
  const tasks = await getRepository(Tasks).find();

  return res.json(tasks);
}

export const readTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await getRepository(Tasks).findOne(id);

  if(task) {
    return res.json(task);
  }

  return res.status(204).send();
}

export const create = async (req: Request, res: Response) => {
  const { title, description, finished } = req.body;

  const task = await getRepository(Tasks).save({
    title,
    description,
    finished,
  });

  return res.status(201).json(task);
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const task = await getRepository(Tasks).update(id, {
    title,
    description,
  });

  if(task.affected === 1) {
    const taskUpdated = await getRepository(Tasks).findOne(id);

    return res.json(taskUpdated);
  }

  return res.status(404).json({message: 'Task not found!'});
}

export const finishedTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await getRepository(Tasks).update(id, {
    finished: true,
  });

  if(task.affected === 1) {
    return res.json({message: 'Task finished!'});
  }

  return res.status(404).json({message: 'Task not found!'});
}

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await getRepository(Tasks).delete(id);

  if(task.affected === 1) {
    return res.status(204).send();
  }

  return res.status(404).json({message: 'Task not found!'});
}