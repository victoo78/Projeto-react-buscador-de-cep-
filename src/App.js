import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum CEP');
      return;
    }

    try {
      const response = await api.get(`/${input}/json`);

      setCep(response.data);

      setInput('');
    } catch (error) {
      alert('Erro ao buscar CEP');
      setInput('');
    }
  }

  return (
    <div className="Container">
      <h1 className="title">Buscar CEP</h1>

      <div className="InputContainer">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            Localidade: {cep.localidade} - UF: {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
