import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';

type ObrasData = {
  name: string,
  address: string,
}

const ObrasForm: React.FC = () => {

  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<ObrasData>({
    name: '',
    address: '',
  });


  useEffect(() => {
    async function findObra() {
      try {
        if (id) {
          const response = await api.get(`obra/${id}`);
          setModel({
            name: response.data.name,
            address: response.data.address,

          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    findObra();
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
        await api.put(`/obra/modify/${id}`, { name: model.name, address: model.address });
      } else {
        await api.post('/obra/create', { name: model.name, address: model.address });
      }
      back();
    } catch (error) {
      console.log(error);
    }
  }

  function back() {
    history.goBack();
  }

  return (
    <div className="container">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formDesc">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Digite o nome da obra" value={model.name} required name="name" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
        </Form.Group>
        <Form.Group controlId="formDesc2">
          <Form.Label>Endereço</Form.Label>
          <Form.Control type="text" placeholder="Digite o endereço da obra" value={model.address} required name="address" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
        </Form.Group>
        <Button className="m-1 my-2" variant="danger" onClick={back}> Cancelar </Button>
        <Button className="m-1 my-2" variant="success" type="submit"> Salvar </Button>
      </Form>
    </div>
  );
}

export default ObrasForm;