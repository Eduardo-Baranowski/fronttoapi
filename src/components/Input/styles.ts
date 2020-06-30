import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 2px solid;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  input {
    flex: 1;
    border: 0;
    background: transparent;
  }

  svg {
    margin-right: 16px;
  }
`;
