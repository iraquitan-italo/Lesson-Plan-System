import styles from './Paginacao.module.css';

export default function Paginacao({ paginaActual, totalPaginas, onMudarPagina }) {
  // Se o total de páginas vier como 0 do backend (sem registros), ajustamos visualmente para 1
  const totalSeguro = totalPaginas === 0 ? 1 : totalPaginas;

  return (
    <div className={styles.paginacao}>
      <button 
        disabled={paginaActual === 1} 
        onClick={() => onMudarPagina(paginaActual - 1)}
      >
        Anterior
      </button>
      
      <span>Página {paginaActual} de {totalSeguro}</span>
      
      <button 
        // O botão "Próxima" agora desativa se estiver na última página OU se não houver registros
        disabled={paginaActual >= totalSeguro || totalPaginas === 0} 
        onClick={() => onMudarPagina(paginaActual + 1)}
      >
        Próxima
      </button>
    </div>
  );
}