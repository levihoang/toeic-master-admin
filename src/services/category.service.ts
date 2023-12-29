import { CATEGORY, HOST_URL } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_category = (params?: any) => {
  return axiosInstance
    .get(HOST_URL + CATEGORY.GET_ALL, { params })
    .then(response => {
      return response.data;
    });
};

const create_category = (params: any) => {
  return axiosInstance
    .post(HOST_URL + CATEGORY.CREATE, params)
    .then(response => {
      return response.data;
    });
};

const update_category = (params: any) => {
  return axiosInstance
    .put(HOST_URL + CATEGORY.UPDATE(params?.id), params)
    .then(response => {
      return response.data;
    });
};

const detail_category = (id: any) => {
  return axiosInstance.get(HOST_URL + CATEGORY.DETAIL(id)).then(response => {
    return response.data;
  });
};

const CategoryService = {
  get_category,
  create_category,
  update_category,
  detail_category
};

export default CategoryService;
