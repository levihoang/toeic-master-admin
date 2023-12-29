import { EXAM, HOST_URL } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_list = () => {
  return axiosInstance
    .get(HOST_URL + EXAM.GET_ALL)
    .then(response => {
      return response.data;
    });
};

const ExamService = {
  get_list,
};

export default ExamService;
