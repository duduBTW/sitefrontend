import React from "react"
import {render, fireEvent, act } from "@testing-library/react"
import Form from "."

it("Renders", () => {
  const { queryByTestId } = render(<Form 
    buttons={() => <div></div>}
    onSubmit={() => {}}
    schema={[
    {
      content: [
        {
          lg: 12,
          name: "jwtusername",
          label: "Usuário",
          rules: { required: "Campo obrigatório" },
          inputPropsAdittional: {
            type: "email",
            autoFocus: true,
          },
        },
        {
          lg: 12,
          name: "jwtpassword",
          label: "Senha",
          rules: { required: "Campo obrigatório" },
          inputPropsAdittional: {
            type: "password",
          },
        },
      ],
    },
  ]} />)

  expect(queryByTestId("form")).toBeTruthy()
  expect(queryByTestId("input-jwtusername")).toBeTruthy()
  expect(queryByTestId("input-jwtpassword")).toBeTruthy()
})

it.only("Change field", () => {
  const { queryByTestId } = render(<Form 
    buttons={() => <div></div>}
    onSubmit={() => {}}
    schema={[
    {
      content: [
        {
          lg: 12,
          name: "jwtusername",
          label: "Usuário",
          rules: { required: "Campo obrigatório" },
          inputPropsAdittional: {
            type: "email",
            autoFocus: true,
          },
        },
        {
          lg: 12,
          name: "jwtpassword",
          label: "Senha",
          rules: { required: "Campo obrigatório" },
          inputPropsAdittional: {
            type: "password",
          },
        },
      ],
    },
  ]} />)

  expect(queryByTestId("input-jwtusername")).toBeTruthy()
  
  const userNameInput = queryByTestId("input-jwtusername").querySelector('input')
  fireEvent.change(userNameInput, {
    target: { value: "new content" }
  });

  expect(userNameInput.value).toBe('new content')
})

it("Submit field", () => {
  const requestSend = jest.fn()

  const { queryByTestId } = render(<Form 
    buttons={() => <button type="submit" data-testid="btn-submit">Enviar</button>}
    onSubmit={requestSend}
    schema={[
    {
      content: [
        {
          lg: 12,
          name: "jwtusername",
          label: "Usuário",
          inputPropsAdittional: {
            type: "email",
            autoFocus: true,
          },
        },
      ],
    },
  ]} />)

  // expect(queryByTestId("btn-submit")).toBeTruthy()
  const userNameInput = queryByTestId("input-jwtusername").querySelector('input')
  act(() => {
    fireEvent.change(userNameInput, {
      target: { value: "new content" }
    });
    fireEvent.click(queryByTestId("btn-submit"))
  });

  // act(() => requestSend)

  expect(requestSend).toHaveBeenCalled()
  // const button = queryByTestId("btn-submit")
})