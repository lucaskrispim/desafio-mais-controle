import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Form } from 'react-bootstrap';
import {formatLocalDate} from '../../../utils/format';
import api from '../../../services/api';

type ObrasData = {
  id: string,
  name: string,
  address: string,
  createdAt: string,
  updatedAt: string,
}

type DespesasData = {
  value: number,
  description: string,
  date: string,
  obra: string,
}

const DespesasForm: React.FC = () => {

  const [obras, setObras] = useState<ObrasData[]>([]);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<DespesasData>({
    value: 0,
    description: '',
    date: '',
    obra: ''
  });


  useEffect(() => {
    async function findDespesa() {
      try {
        if (id) {
          const response = await api.get(`despesa/${id}`);
          setModel({
            value: response.data.value.toFixed(2),
            description: response.data.description,
            date: formatLocalDate(response.data.date, "yyyy-MM-dd"),
            obra: response.data.obra,

          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    findDespesa();
  }, [id])




  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {

      if (id) {
        await api.put(`/despesa/modify/${id}`, { value: model.value, description: model.description, date: model.date, obra: model.obra });
      } else {
        await api.post('/despesa/create', { value: model.value, description: model.description, date: model.date, obra: model.obra });
      }
      back();

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadObras() {

      try {
        const response = await api.get('/obra/');
        setObras(response.data);
      } catch (error) {
        console.log("deu erro");
      }
    }

    loadObras();
  }, []);



  function back() {
    history.goBack();
  }

  return (
    <div className="container">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formDesc">
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" placeholder="Digite a descrição da despesa" value={model.description} required name="description" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />

        </Form.Group>
        <Form.Group controlId="formDesc">
          <Form.Label>Valor</Form.Label>
          <Form.Control type="number" step="0.01" min="0" placeholder="casas decimais separadas por ponto Ex 15.50" value={model.value} required name="value" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
          <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid"> Please choose a username. </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formData">
          <Form.Label>Data</Form.Label>
          <Form.Control type="date" required name="date" value={model.date}  onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Obra</Form.Label>
          <Form.Control as="select" required name="obra" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}>
            <option key={1 || ""} value={model.obra ? model.obra : "Escolha..."} >{model.obra ? model.obra : "Escolha..."}</option>
            {

              obras.map(obra => (
                <option key={obra.id} value={obra.name} >{obra.name}</option>
              ))
            }
          </Form.Control>
        </Form.Group>

        <Button className="m-1 my-2" variant="danger" onClick={back}>
          Cancelar
  </Button>
        <Button className="m-1 my-2" variant="success" type="submit">
          Salvar
  </Button>
      </Form>


    </div>
  );
}

export default DespesasForm;