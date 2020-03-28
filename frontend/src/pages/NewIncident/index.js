import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const ngoId = localStorage.getItem('ngoId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  async function handleInsert(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId
        }
      });
      alert('Caso registrado com sucesso!');
      history.push('/profiled-incidents');
    } catch (err) {
      alert(`Falha ao incluir caso, tente novamente (${err})`);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o texto detalhadamente para encontrar um herói para resolver esse caso.</p>
          <Link className="back-link" to="/profiled-incidents">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para a home
          </Link>
        </section>
        <form onSubmit={handleInsert}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}