import React from 'react';
import {} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import { Container, Content, Background } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProductsFormData {
  name: string;
  category: string;
}

const Products: React.FC = () => {
  const { signOut } = useAuth();
  const dataSource = [
    {
      key: '1',
      name: 'Wood',
      description: 'Natural procduct',
      category: 'Natural',
      price: 100,
      stock: 10000,
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];
  return (
    <Container>
      <Content>
        <h1>List Products</h1>
        <Table dataSource={dataSource} columns={columns} />

        <Link to="/dashboard">Create Products</Link>
        <Button type="primary" value="Logout" onClick={signOut}>
          <h5>Logout</h5>
        </Button>
      </Content>
      <Background />
    </Container>
  );
};

export default Products;
