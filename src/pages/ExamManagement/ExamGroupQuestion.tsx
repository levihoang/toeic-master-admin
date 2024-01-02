import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import ExamService from '../../services/exam.service';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FORM_FORMAT } from '../../constant/form.const';
import { AiOutlineEdit } from 'react-icons/ai';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import Modal from '../../components/Modal';
import GroupQuestionService from '../../services/groupquestion.service';
import Select from 'react-select';

const OptionStyle = {
  form_group_plus: 'w-full',
  label_plus: 'font-semibold text-sm leading-5'
};

const ExamGroupQuestion = () => {
  const _paramsURL = useParams();
  const [paramsURL, setParamsURL] = useState({ ..._paramsURL });
  const [loading, setLoading] = useState(false);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [confirmAddModal, setConfirmAddModal] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);
  const [listExamGroupQuestion, setListExamGroupQuestion] = useState<any>([]);
  const [examGroupQuestionId, setExamGroupQuestionId] = useState<string>('');
  const [groupQuestion, setGroupQuestion] = useState<any>([]);
  const [groupQuestionOptions, setGroupQuestionOptions] = useState<any>([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<any>({});

  const getList = async () => {
    setLoading(true);
    const params = {
      examId: paramsURL?.id
    };
    const res = await ExamService.get_list_group_question(params);
    if (res?.statusCode === 200) {
      setListExamGroupQuestion(res.data);
    }
    setLoading(false);
  };

  const getListGroupQuestion = async () => {
    const params = {
      keyword: '',
      pageNumber: 1,
      limit: 1000
    };
    const res = await GroupQuestionService.get_list(params);
    if (res?.statusCode === 200) {
      setGroupQuestion(
        res?.data?.contents?.map((item: any) => {
          return {
            value: item._id,
            label: item.title
          };
        })
      );
    }
  };

  const handleChangeGroupQuestion = (selectedOption: any) => {
    setGroupQuestionOptions(selectedOption);
  };

  useEffect(() => {
    getList();
    getListGroupQuestion();
  }, [reload]);

  const submitExamGroupQuestionHandler: SubmitHandler<any> = async value => {
    if (!examGroupQuestionId) {
      setSubmitAdd(true);
      const params = {
        groupQuestionId: groupQuestionOptions?.value,
        examId: paramsURL?.id,
        groupQuestionZOrder: value?.zOrder
      };

      const res = await ExamService.create_group_question(params);
      if (res?.statusCode === 200) {
        toast.success('Create Exam Group Question Success!', {
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
      } else {
        toast.error('Create Exam Group Question Fail!', {
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
            Create Exam Group Question
          </Button>
        </div>
        <div className="w-full h-auto relative mt-2 overflow-auto rounded shadow">
          <table className="table w-full rounded-lg">
            <thead className="bg-gray-f2 border-b-2 border-gray-200">
              <tr>
                <th>STT</th>
                <th scope="col">
                  <span>Group Question ID</span>
                </th>
                <th scope="col">
                  <span>Exam ID</span>
                </th>
                <th scope="col">
                  <span>Group Question Order</span>
                </th>
                <th>
                  <span>Date Create</span>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {listExamGroupQuestion?.map((item: any, index: number) => {
                  return (
                    <tr key={item?._id}>
                      <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                      <td className="order">{item?.groupQuestionId || '-'}</td>
                      <td className="order">{item?.examId || '-'}</td>
                      <td className="order">
                        {item?.groupQuestionZOrder || '-'}
                      </td>
                      <td className="order">
                        {moment(new Date(item.createdAt)).format(
                          FORM_FORMAT.TABLE_DATE
                        ) || '-'}
                      </td>
                      <td>
                        <div
                          className="table-action-btn table-action-edit w-fit"
                          onClick={() => {
                            setExamGroupQuestionId(item?._id);
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
        {listExamGroupQuestion?.length === 0 && !loading && (
          <p className="text-center text-sm mt-3">
            No exam group question found
          </p>
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
        title={`${
          examGroupQuestionId ? 'Edit' : 'Create'
        } Exam Group Question Chapter`}
        onClose={() => {
          setConfirmAddModal(false);
        }}
        className="max-w-[70%] font-Roboto h-[500px]"
      >
        <form
          className="form"
          onSubmit={handleSubmit(submitExamGroupQuestionHandler, onError)}
          noValidate
          autoComplete="off"
        >
          <div className="flex flex-col gap-2">
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
          </div>

          <div className="flex space-x-4 mt-[130px]">
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
                handleSubmit(submitExamGroupQuestionHandler, onError);
              }}
            >
              {submitAdd && <CircleSpin />}
              {examGroupQuestionId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ExamGroupQuestion;
