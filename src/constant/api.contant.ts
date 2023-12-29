export const HOST_URL = process.env.REACT_APP_API_ENDPOINT;

export const AUTH = {
  LOGIN: '/admin/sign-in'
};

export const USER = {
  GET_ALL: '/admin/users/get',
  UPDATE: `/admin/users/update-status`
};

export const QUESTION = {
  GET_ALL: '/question',
  GET_TYPE: '/question-type'
};

export const GROUP_QUESTION = {
  GET_ALL: '/group-question',
  DETAIL: (id: string) => `/group-question/${id}`,
  CREATE: '/group-question/create',
  UPDATE: (id: string) => `/group-question/${id}`
};

export const CATEGORY = {
  GET_ALL: '/category',
  CREATE: '/category/create',
  DETAIL: (id: string) => `/category/${id}`,
  UPDATE: (id: string) => `/category/${id}`
};

export const BLOG = {
  GET_ALL: '/admin/blog',
  CREATE: '/admin/blog/create',
  DETAIL: (id: string) => `/admin/blog/${id}`,
  UPDATE: (id: string) => `/admin/blog/${id}`
};

export const COURSE = {
  GET_ALL: '/course',
  CREATE: '/course',
  DETAIL: (id: string) => `/course/${id}`,
  UPDATE: (id: string) => `/course/${id}`,
  GET_ALL_COURSE_CHAPTER: '/course-chapter',
  CREATE_COURSE_CHAPTER: '/course-chapter',
  UPDATE_COURSE_CHAPTER: (id: string) => `/course-chapter/${id}`,
  GET_DETAIL_COURSE_CHAPTER: (id: string) => `/course-chapter/${id}`
};

export const EXAM = {
  GET_ALL: '/exam',
  DETAIL: (id: string) => `/exam/${id}`,
  CREATE: '/exam/create'
};
