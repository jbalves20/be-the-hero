import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from "../../assets/logo.svg"

export default function ProfiledIncidents() {
  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('our-incidents', {
      headers: {
        authorization: ngoId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert(`Erro ao excluir caso, tente novamente (${err})`);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/')
  }

  return (
    <div className="profiled-incidents-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem-vinda, {ngoName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button
          type="button"
          onClick={handleLogout}
        >
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => {
          return (
            <li key={incident.id}>
              <strong>CASO: </strong>
              <p>{incident.title}</p>
              <strong>DESCRIÇÃO: </strong>
              <p>{incident.description}</p>
              <strong>VALOR: </strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
              <button 
                type="button"
                onClick={() => handleDeleteIncident(incident.id)}
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  )
}