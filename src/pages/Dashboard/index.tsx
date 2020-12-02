import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import GithubLogo from '../../assets/github-logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  // html_url: string;
  description: string | null;
  owner: {
    avatar_url: string;
    login: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositoryInput, setRepositoryInput] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const localStorageRepositories = localStorage.getItem(
      '@Github_explorer:repositories',
    );
    if (localStorageRepositories) return JSON.parse(localStorageRepositories);
    return [];
  });
  const [errorRepositoryInput, setErrorRepositoryInput] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@Github_explorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleNewRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!repositoryInput) {
      setErrorRepositoryInput(
        "Please, type down the repository's author/name.",
      );
      return;
    }
    try {
      const response = await api.get<Repository>(`/repos/${repositoryInput}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);

      setRepositoryInput('');
      setErrorRepositoryInput('');
    } catch (err) {
      setErrorRepositoryInput("Oooops, we couldn't find you repository 😐");
    }
  }
  return (
    <>
      <img src={GithubLogo} alt="Github logo" />
      <Title>Explore repositories on GitHub</Title>

      <Form hasError={!!errorRepositoryInput} onSubmit={handleNewRepository}>
        <input
          value={repositoryInput}
          onChange={(e) => setRepositoryInput(e.target.value)}
          placeholder="author/repository"
        />
        <button type="submit">Search</button>
      </Form>
      {errorRepositoryInput && <Error>{errorRepositoryInput}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={30} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
