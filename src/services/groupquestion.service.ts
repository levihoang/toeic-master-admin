import { GROUP_QUESTION, HOST_URL } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_list = (params?: any) => {
  return axiosInstance
    .get(HOST_URL + GROUP_QUESTION.GET_ALL, { params })
    .then(response => {
      return response.data;
    });
};

const get_detail = (id: string) => {
  return axiosInstance
    .get(HOST_URL + GROUP_QUESTION.DETAIL(id))
    .then(response => {
      return response.data;
    });
};

const create = (params: any) => {
  return axiosInstance
    .post(HOST_URL + GROUP_QUESTION.CREATE, params)
    .then(response => {
      return response.data;
    });
};

const update = (id: string, params: any) => {
  return axiosInstance
    .put(HOST_URL + GROUP_QUESTION.UPDATE(id), params)
    .then(response => {
      return response.data;
    });
};

const GroupQuestionService = {
  get_list,
  get_detail,
  create,
  update
};

export default GroupQuestionService;
