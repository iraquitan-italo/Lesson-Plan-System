import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PainelFiltros from '../components/PainelFiltros';
import Paginacao from '../components/Paginacao';
import styles from './ListaPlanos.module.css';

export default function ListaPlanos() {
  const navigate = useNavigate();
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtros, setFiltros] = useState({ titulo: '', disciplina: '', tags: '', data_prevista: '', sort: 'created_at' });

  const carregarPlanos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/planos', { params: { page: pagina, limit: 5, ...filtros } });
      setPlanos(response.data.data);
      setTotalPaginas(response.data.totalPages);
    } catch (err) {
      alert('Erro ao carregar os planos de aula.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarPlanos(); }, [pagina]);

  const lidarComMudancaFiltro = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });
  
  const aplicarFiltros = (e) => {
    e.preventDefault();
    setPagina(1);
    carregarPlanos();
  };

  const deletarPlano = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      try {
        await api.delete(`/planos/${id}`);
        carregarPlanos();
      } catch (err) { alert('Erro ao excluir o plano.'); }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topo}>
        <h2>📋 Planos de Aula Cadastrados</h2>
        <button onClick={() => navigate('/planos/novo')} className={styles.btnSucesso}>
          ➕ Novo Plano
        </button>
      </div>

      <PainelFiltros 
        filtros={filtros} 
        onMudanca={lidarComMudancaFiltro} 
        onFiltrar={aplicarFiltros} 
      />

      {loading ? <p>Carregando planos de aula...</p> : (
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Disciplina</th>
              <th>Data Prevista</th>
              <th>Tags</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {planos.length === 0 ? (
              <tr>
                <td colSpan="5" className={styles.semDados}>Nenhum plano encontrado.</td>
              </tr>
            ) : planos.map(plano => (
              <tr key={plano.id}>
                <td><strong>{plano.titulo}</strong></td>
                <td>{plano.disciplina}</td>
                <td>{new Date(plano.data_prevista).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                <td>
                  {plano.tags?.split(',').map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag.trim()}</span>
                  ))}
                </td>
                <td>
                  <button onClick={() => navigate(`/planos/editar/${plano.id}`, { state: plano })} className={styles.btnEditar}>✏️</button>
                  <button onClick={() => deletarPlano(plano.id)} className={styles.btnDeletar}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Paginacao 
        paginaActual={pagina} 
        totalPaginas={totalPaginas} 
        onMudarPagina={setPagina} 
      />
    </div>
  );
}