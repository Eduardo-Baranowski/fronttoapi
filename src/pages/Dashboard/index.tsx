import React, { useCallback, useRef } from 'react';
import { FiEdit2, FiPower } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
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
  user_id: string;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

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
          user_id: Yup.string().default(user.id),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/products', data);
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
        addToast({
          type: 'error',
          title: 'Error in submit!',
          description: 'An error occurred while registering!',
        });
      }
    },
    [addToast, history, user],
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
        <button type="button" value="Logout" onClick={signOut}>
          <h5>Logout</h5>
          <FiPower />
        </button>
      </Content>
      <Background />
    </Container>
  );
};

export default Dashboard;
