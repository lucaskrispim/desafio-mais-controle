import React, { useState, useEffect } from 'react';
import { Table, Button, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

type ObraData = {
  id: string,
  name: string,
  address: string,

}

const Obras: React.FC = () => {

  const [obras, setObras] = useState<ObraData[]>([]);
  const history = useHistory();
  useEffect(() => {
    loadObras();
  }, []);

  async function loadObras() {
    try {
      const response = await api.get('/obra/');

      setObras(response.data);

    } catch (error) {
      console.log("deu erro");
    }
  }

  function newObra(){
    history.push('/obras_cadastro');
  }

  function editObra(id: string){
    history.push(`/obras_cadastro/${id}`)
  }

  async function deleteObra(id: string){
    try {
      await api.delete(`/obra/delete/${id}`);
      loadObras();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <br />
        <div className="row"><Col md={{ span: 2, offset: 0 }} ><h1>Obras</h1></Col> <Col md={{ span: 2, offset: 8 }}><Button onClick={newObra} size="lg">Adicionar</Button></Col> </div>
        <br />
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>

              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            {
              obras.map(obra => (
                <tr key={obra.id}>

                  <td>{obra.name}</td>
                  <td> {obra.address}</td>
                  <td> <Button variant="warning" size="sm" onClick={()=>editObra(obra.id)}>Editar</Button> <Button variant="danger" onClick={()=>deleteObra(obra.id)} size="sm">Excluir</Button> </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>

    </>
  );
}

export default Obras;