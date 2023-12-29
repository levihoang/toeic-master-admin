import { HOST_URL, USER } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_list = (params: any) => {
  return axiosInstance
    .get(HOST_URL + USER.GET_ALL, { params })
    .then(response => {
      return response.data;
    });
};

const update_status = (params: any) => {
  return axiosInstance.put(HOST_URL + USER.UPDATE, params).then(response => {
    return response.data;
  });
};

const AccountService = {
  get_list,
  update_status
};

export default AccountService;
