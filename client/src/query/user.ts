import { gql } from '@apollo/client';

export const GET_ONE_USER = gql(`
  query getOneUser($id: String!) {
    getOneUser(id: $id) {
      id
      email
      age
    }
  }
`);

export const GET_ALL_USERS = gql(`
  query {
    getAllUsers {
      id
      email
      age
    }
  }
`);
