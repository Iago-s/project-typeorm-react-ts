import React, { useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import moment from 'moment';

import api from '../../services/api';

interface TaskData {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const response = await api.get('/tasks');

    setTasks(response.data);
  }

  const formatDate = (date: Date) => {
    return moment(date).format('DD/MM/YYYY');
  }

  return (
    <div className="container">
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
                <Button size="sm">Editar</Button>{' '}
                <Button size="sm" className="btn-success">Finalizar</Button>{' '}
                <Button size="sm" className="btn-info">Visualizar</Button>{' '}
                <Button size="sm" className="btn-danger">Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Tasks;