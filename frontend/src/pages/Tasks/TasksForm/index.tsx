import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../../services/api';

interface ModelData {
  title: string;
  description: string;
}

interface ParamsProps {
  id: string;
}

const TasksForm: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<ParamsProps>();

  useEffect(() => {
    if(id) {
      findTask(id);
    }
  }, [id]);

  const [model, setModel] = useState<ModelData>({title: '', description: ''});

  const changeModel = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({
      ...model,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!model.title || !model.description) {
      return alert('Preencha os campos');
    }

    if(id) {
      try {
        await api.put(`/tasks/${id}`, model);
      } catch(err) {
        alert('Ocorreu algum erro ao cadastrar sua tarefa');
      }
    } else {
      try {
        await api.post('/tasks', model);
      } catch(err) {
        alert('Ocorreu algum erro ao cadastrar sua tarefa');
      }
    }

    history.push('/tasks');
  }

  const findTask = async (id: string) => {
    try {
      const response = await api.get(`/tasks/${id}`);

      if(response.status === 204 || response.data.finished) {
        return history.push('/tasks');
      }

      setModel({
        title: response.data.title,
        description: response.data.description,
      });
    } catch(err) {
      console.log(err);
    }
  }

  const handleBack = () => history.push('/tasks');

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h1>{id ? 'Editar' : 'Nova'} Tarefa</h1>
        <Button variant="dark" size="sm" onClick={handleBack}>Voltar</Button>
      </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Titulo"
              name="title"
              value={model.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) => changeModel(event)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Descrição da tarefa"
              name="description"
              value={model.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => changeModel(event)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            {id ? 'Editar' : 'Cadastrar'}
          </Button>
        </Form>
    </div>
  )
}

export default TasksForm;