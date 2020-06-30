import React, { useState, FormEvent } from 'react';
// import Form from 'antd/lib/form/Form';
import { Title, Form, H1 } from './styles';
import api from '../../services/api';

interface UserDigit {
  login: string;
  passwrod: string;
}
const Dashboard: React.FC = () => {
  const [userApi, setUserApi] = useState('');
  const [userApiPassword, setUserApiPassword] = useState('');
  const [userLogin, setUserLogin] = useState<UserDigit[]>([]);

  async function handleAreaLogin(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const response = await api.get<UserDigit>(`list/${userLogin}`);

    const digitado = response.data;
    setUserLogin([...userLogin, digitado]);
    setUserApi('');
  }

  return (
    <>
      <Title>Dashboard</Title>
      <Form onSubmitCapture={handleAreaLogin}>
        <input
          value={userApi}
          onChange={e => setUserApi(e.target.value)}
          placeholder="Digine o login de usuário!"
        />
        <input
          value={userApiPassword}
          onChange={e => setUserApiPassword(e.target.value)}
          placeholder="Digine a senha!"
        />
        <button type="submit">Login</button>
      </Form>
      <H1>
        {userLogin.map(digitado => (
          <h3>{digitado.login}</h3>
        ))}
      </H1>
    </>
  );
};

export default Dashboard;
