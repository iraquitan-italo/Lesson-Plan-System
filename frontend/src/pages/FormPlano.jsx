import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../services/api';
import SmartAssistBtn from '../components/SmartAssistBtn';
import styles from './FormPlano.module.css';

export default function FormPlano() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditing = !!id;

  const [form, setForm] = useState({
    titulo: '', disciplina: '', objetivo: '', ementa: '', data_prevista: '', conteudos: '', recursos_apoio: '', tags: ''
  });
  const [loadingIA, setLoadingIA] = useState(false);

  useEffect(() => {
    if (isEditing && location.state) {
      const plano = location.state;
      const dataFormatada = plano.data_prevista.split('T')[0];
      setForm({ ...plano, data_prevista: dataFormatada });
    }
  }, [id, isEditing, location.state]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const executarSmartAssist = async () => {
    if (!form.titulo || !form.disciplina || !form.ementa) {
      alert('Por favor, preencha Título, Disciplina e Ementa para que a IA possa gerar sugestões completas.');
      return;
    }
    setLoadingIA(true);
    try {
      const response = await api.post('/planos/smart-assist', {
        titulo: form.titulo, disciplina: form.disciplina, ementa: form.ementa
      });
      const { conteudos_complementares, topicos_relacionados, tags } = response.data;
      setForm(prev => ({ ...prev, conteudos: topicos_relacionados, recursos_apoio: conteudos_complementares, tags: tags }));
      alert('✨ Conteúdos e tags sugeridos pela Groq aplicados com sucesso!');
    } catch (err) {
      alert('Falha ao obter resposta do assistente inteligente.');
    } finally { setLoadingIA(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const { id, created_at, ...dadosParaEnviar} = form;
        await api.put(`/planos/${id}`, dadosParaEnviar);
        alert('Plano de aula atualizado!');
      } else {
        await api.post('/planos', form);
        alert('Plano de aula cadastrado!');
      }
      navigate('/planos');
    } catch (err) { alert(err.response?.data?.error || 'Erro ao salvar.'); }
  };

  return (
    <div className={styles.container}>
      <h2>{isEditing ? '✏️ Editar Plano de Aula' : '➕ Novo Plano de Aula'}</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label className={styles.label}><strong>Título da Aula*</strong></label>
            <input type="text" name="titulo" required value={form.titulo} onChange={handleChange} className={styles.input} />
          </div>
          <div>
            <label className={styles.label}><strong>Disciplina*</strong></label>
            <input type="text" name="disciplina" required value={form.disciplina} onChange={handleChange} className={styles.input} />
          </div>
        </div>

        <div>
          <label className={styles.label}><strong>Objetivo da Aula*</strong></label>
          <textarea name="objetivo" required value={form.objetivo} onChange={handleChange} rows="3" className={styles.textarea}></textarea>
        </div>

        <div>
          <label className={styles.label}><strong>Ementa/Resumo da Aula*</strong></label>
          <textarea name="ementa" required value={form.ementa} onChange={handleChange} rows="3" className={styles.textarea} placeholder="Descreva brevemente o tema..."></textarea>
        </div>

        <div>
          <label className={styles.label}><strong>Data Prevista*</strong></label>
          <input type="date" name="data_prevista" required value={form.data_prevista} onChange={handleChange} className={styles.inputData} />
        </div>

        <SmartAssistBtn onClick={executarSmartAssist} loading={loadingIA} />

        <div>
          <label className={styles.label}><strong>Conteúdos Programáticos (Tópicos)</strong></label>
          <textarea name="conteudos" value={form.conteudos} onChange={handleChange} rows="4" className={styles.textarea}></textarea>
        </div>

        <div>
          <label className={styles.label}><strong>Recursos de Apoio & Referências</strong></label>
          <textarea name="recursos_apoio" value={form.recursos_apoio} onChange={handleChange} rows="4" className={styles.textarea}></textarea>
        </div>

        <div>
          <label className={styles.label}><strong>Tags (separadas por vírgula)</strong></label>
          <input type="text" name="tags" value={form.tags} onChange={handleChange} className={styles.input} />
        </div>

        <div className={styles.acoes}>
          <button type="submit" className={styles.btnSalvar}>Salvar Plano</button>
          <button type="button" onClick={() => navigate('/planos')} className={styles.btnCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}