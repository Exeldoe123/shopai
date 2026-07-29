import api from './api';

interface Credentials {
  email: string;
  password: string;
  captchaId: string;
  captchaAnswer: string;
}

export const authService = {
  getCaptcha: async (): Promise<{ captchaId: string; question: string }> => {
    const { data } = await api.get('/auth/captcha');
    return data;
  },

  login: async (creds: Credentials) => {
    const { data } = await api.post('/auth/login', creds);
    // backend: { accessToken, refreshToken, user }
    localStorage.setItem('refreshToken', data.refreshToken);
    return { user: data.user, token: data.accessToken };
  },

  register: async (payload: { email: string; password: string; firstName: string; lastName: string }) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('refreshToken', data.refreshToken);
    return { user: data.user, token: data.accessToken };
  },

  logout: async () => {
    localStorage.removeItem('refreshToken');
    return Promise.resolve();
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data.user;
  },
};
