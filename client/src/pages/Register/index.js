import React, { Component } from "react";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";

import withFullScreenLayout from "./../../layouts/FullScreenLayout";
import RegisterView from "./RegisterView";

import { userMessages } from "./../../utils/validations/messages/userMessages";

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION(
    $email: String!
    $displayName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      email: $email
      displayName: $displayName
      password: $password
      confirmPassword: $confirmPassword
    ) {
      errors {
        path
        message
      }
      result
    }
  }
`;

class Register extends Component {
  onFinish = values => {
    const {
      data: {
        register: { errors }
      }
    } = values;

    const { history } = this.props;
    if (!errors)
      history.push("/t/confirm-email", {
        message: userMessages.confirmEmail
      });
  };
  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION}>
        {(register, { loading, error, data }) => {
          return (
            <RegisterView
              onFinish={this.onFinish}
              register={register}
              error={error}
              data={data}
              loading={loading}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withFullScreenLayout(withApollo(Register));
