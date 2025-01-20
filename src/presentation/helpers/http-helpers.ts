/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from "../protocols/http";

export const successRequest = (dataParam?: any): HttpResponse => {
  const data = dataParam ? dataParam : null;

  return {
    statusCode: 200,
    body: {
      message: "Requisição bem-sucedida!",
      data,
    },
  };
};

export const statusUpdated = (): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      message: "Status atualizado com sucesso!",
    },
  };
};
export const loginSuccessful = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      message: "Login realizado com sucesso!",
      data,
    },
  };
};

export const invalidUser = (): HttpResponse => {
  return {
    statusCode: 401,
    body: {
      message: "Usuário inválido!",
    },
  };
};

export const invalidLogin = (): HttpResponse => {
  return {
    statusCode: 401,
    body: {
      message: "Senha inválida!",
    },
  };
};

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: {
      message: "Item criado com sucesso!",
      data,
    },
  };
};

export const updated = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      message: "Item atualizado com sucesso!",
      data,
    },
  };
};

export const deleted = (): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      message: "Item deletado com sucesso!",
    },
  };
};

export const errorBadRequest = (error?: any): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      message: "Todas as informações devem ser preenchidas corretamente.",
      error,
    },
  };
};

export const errorNotFound = (message?: string): HttpResponse => {
  return {
    statusCode: 404,
    body: {
      message: message || "Nenhum item encontrado.",
    },
  };
};

export const invalidAccess = (entity: string): HttpResponse => {
  return {
    statusCode: 403,
    body: {
      message: `Acesso negado! ${entity} desativado. Entre em contato com o administrador.`,
    },
  };
};

export const handleDatabaseError = (error: any): HttpResponse => {
  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyPattern)[0];
    const duplicatedValue = error.keyValue[duplicatedField];

    const errorMessage = `O valor '${duplicatedValue}' já está em uso para o campo '${duplicatedField}'. Por favor, utilize outro.`;

    return {
      statusCode: 400,
      body: {
        message: errorMessage,
        field: duplicatedField,
        value: duplicatedValue,
      },
    };
  }

  return {
    statusCode: 500,
    body: {
      message:
        "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
    },
  };
};
