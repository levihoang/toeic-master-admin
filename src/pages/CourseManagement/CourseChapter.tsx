import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import moment from 'moment';
import { FORM_FORMAT } from '../../constant/form.const';
import { AiOutlineEdit } from 'react-icons/ai';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import CourseService from '../../services/course.service';
import Modal from '../../components/Modal';
import { ArticleCard } from '../../components/ArticleCard';
import { TrashIcon } from '../../assets/icons/TrashIcon';
import { toast } from 'react-toastify';
import Select from 'react-select';
import GroupQuestionService from '../../services/groupquestion.service';

const OptionStyle = {
  form_group_plus: 'w-full',
  label_plus: 'font-semibold text-sm leading-5'
};

const contents = {
  title: '',
  content: ''
};

const CourseChapter = () => {
  const _paramsURL = useParams();
  const [paramsURL, setParamsURL] = useState({ ..._paramsURL });
  const [loading, setLoading] = useState(false);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [confirmAddModal, setConfirmAddModal] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [courseChapter, setCourseChapter] = useState<any>();
  const [courseChapterId, setCourseChapterId] = useState<any>();
  const [courseChapterDetail, setCourseChapterDetail] = useState<any>();
  const [content, setContent] = useState<any>([contents]);
  const [groupQuestionOptions, setGroupQuestionOptions] = useState<any>([]);
  const [groupQuestion, setGroupQuestion] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<any>({});

  const getCoursesChapter = async (params?: any) => {
    const res = await CourseService.get_all_course_chapter(params);
    if (res.statusCode === 200) {
      setCourseChapter(res?.data);
    }
  };

  const getDetailCourseChapter = async (id?: any) => {
    const res = await CourseService.get_detail_course_chapter(id);
    if (res.statusCode === 200) {
      setCourseChapterDetail(res?.data);
      setValue('name', res?.data?.name);
      setValue('zOrder', res?.data?.zOrder);
      setContent(res?.data?.contents);
      const newGroupQuestion = res?.data?.groupQuestions?.map((item: any) => {
        return {
          value: item?._id,
          label: item?.title
        };
      });
      setGroupQuestionOptions(newGroupQuestion);
      res.data?.contents?.map((item: any, index: number) => {
        setValue(`title_${index}`, item?.title);
        setValue(`content_question_${index}`, item?.content);
      });
    } else {
      toast.error('Get Detail Course Chapter Error!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false
      });
      setConfirmAddModal(false);
    }
  };

  const getGroupQuestion = async (params?: any) => {
    const res = await GroupQuestionService.get_list(params);
    if (res.statusCode === 200) {
      setGroupQuestion(
        res?.data?.contents?.map((item: any) => {
          return {
            value: item?._id,
            label: item?.title
          };
        })
      );
    }
  };

  useEffect(() => {
    let params = {
      pageNumber: 1,
      itemPerPage: itemPerPage,
      keyword: ''
    };
    if (keyword) {
      params = {
        ...params,
        keyword: keyword
      };
    }

    getGroupQuestion(params);
  }, [itemPerPage, keyword]);

  useEffect(() => {
    const params = {
      courseId: paramsURL?.id
    };
    getCoursesChapter(params);
  }, [paramsURL?.id, reload]);

  useEffect(() => {
    if (courseChapterId) {
      getDetailCourseChapter(courseChapterId);
    }
  }, [courseChapterId]);

  const submitHandler: SubmitHandler<any> = async value => {
    setSubmitAdd(true);
    const params = {
      courseId: paramsURL?.id,
      name: value?.name,
      zOrder: value?.zOrder,
      groupQuestionIds: groupQuestionOptions?.map((item: any) => item?.value),
      contents: content?.map((item: any, index: any) => {
        return {
          title: value[`title_${index}`],
          content: value[`content_question_${index}`]
        };
      })
    };

    try {
      if (courseChapterId) {
        const res = await CourseService.update_course_chapter(
          courseChapterId,
          params
        );
        if (res.statusCode === 200) {
          toast.success('Update Course Chapter Success!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false
          });
          setConfirmAddModal(false);
          setSubmitAdd(false);
          setReload(!reload);
        }
      } else {
        const res = await CourseService.create_course_chapter(params);
        if (res.statusCode === 200) {
          toast.success('Create Course Chapter Success!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false
          });
          setConfirmAddModal(false);
          setSubmitAdd(false);
          setReload(!reload);
        }
      }
    } catch (error) {
      setSubmitAdd(false);
      toast.error('Create Course Chapter Error!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false
      });
    }
  };

  const onError = (errors: any, e: any) => {
    if (errors) {
      for (const key in errors) {
        const messageError = `${errors[key].message}`;
        toast.error(messageError || 'Error, Please try again!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        });
      }
      setConfirmAddModal(true);
    }
  };

  const handleChangeGroupQuestion = (selectedOption: any) => {
    setGroupQuestionOptions(selectedOption);
  };

  const clearModal = () => {
    setCourseChapterId(null);
    setCourseChapterDetail(null);
    setContent([contents]);
    setGroupQuestionOptions([]);
    setValue('name', '');
    setValue('zOrder', '');
    content?.map((item: any, index: number) => {
      setValue(`title_${index}`, '');
      setValue(`content_question_${index}`, '');
    });
  };

  //clear all field when close modal
  useEffect(() => {
    if (!confirmAddModal) {
      clearModal();
    }
  }, [confirmAddModal]);

  return (
    <>
      <div className="pr-6">
        <div className="flex justify-between">
          <Button
            className="border border-solid border-gray-200"
            onClick={() => {
              setConfirmAddModal(true);
            }}
          >
            Create Course Chapter
          </Button>
        </div>
        <div className="w-full h-auto relative mt-2 overflow-auto rounded shadow">
          <table className="table w-full rounded-lg">
            <thead className="bg-gray-f2 border-b-2 border-gray-200">
              <tr>
                <th>STT</th>
                <th scope="col">
                  <span>Name</span>
                </th>
                <th scope="col">
                  <span>Order</span>
                </th>
                <th>
                  <span>Date Create</span>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {courseChapter?.map((item: any, index: number) => {
                  return (
                    <tr key={item?._id}>
                      <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                      <td className="order">{item?.name || '-'}</td>
                      <td className="order">{item?.zOrder || '-'}</td>
                      <td className="order">
                        {moment(new Date(item.createdAt)).format(
                          FORM_FORMAT.TABLE_DATE
                        ) || '-'}
                      </td>
                      <td>
                        <div
                          className="table-action-btn table-action-edit w-fit"
                          onClick={() => {
                            setCourseChapterId(item?._id);
                            setConfirmAddModal(true);
                          }}
                        >
                          <AiOutlineEdit />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        {courseChapter?.length === 0 && !loading && (
          <p className="text-center text-sm mt-3">No course chapter found</p>
        )}
        {loading && (
          <>
            <div className="flex justify-center mt-4 items-center tex-sm">
              <CircleSpin color="text-primary-e2" /> Loading...
            </div>
          </>
        )}
      </div>
      <Modal
        show={confirmAddModal}
        title={`${courseChapterDetail ? 'Edit' : 'Create'} Course Chapter`}
        onClose={() => {
          setConfirmAddModal(false);
        }}
        className="max-w-[70%] font-Roboto"
      >
        <form
          className="form"
          onSubmit={handleSubmit(submitHandler, onError)}
          noValidate
          autoComplete="off"
        >
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-scroll hidden-scrollbar">
            <div className="flex justify-between">
              <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                <label htmlFor="name" className={`${OptionStyle.label_plus}`}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter name"
                  className="form-control"
                  {...register('name', {
                    required: 'Name is required',

                    onChange: () => {
                      trigger('name');
                    }
                  })}
                />
                {errors?.name?.message && (
                  <span className="text-redCustom-3b text-xs">
                    {errors?.name?.message as string}
                  </span>
                )}
              </div>
              <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                <label htmlFor="zOrder" className={`${OptionStyle.label_plus}`}>
                  Order
                </label>
                <input
                  id="zOrder"
                  type="number"
                  required
                  placeholder="Enter Order"
                  className="form-control"
                  {...register('zOrder', {
                    required: 'Order is required',

                    onChange: () => {
                      trigger('zOrder');
                    }
                  })}
                />
                {errors?.zOrder?.message && (
                  <span className="text-redCustom-3b text-xs">
                    {errors?.zOrder?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <div className={`form-group my-2 ml-[5px] mr-[23px] w-full`}>
                <label className={`${OptionStyle.label_plus}`} htmlFor="">
                  Group Question
                </label>
                <Select
                  isMulti
                  options={groupQuestion}
                  placeholder="Choose parent code"
                  value={groupQuestionOptions}
                  onChange={handleChangeGroupQuestion}
                  className=" mt-1"
                  classNamePrefix="select"
                />
                <span className="text-redCustom-3b text-xs">
                  {errors?.is_system_admin?.message as string}
                </span>
              </div>
            </div>
            <div>
              {content.map((item: any, index: number) => {
                return (
                  <ArticleCard key={index} className="relative">
                    {content.length > 1 && (
                      <div
                        className="absolute right-2 top-2"
                        onClick={() => {
                          const newContents = [...content];
                          newContents.splice(index, 1);
                          setContent(newContents);
                        }}
                      >
                        <TrashIcon />
                      </div>
                    )}
                    <div className="text-center">
                      <h5>Content {index + 1}</h5>
                    </div>
                    <div className="form-group my-2 ml-[5px] mr-[23px]">
                      <label
                        htmlFor={`title_${index}`}
                        className={`${OptionStyle.label_plus}`}
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        required
                        placeholder="Enter title"
                        className="form-control"
                        {...register(`title_${index}`, {
                          required: 'Title is required',

                          onChange: () => {
                            trigger(`title_${index}`);
                          }
                        })}
                      />
                      {errors[`title_${index}`]?.message && (
                        <span className="text-redCustom-3b text-xs">
                          {String(errors[`title_${index}`]?.message)}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <div className="form-group my-2 ml-[5px] mr-[23px]">
                        <label
                          htmlFor={`content_question_${index}`}
                          className={`${OptionStyle.label_plus}`}
                        >
                          Content
                        </label>
                        <textarea
                          id="content_question"
                          className="form-area hidden-scrollbar"
                          {...register(`content_question_${index}`, {
                            required: 'Content is required',

                            onChange: () => {
                              trigger(`content_question_${index}`);
                            }
                          })}
                          rows={3}
                          cols={200}
                          placeholder="Enter Content"
                        />
                        {errors[`content_question_${index}`]?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {String(
                              errors[`content_question_${index}`]?.message
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </ArticleCard>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-4 mt-5">
            <button
              type="button"
              className="flex justify-center w-full md:w-52 form-button-seconday"
              onClick={() => {
                setConfirmAddModal(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center w-full md:w-52 form-button"
              disabled={submitAdd}
              onClick={() => {
                handleSubmit(submitHandler, onError);
              }}
            >
              {submitAdd && <CircleSpin />}
              {courseChapterId ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              className="flex justify-center w-full md:w-52 form-button"
              onClick={() => {
                setContent([...content, contents]);
              }}
            >
              Add Content
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CourseChapter;
