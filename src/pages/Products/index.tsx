import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Content, Background } from './styles';

import { useAuth } from '../../hooks/auth';

interface ProductsFormData {
  name: string;
  email: string;
  password: string;
}

const Products: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <h1>List Products</h1>
        <Link to="/dashboard">Create Products</Link>
        <button type="button" value="Logout" onClick={signOut}>
          <h5>Logout</h5>
          <FiPower />
        </button>
      </Content>
      <Background />
    </Container>
  );
};

export default Products;
