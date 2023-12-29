import { COURSE, HOST_URL } from '../constant/api.contant';
import axiosInstance from './restful.service';

const get_list = (params: any) => {
  return axiosInstance
    .get(HOST_URL + COURSE.GET_ALL, { params })
    .then(response => {
      return response.data;
    });
};

const create_course = (params: any) => {
  return axiosInstance.post(HOST_URL + COURSE.CREATE, params).then(response => {
    return response.data;
  });
};

const get_detail = (id: string) => {
  return axiosInstance.get(HOST_URL + COURSE.DETAIL(id)).then(response => {
    return response.data;
  });
};

const update_course = (params: any) => {
  return axiosInstance
    .put(HOST_URL + COURSE.UPDATE(params?.id), params)
    .then(response => {
      return response.data;
    });
};

const get_all_course_chapter = (params: any) => {
  return axiosInstance
    .get(HOST_URL + COURSE.GET_ALL_COURSE_CHAPTER, { params })
    .then(response => {
      return response.data;
    });
};

const create_course_chapter = (params: any) => {
  return axiosInstance
    .post(HOST_URL + COURSE.CREATE_COURSE_CHAPTER, params)
    .then(response => {
      return response.data;
    });
};

const update_course_chapter = (id: any, params: any) => {
  return axiosInstance
    .put(HOST_URL + COURSE.UPDATE_COURSE_CHAPTER(id), params)
    .then(response => {
      return response.data;
    });
};

const get_detail_course_chapter = (id: string) => {
  return axiosInstance
    .get(HOST_URL + COURSE.GET_DETAIL_COURSE_CHAPTER(id))
    .then(response => {
      return response.data;
    });
};

const CourseService = {
  get_list,
  create_course,
  get_detail,
  update_course,
  get_all_course_chapter,
  create_course_chapter,
  update_course_chapter,
  get_detail_course_chapter
};

export default CourseService;
