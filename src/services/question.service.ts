import { HOST_URL, QUESTION } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_question = (params?: any) => {
  return axiosInstance
    .get(HOST_URL + QUESTION.GET_ALL, { params })
    .then(response => {
      return response.data;
    });
};

const get_type = () => {
  return axiosInstance
    .get(HOST_URL + QUESTION.GET_TYPE)
    .then(response => {
      return response.data;
    });
};

const QuestionService = {
  get_question,
  get_type
};

export default QuestionService;
