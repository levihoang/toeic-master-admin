import { BLOG, HOST_URL } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_blog = (params?: any) => {
  return axiosInstance
    .get(HOST_URL + BLOG.GET_ALL, { params })
    .then(response => {
      return response.data;
    });
};

const create_blog = (params: any) => {
  return axiosInstance.post(HOST_URL + BLOG.CREATE, params).then(response => {
    return response.data;
  });
};

const update_blog = (params: any) => {
  return axiosInstance
    .put(HOST_URL + BLOG.UPDATE(params?.id), params)
    .then(response => {
      return response.data;
    });
};

const detail_blog = (id: any) => {
  return axiosInstance.get(HOST_URL + BLOG.DETAIL(id)).then(response => {
    return response.data;
  });
};

const BlogService = {
  get_blog,
  create_blog,
  update_blog,
  detail_blog
};

export default BlogService;
