import React, { useCallback, useRef } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Button as ButtonAnt } from 'antd';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

interface DashboardFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: DashboardFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          description: Yup.string().required('Description required'),
          category: Yup.string().required('Category required'),
          price: Yup.string().required('Price required'),
          stock: Yup.string().required('stock required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/products', data, {
          headers: {
            Authorization: localStorage.getItem('@HomeOffice:token'),
          },
        });
        history.push('/dashboard');
        addToast({
          type: 'success',
          title: 'Submit success!',
          description: 'Product successfully registered!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        console.log(err);
        addToast({
          type: 'error',
          title: 'Error in submit!',
          description: 'An error occurred while registering!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Create Product</h1>
          <Input name="name" icon={FiEdit2} placeholder="Name" />
          <Input name="description" icon={FiEdit2} placeholder="Description" />
          <Input name="category" icon={FiEdit2} placeholder="Category" />
          <Input
            type="number"
            name="price"
            icon={FiEdit2}
            placeholder="Price"
          />
          <Input
            type="number"
            name="stock"
            icon={FiEdit2}
            placeholder="Stock"
          />

          <Button type="submit">Create</Button>
        </Form>
        <Link to="/products">List Products</Link>
        <ButtonAnt type="primary" value="Logout" onClick={signOut}>
          <h5>Logout</h5>
        </ButtonAnt>
      </Content>
      <Background />
    </Container>
  );
};

export default Dashboard;
