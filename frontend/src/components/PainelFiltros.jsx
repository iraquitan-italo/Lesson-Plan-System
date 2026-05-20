import styles from './PainelFiltros.module.css';

export default function PainelFiltros({ filtros, onMudanca, onFiltrar }) {
  return (
    <form onSubmit={onFiltrar} className={styles.painelFiltros}>
      <input type="text" name="titulo" placeholder="Buscar por título..." value={filtros.titulo} onChange={onMudanca} className={styles.inputFiltro} />
      <input type="text" name="disciplina" placeholder="Disciplina..." value={filtros.disciplina} onChange={onMudanca} className={styles.inputFiltro} />
      <input type="text" name="tags" placeholder="Tag..." value={filtros.tags} onChange={onMudanca} className={styles.inputFiltro} />
      <input type="date" name="data_prevista" value={filtros.data_prevista} onChange={onMudanca} className={styles.inputFiltro} />
      <select name="sort" value={filtros.sort || 'created_at'} onChange={onMudanca}  className={styles.inputFiltro}>
        <option value="created_at">Mais Recentes</option>
        <option value="titulo">Ordem Alfabética</option>
      </select>
      <button type="submit" className={styles.btnFiltrar}>Filtrar</button>
    </form>
  );
}