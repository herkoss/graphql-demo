import { gql } from '@apollo/client';

export const CREATE_USER = gql(`
  mutation createUser($email: String!, $age: Int!) {
    createUser(email: $email, age: $age) {
      id
      email
      age
      isSubscribed
    }
  }
`);

export const UPDATE_USER = gql(`
  mutation updateUser($id: String!, $age: Int, $email: String, $isSubscribed: Boolean) {
    updateUser(id: $id, email: $email, age: $age, isSubscribed: $isSubscribed) {
      id
      email
      age
      isSubscribed
    }
  }
`);

export const DELETE_USER = gql(`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      email
      age
    }
  }
`);
