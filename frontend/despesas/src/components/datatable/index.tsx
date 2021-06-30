import Pagination from "../pagination";
import { useState, useEffect } from "react";
import { Col, Button } from 'react-bootstrap';
import { DespesaDataPage } from "../../types/despesa";
import { useHistory } from 'react-router-dom';
import { formatLocalDate } from "../../utils/format";
import api from '../../services/api';

const DataTable = () => {

  const [activePage, setActivePage] = useState(0);

  const history = useHistory();

  const [page, setDespesasPage] = useState<DespesaDataPage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0
  });

  const loadDespesas = async () => {
    try {
      const response = await api.get(`/despesa/?page=${activePage}&size=10`);
      setDespesasPage(response.data);

    } catch (error) {
      console.log("deu erro");
    }
  }
  
  useEffect(() => {

    const loadDespesas = async () => {
      try {
        const response = await api.get(`/despesa/?page=${activePage}&size=10`);
        setDespesasPage(response.data);
  
      } catch (error) {
        console.log("deu erro");
      }
    }
    loadDespesas();
  }, [activePage]);

  const changePage = (index: number) => {
    setActivePage(index);
  }

  function newDespesa() {
    history.push('/despesas_cadastro');
  }

  function editDespesa(id: string) {
    history.push(`/despesas_cadastro/${id}`)
  }

  async function deleteDespesa(id: string) {
    try {
      await api.delete(`/despesa/delete/${id}`);
      loadDespesas();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <br />
      <div className="row"><Col md={{ span: 2, offset: 0 }} ><h1>Lançamentos</h1></Col> <Col md={{ span: 2, offset: 8 }}><Button onClick={newDespesa} size="lg">Adicionar</Button></Col> </div>
      <br />
      <Pagination page={page} onPageChange={changePage} />
      <div className="table-responsive">
        <table className="table table-striped table-sm">
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

              page.content?.map(despesa => (
                <tr key={despesa.id}>
                  <td>{despesa.description}</td>
                  <td>R$ {despesa.value.toFixed(2)}</td>
                  <td>{despesa.obra.name}</td>
                  <td>{formatLocalDate(despesa.date, "dd/MM/yyyy")}</td>
                  <td> <Button variant="warning" size="sm" onClick={() => editDespesa(despesa.id)}>Editar</Button> <Button variant="danger" onClick={() => deleteDespesa(despesa.id)} size="sm">Excluir</Button> </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;