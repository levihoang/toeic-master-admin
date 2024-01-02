import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { BookIcon } from '../../assets/icons/BookIcon';
import { toast } from 'react-toastify';
import { ArticleCard } from '../../components/ArticleCard';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import ExamGroupQuestion from './ExamGroupQuestion';
import { Button } from '../../components/button/Button';
import Modal from '../../components/Modal';
import Select from 'react-select';
import ExamService from '../../services/exam.service';

enum Tab {
  EXAM,
  EXAM_GROUP_QUESTION
}

const OptionStyle = {
  form_group_plus: 'w-full',
  label_plus: 'font-semibold text-sm leading-5'
};

const tabActiveStyle =
  'border-r border-t-2 border-l border-t-009CFF bg-white border-solid border-CED4DA font-bold';

const ExamManagementAdd = () => {
  const _paramsURL = useParams();
  const [paramsURL, setParamsURL] = useState({ ..._paramsURL });
  const [confirmAddModal, setConfirmAddModal] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [confirmUpdateModal, setConfirmUpdateModal] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState<Tab>(Tab.EXAM);
  const [statusExam, setStatusExam] = useState<any>({
    value: 'DISABLE',
    label: 'DISABLE'
  });

  const [crumbs] = useState([
    {
      name: 'Exam Management',
      url: `/exam`
    },
    {
      name: `${paramsURL.id ? 'Edit exam' : 'Create exam'}`,
      url: `${paramsURL.id ? `/exam-edit/${paramsURL.id}` : '/exam-add'}`
    }
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<any>({});

  const selected = (url: any) => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  const getDetail = async () => {
    setLoading(true);
    const res = await ExamService.detail(paramsURL.id as string);
    if (res.statusCode === 200) {
      const data = res.data[0];
      setValue('title', data.title);
      setValue('zOrder', data.zOrder);
      setStatusExam({
        value: data.status,
        label: data.status
      });
    }
    setLoading(false);
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
      setConfirmAddModal(false);
    }
  };

  const submitHandler: SubmitHandler<any> = async value => {
    if (paramsURL.id) {
      setSubmitUpdate(true);
      const params = {
        ...value,
        id: paramsURL.id,
        status: statusExam.value
      };
      const res = await ExamService.update(params);
      if (res?.statusCode === 200) {
        toast.success('Update exam success!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        });
        setSubmitUpdate(false);
        setConfirmUpdateModal(false);
        navigate(`/exam/exam-edit/${paramsURL.id}`);
      } else {
        toast.error('Update exam fail, please try again!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        });
        setSubmitUpdate(false);
        setConfirmUpdateModal(false);
      }
    }

    if (!paramsURL.id) {
      setSubmitAdd(true);
      const params = {
        ...value,
        status: statusExam.value
      };

      const res = await ExamService.create(params);
      if (res?.statusCode === 200) {
        toast.success('Add exam success!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        });
        setSubmitAdd(false);
        setConfirmAddModal(false);
        navigate('/exam');
      } else {
        toast.error('Add exam fail, please try again!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        });
        setSubmitAdd(false);
        setConfirmAddModal(false);
      }
    }
  };

  const handleStatusExamChange = (selectedOption: any) => {
    setStatusExam(selectedOption);
  };

  useEffect(() => {
    if (paramsURL.id) {
      getDetail();
    }
  }, [paramsURL.id]);

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <TitlePage icon={() => <BookIcon />} name={`${paramsURL.id ? 'Edit' : 'Create'} Exam`} />
      <div className={`${paramsURL?.id ? 'mt-[85px]' : 'mt-10'}`}>
        <form
          className="form"
          onSubmit={handleSubmit(submitHandler, onError)}
          noValidate
          autoComplete="off"
        >
          <ArticleCard className="mr-6 border-0 relative !rounded-none">
            {paramsURL.id && (
              <div className="flex absolute left-0 top-[-45px]">
                <Link to={`/exam/exam-edit/${paramsURL.id}`}>
                  <div
                    className={`p-[10px] rounded-t-md cursor-pointer ${
                      tabActive === Tab.EXAM
                        ? tabActiveStyle
                        : 'border-b !text-[#75757E]'
                    }`}
                    onClick={() => {
                      setTabActive(Tab.EXAM);
                    }}
                  >
                    Exam
                  </div>
                </Link>
                <Link to={`/exam/exam-group-question/${paramsURL.id}`}>
                  <div
                    className={`p-[10px] rounded-t-md cursor-pointer ${
                      tabActive === Tab.EXAM_GROUP_QUESTION
                        ? tabActiveStyle
                        : 'border-b !text-[#75757E]'
                    }`}
                    onClick={() => {
                      setTabActive(Tab.EXAM_GROUP_QUESTION);
                    }}
                  >
                    Exam Group Question
                  </div>
                </Link>
              </div>
            )}
            {tabActive === Tab.EXAM ? (
              <div>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <CircleSpin />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <div className="form-group my-2 w-1/2">
                        <label
                          htmlFor="title"
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
                          {...register('title', {
                            required: 'Title is required',
                            onChange: () => {
                              trigger('title');
                            }
                          })}
                        />
                        {errors?.title?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors?.title?.message as string}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center w-1/2 mx-auto gap-3">
                      <div
                        className={`form-group my-2 ${
                          paramsURL?.id ? 'w-1/2' : 'w-full'
                        }`}
                      >
                        <label
                          htmlFor="zOrder"
                          className={`${OptionStyle.label_plus}`}
                        >
                          Order
                        </label>
                        <input
                          id="zOrder"
                          type="number"
                          required
                          placeholder="Enter order"
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
                      {paramsURL.id && (
                        <div className={`form-group my-2 w-1/2`}>
                          <label
                            className={`${OptionStyle.label_plus}`}
                            htmlFor=""
                          >
                            Status
                          </label>
                          <Select
                            options={[
                              {
                                value: 'ENABLE',
                                label: 'ENABLE'
                              },
                              {
                                value: 'DISABLE',
                                label: 'DISABLE'
                              }
                            ]}
                            placeholder="Choose status"
                            value={statusExam}
                            onChange={handleStatusExamChange}
                            className=" mt-1"
                            classNamePrefix="select"
                          />
                          <span className="text-redCustom-3b text-xs">
                            {errors?.statusExam?.message as string}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <ExamGroupQuestion />
            )}
          </ArticleCard>
          {tabActive === Tab.EXAM && (
            <Button
              type="button"
              className="min-w-[140px]"
              onClick={() => {
                paramsURL.id
                  ? setConfirmUpdateModal(true)
                  : setConfirmAddModal(true);
              }}
            >
              {paramsURL.id ? 'Update' : 'Add'}
            </Button>
          )}

          <Modal
            show={confirmAddModal}
            title={'Do you want to add this exam?'}
            onClose={() => {
              setConfirmAddModal(false);
            }}
            className="max-w-[420px] font-Roboto text-center"
          >
            <div className="flex space-x-4">
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
                onClick={handleSubmit(submitHandler, onError)}
              >
                {submitAdd && <CircleSpin />}
                Confirm
              </button>
            </div>
          </Modal>
          <Modal
            show={confirmUpdateModal}
            title={'Confirm Update'}
            onClose={() => {
              setConfirmUpdateModal(false);
            }}
            className="max-w-[420px] font-Roboto text-center"
          >
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex justify-center w-full md:w-52 form-button-seconday"
                onClick={() => {
                  setConfirmUpdateModal(false);
                }}
              >
                Cancel
              </button>
              <button
                id="submitUpdate"
                type="submit"
                className="flex justify-center w-full md:w-52 form-button"
                disabled={submitUpdate}
                onClick={handleSubmit(submitHandler, onError)}
              >
                {submitUpdate && <CircleSpin />}
                Confirm
              </button>
            </div>
          </Modal>
        </form>
      </div>
    </>
  );
};

export default ExamManagementAdd;
