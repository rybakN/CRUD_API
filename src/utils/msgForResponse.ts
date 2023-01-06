export const invalidBody = (code: number) => {
  return JSON.stringify({
    code: code,
    msg: 'Invalid BODY',
  });
};

export const createUser = (code: number) => {
  return JSON.stringify({
    code: code,
    msg: 'Invalid BODY',
  });
};

export const internalServer = (code: number) => {
  return JSON.stringify({
    code: code,
    msg: 'INTERNAL_SERVER',
  });
};

export const invalidId = (code: number) => {
  return JSON.stringify({
    code: code,
    msg: 'Invalid ID',
  });
};

export const userExist = (code: number, userId: string) => {
  return JSON.stringify({
    code: code,
    msg: `User with id: ${userId} doesn't exist`,
  });
};

export const deleteUser = (code: number, userId: string) => {
  return JSON.stringify({
    code: code,
    msg: `<h1>User with ID: ${userId} deleted</h1>`,
  });
};

export const methodNotProcessed = (code: number, method: string) => {
  return JSON.stringify({
    code: code,
    msg: `${method} method is not processed`,
  });
};
