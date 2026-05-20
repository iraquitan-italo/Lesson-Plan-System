import styles from './SmartAssistBtn.module.css';

export default function SmartAssistBtn({ onClick, loading }) {
  return (
    <div className={styles.containerIA}>
      <button 
        type="button" 
        onClick={onClick} 
        disabled={loading}
        className={styles.btnSmartAssist}
      >
        {loading ? '🤖 Pensando nas melhores ideias...' : '✨ Gerar Recomendações com IA (Preencher via IA)'}
      </button>
    </div>
  );
}