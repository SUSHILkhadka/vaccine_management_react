import { editUser, login, logout } from '../../axios/backendUser';
import { getRefreshToken } from '../../cookies/cookie';
jest.mock('../../axios/api');

describe('for user', () => {
  const body = {
    email: 'a@gmail.com',
    password: 'a@gmail.com',
  };
  it('should get response when login is called with body', async () => {
    const input = body;
    const output = await login(body);
    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });
  it('should get response when editUser is called with body', async () => {
    const input = body;
    const output = await editUser(body);
    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });
  it('should get response when logout is called without any body', async () => {
    const output = await logout();
    const expectedOutput = { refreshToken: getRefreshToken() };
    expect(output.data).toEqual(expectedOutput);
  });
});
