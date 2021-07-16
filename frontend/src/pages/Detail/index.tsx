import React, { useState, useEffect } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import api from '../../services/api';

interface ParamsProps {
  id: string;
}

interface TaskData {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Datail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<ParamsProps>();

  const [task, setTask] = useState<TaskData>();

  useEffect(() => {
    getTask(id);
  }, [id]);

  const getTask = async (id: string) => {
    try {
      const response = await api.get<TaskData>(`/tasks/${id}`);

      if(response.status === 204) {
        return history.push('/tasks');
      }

      setTask(response.data);
    } catch(err) {}
  }

  function formatDate(date: Date | undefined) {
    return moment(date).format('DD/MM/YYYY');
  }

  const handleBack = () => {
    history.push('/tasks');
  }

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h1>Tarefa</h1>
        <Button variant="dark" size="sm" onClick={handleBack}>Voltar</Button>
      </div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>
            {task?.description}
            <br/>
            <Badge variant={task?.finished ? 'success' : 'warning'}>
              {task?.finished ? 'Finalizado' : 'Pendente'}
            </Badge>
            <br/>
            <strong>Data de cadastro: </strong>
            <Badge variant="info">
              {formatDate(task?.created_at)}
            </Badge>
            <br/>
            <strong>Data de atualização: </strong>
            <Badge variant="info">
              {formatDate(task?.updated_at)}
            </Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Datail;
