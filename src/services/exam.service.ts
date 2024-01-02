import { EXAM, EXAM_GROUP_QUESTION, HOST_URL } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_list = () => {
  return axiosInstance.get(HOST_URL + EXAM.GET_ALL).then(response => {
    return response.data;
  });
};

const create = (params: any) => {
  return axiosInstance.post(HOST_URL + EXAM.CREATE, params).then(response => {
    return response.data;
  });
};

const detail = (id: string) => {
  return axiosInstance.get(HOST_URL + EXAM.DETAIL(id)).then(response => {
    return response.data;
  });
};

const update = (params: any) => {
  return axiosInstance
    .put(HOST_URL + EXAM.UPDATE(params?.id), params)
    .then(response => {
      return response.data;
    });
};

const get_list_group_question = (params: any) => {
  return axiosInstance
    .get(HOST_URL + EXAM_GROUP_QUESTION.GET_ALL, { params })
    .then(response => {
      return response.data;
    });
};

const get_detail_group_question = (id: string) => {
  return axiosInstance
    .get(HOST_URL + EXAM_GROUP_QUESTION.DETAIL(id))
    .then(response => {
      return response.data;
    });
};

const create_group_question = (params: any) => {
  return axiosInstance
    .post(HOST_URL + EXAM_GROUP_QUESTION.CREATE, params)
    .then(response => {
      return response.data;
    });
};

const update_group_question = (params: any) => {
  return axiosInstance
    .put(HOST_URL + EXAM_GROUP_QUESTION.UPDATE(params?.id), params)
    .then(response => {
      return response.data;
    });
};

const ExamService = {
  get_list,
  create,
  detail,
  update,
  get_list_group_question,
  get_detail_group_question,
  create_group_question,
  update_group_question
};

export default ExamService;
