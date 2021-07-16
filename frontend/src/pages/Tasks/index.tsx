import React, { useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import './index.css';

interface TaskData {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const history = useHistory();

  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const response = await api.get('/tasks');

    setTasks(response.data);
  }

  const handleNewTask = () => history.push('/tasks_actions');

  const handleEditTask = (id: number) => {
    history.push(`/tasks_actions/${id}`);
  }

  const handlefinishedTask = async (id: number) => {
    await api.patch(`/tasks/${id}`);

    loadTasks();
  }

  const handleTaskDetail = (id: number) => {
    history.push(`/tasks/${id}`);
  }

  const handleRemoveTask = async (id: number) => {
    const option = window.confirm('Deseja mesmo apagar?');

    if(option) {
      await api.delete(`tasks/${id}`);

      loadTasks();
    }
  }

  const formatDate = (date: Date) => {
    return moment(date).format('DD/MM/YYYY');
  }

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h1>Tarefas</h1>
        <Button 
          variant="dark" 
          size="sm" 
          onClick={handleNewTask}
        >
          Nova Tarefa
        </Button>
      </div>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Data de Atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formatDate(task.updated_at)}</td>
              <td>
                <Badge variant={task.finished ? 'success' : 'warning'}>
                  {task.finished ? 'Finalizado' : 'Pendente'}
                </Badge>
              </td>
              <td>
                
                {
                  !task.finished && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleEditTask(task.id)}
                      >
                        Editar
                      </Button>
                      {' '}
                      <Button 
                        size="sm" 
                        className="btn-success" 
                        onClick={() => handlefinishedTask(task.id)}
                      >
                        Finalizar
                      </Button>
                    </>
                  )
                }
                {' '}
                <Button 
                  size="sm" 
                  className="btn-info" 
                  onClick={() => handleTaskDetail(task.id)}
                >
                  Visualizar
                </Button>{' '}
                <Button 
                  size="sm" 
                  className="btn-danger"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Tasks;