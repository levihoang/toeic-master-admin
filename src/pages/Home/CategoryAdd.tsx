import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BookIcon } from '../../assets/icons/BookIcon';
import { toast } from 'react-toastify';
import { ArticleCard } from '../../components/ArticleCard';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import Select from 'react-select';
import { Button } from '../../components/button/Button';
import Modal from '../../components/Modal';
import CategoryService from '../../services/category.service';
import GroupQuestion from './GroupQuestion';

enum Tab {
  CATEGORY,
  GROUP_QUESTION
}

const OptionStyle = {
  form_group_plus: 'w-full',
  label_plus: 'font-semibold text-sm leading-5'
};

const tabActiveStyle =
  'border-r border-t-2 border-l border-t-009CFF bg-white border-solid border-CED4DA font-bold';

const CategoryAdd = () => {
  const _paramsURL = useParams();
  const [paramsURL, setParamsURL] = useState({ ..._paramsURL });
  const [detailCategory, setDetailCategory] = useState<any>({});
  const [confirmAddModal, setConfirmAddModal] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [confirmUpdateModal, setConfirmUpdateModal] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parentCode, setParentCode] = useState({
    value: '',
    label: ''
  });
  const [tabActive, setTabActive] = useState<Tab>(Tab.CATEGORY);

  const navigate = useNavigate();
  const [crumbs] = useState([
    {
      name: 'Category Management',
      url: `/`
    },
    {
      name: `${paramsURL.id ? 'Edit Category' : 'Create Category'}`,
      url: `${
        paramsURL.id ? `/category-edit/${paramsURL.id}` : '/category-add'
      }`
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

  const getData = async (id: string) => {
    setLoading(true);
    const res = await CategoryService.detail_category(id);
    if (res?.statusCode === 200) {
      setDetailCategory(res?.data);
      setParentCode({
        value: res?.data?.parentCode,
        label: res?.data?.parentCode
      });
      setValue('code', res?.data?.code);
      setValue('description', res?.data?.description);
      setValue('name', res?.data?.name);
      setValue('parentCode', res?.data?.parentCode);
    } else {
      toast.error("Can't get detail category! Please try again.", {
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
    setLoading(false);
  };

  useEffect(() => {
    if (paramsURL.id) {
      getData(paramsURL.id);
    }
  }, [paramsURL.id]);

  const submitHandler: SubmitHandler<any> = async value => {
    if (paramsURL.id) {
      const params = {
        ...value,
        id: paramsURL.id,
        parentCode: parentCode?.value
      };
      setSubmitUpdate(true);
      try {
        const res = await CategoryService.update_category(params);
        if (res?.statusCode === 200) {
          setSubmitUpdate(false);
          setConfirmUpdateModal(false);
          toast.success('Update Success!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false
          });
        } else {
          toast.error('Update Fail! Please try again.', {
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
      } catch (error) {
        toast.error('Create Fail! Please try again.', {
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

    if (!paramsURL.id) {
      const params = {
        ...value,
        parentCode: parentCode?.value
      };

      setSubmitAdd(true);
      try {
        const res = await CategoryService.create_category(params);
        if (res?.statusCode === 200) {
          setSubmitAdd(false);
          setConfirmAddModal(false);
          toast.success('Create Success!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false
          });
          navigate(`/category`);
        } else {
          toast.error('Create Fail! Please try again.', {
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
      } catch (error) {
        toast.error('Create Fail! Please try again.', {
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

  const handleParentCodeChange = (code: any) => {
    setParentCode(code);
  };

  return (
    <div>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <TitlePage icon={() => <BookIcon />} name="Create Category" />
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
                <Link to={`/category-edit/${paramsURL.id}`}>
                  <div
                    className={`p-[10px] rounded-t-md cursor-pointer ${
                      tabActive === Tab.CATEGORY
                        ? tabActiveStyle
                        : 'border-b !text-[#75757E]'
                    }`}
                    onClick={() => {
                      setTabActive(Tab.CATEGORY);
                    }}
                  >
                    Category
                  </div>
                </Link>
                <Link to={`/group-question/${paramsURL.id}`}>
                  <div
                    className={`p-[10px] rounded-t-md cursor-pointer ${
                      tabActive === Tab.GROUP_QUESTION
                        ? tabActiveStyle
                        : 'border-b !text-[#75757E]'
                    }`}
                    onClick={() => {
                      setTabActive(Tab.GROUP_QUESTION);
                    }}
                  >
                    Group Question
                  </div>
                </Link>
              </div>
            )}
            {tabActive === Tab.CATEGORY ? (
              <div>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <CircleSpin />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor="code"
                          className={`${OptionStyle.label_plus}`}
                        >
                          Code
                        </label>
                        <input
                          id="code"
                          type="text"
                          required
                          placeholder="Enter Code"
                          className="form-control"
                          {...register('code', {
                            required: 'Code is required',
                            setValueAs: (value: string) => value?.trim(),
                            onChange: () => {
                              trigger('code');
                            }
                          })}
                        />
                        {errors?.code?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors?.code?.message as string}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor="name"
                          className={`${OptionStyle.label_plus}`}
                        >
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
                            setValueAs: (value: string) => value?.trim(),
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
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`form-group my-2 ml-[5px] mr-[23px] w-1/2`}
                      >
                        <label
                          className={`${OptionStyle.label_plus}`}
                          htmlFor=""
                        >
                          Parent Code
                        </label>
                        <Select
                          options={[
                            {
                              value: 'READING',
                              label: 'READING'
                            },
                            {
                              value: 'LISTENING',
                              label: 'LISTENING'
                            }
                          ]}
                          placeholder="Choose parent code"
                          value={parentCode}
                          onChange={handleParentCodeChange}
                          className=" mt-1"
                          classNamePrefix="select"
                        />
                        <span className="text-redCustom-3b text-xs">
                          {errors?.is_system_admin?.message as string}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor="description"
                          className={`${OptionStyle.label_plus}`}
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="form-area hidden-scrollbar"
                          {...register('description', {
                            required: 'Description is required',
                            setValueAs: (value: string) => value?.trim(),
                            onChange: () => {
                              trigger('description');
                            }
                          })}
                          rows={5}
                        />
                        {errors?.description?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors?.description?.message as string}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <GroupQuestion />
            )}
          </ArticleCard>
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
          <Modal
            show={confirmAddModal}
            title={'Do you want to add this category?'}
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
    </div>
  );
};

export default CategoryAdd;
