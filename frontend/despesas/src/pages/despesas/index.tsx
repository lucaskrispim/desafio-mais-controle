import React, { useState, useEffect } from 'react';
import { Table, Button, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import { formatLocalDate } from "../../utils/format";

type DespesaData = {
  id: string,
  value: number,
  description: string,
  obra: string,
  date: string
}

const Despesas: React.FC = () => {

  const [despesas, setDespesas] = useState<DespesaData[]>([]);
  const history = useHistory();
  useEffect(() => {
    loadDespesas();
  }, []);

  async function loadDespesas() {

    try {
      const response = await api.get('/despesa/');

      setDespesas(response.data);

    } catch (error) {
      console.log("deu erro");
    }
  }

  function newTask(){
    history.push('/despesas_cadastro');
  }

  function editDespesa(id: string){
    history.push(`/despesas_cadastro/${id}`)
  }

  async function deleteDespesa(id: string){
    try {
      await api.delete(`/despesa/delete/${id}`);
      loadDespesas();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <br />
        <div className="row"><Col md={{ span: 2, offset: 0 }} ><h1>Lançamentos</h1></Col> <Col md={{ span: 2, offset: 8 }}><Button onClick={newTask} size="lg">Adicionar</Button></Col> </div>
        <br />
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>

              <th>Descrição</th>
              <th>Valor</th>
              <th>Obra</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            {
              despesas.map(despesa => (
                <tr key={despesa.id}>

                  <td>{despesa.description}</td>
                  <td>R$ {despesa.value.toFixed(2)}</td>
                  <td>{despesa.obra}</td>
                  <td>{formatLocalDate(despesa.date, "dd/MM/yyyy")}</td>
                  <td> <Button variant="warning" size="sm" onClick={()=>editDespesa(despesa.id)}>Editar</Button> <Button variant="danger" onClick={()=>deleteDespesa(despesa.id)} size="sm">Excluir</Button> </td>
                </tr>
              ))
            }


          </tbody>
        </Table>
      </div>

    </>
  );
}

export default Despesas;