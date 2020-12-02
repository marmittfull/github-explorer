import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import GithubLogo from '../../assets/github-logo.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
  full_name: string;
  html_url: string;
  description: string | null;
  owner: {
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositoryInput, setRepositoryInput] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleNewRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const repo = await api.get(`/repos/${repositoryInput}`);
    const repository = repo.data;
    setRepositories([...repositories, repository]);

    setRepositoryInput('');
  }
  return (
    <>
      <img src={GithubLogo} alt="Githuvb logo" />
      <Title>Explore repositórios no GitHub</Title>

      <Form onSubmit={(e) => handleNewRepository(e)}>
        <input
          value={repositoryInput}
          onChange={(e) => setRepositoryInput(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        {repositories.map((repository) => (
          <a href={repository.html_url}>
            <img src={repository.owner.avatar_url} alt="avatar" />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={30} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
