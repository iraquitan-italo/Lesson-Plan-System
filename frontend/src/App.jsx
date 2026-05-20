import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListaPlanos from './pages/ListaPlanos';
import FormPlano from './pages/FormPlano';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1 className={styles.title}>📚 Sistema de Gestão de Planos de Aula</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/planos" />} />
            <Route path="/planos" element={<ListaPlanos />} />
            <Route path="/planos/novo" element={<FormPlano />} />
            <Route path="/planos/editar/:id" element={<FormPlano />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;