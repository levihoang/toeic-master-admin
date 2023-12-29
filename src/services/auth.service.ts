import { AUTH, HOST_URL } from '../constant/api.contant';
import { AuthLoginType } from '../types/Auth.type';
import axiosInstance from './restful.service';

const login = (user: AuthLoginType) => {
  return axiosInstance.post(HOST_URL + AUTH.LOGIN, user).then(response => {
    return response.data;
  });
};

const AuthService = {
  login
};

export default AuthService;
