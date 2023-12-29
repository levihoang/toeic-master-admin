import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { BookIcon } from '../../assets/icons/BookIcon';
import { toast } from 'react-toastify';
import { ArticleCard } from '../../components/ArticleCard';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import CourseChapter from './CourseChapter';
import { Button } from '../../components/button/Button';
import Modal from '../../components/Modal';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../services/firestore.service';
import CourseService from '../../services/course.service';

enum Tab {
  COURSE,
  COURSE_CHAPTER
}

const OptionStyle = {
  form_group_plus: 'w-full',
  label_plus: 'font-semibold text-sm leading-5'
};

const tabActiveStyle =
  'border-r border-t-2 border-l border-t-009CFF bg-white border-solid border-CED4DA font-bold';

const CourseManagementAdd = () => {
  const _paramsURL = useParams();
  const [paramsURL, setParamsURL] = useState({ ..._paramsURL });
  const [confirmAddModal, setConfirmAddModal] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [confirmUpdateModal, setConfirmUpdateModal] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState<Tab>(Tab.COURSE);
  const [imageError, setImgError] = useState<any>();
  const [imageURL, setImageUrl] = useState<any>();
  const [currentFile, setCurrentFile] = useState<any>();

  const [crumbs] = useState([
    {
      name: 'Course Management',
      url: `/course`
    },
    {
      name: `${paramsURL.id ? 'Edit Course' : 'Create Course'}`,
      url: `${paramsURL.id ? `/course-edit/${paramsURL.id}` : '/course-add'}`
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

  const getDetailCourse = async (id: any) => {
    setLoading(true);
    const res = await CourseService.get_detail(id);
    if (res?.statusCode === 200) {
      setValue('name', res?.data?.name);
      setValue('description', res?.data?.description);
      setImageUrl(res?.data?.imgUrl);
    } else {
      toast.error('Get Detail Fail! Please try again.', {
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

  const submitHandler: SubmitHandler<any> = async value => {
    if (paramsURL.id) {
      let params = {
        ...value,
        id: paramsURL.id
      };
      setSubmitUpdate(true);

      try {
        if (currentFile) {
          const idImage = v4();
          const imageRef = ref(storage, `images/${idImage}`);
          const e = await uploadBytes(imageRef, currentFile.target.files[0]);
          const url = await getDownloadURL(e?.ref);

          if (!url) {
            toast.error('Image is required!' /* ... */);
            setSubmitAdd(false);
            return;
          }

          params = { ...params, imgUrl: url };
        } else {
          params = { ...params, imgUrl: imageURL };
        }
        const res = await CourseService.update_course(params);
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
      let params = {
        ...value
      };
      setSubmitAdd(true);
      try {
        if (currentFile) {
          const idImage = v4();
          const imageRef = ref(storage, `images/${idImage}`);
          const e = await uploadBytes(imageRef, currentFile.target.files[0]);
          const url = await getDownloadURL(e?.ref);

          if (!url) {
            toast.error('Image is required!' /* ... */);
            setSubmitAdd(false);
            return;
          }

          params = { ...params, imgUrl: url };
        }

        const res = await CourseService.create_course(params);
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
          navigate(`/course`);
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

  const handleInputChange = (e: any) => {
    // setUploadImageErrorMessage("");
    // setSizeImgErrorMgs("");
    setImgError('');
    setCurrentFile(e);

    const currentSize = Math.floor(e.target.files[0].size / 1024);
    const _checkSize = checkSize(currentSize);

    const img = new Image();
    img.src = window.URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      const _checkWidth = checkSizeImg(img.width, img.height);
      if (!_checkWidth || !_checkSize) {
      } else {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
      }
    };
  };

  const checkSizeImg = (wImg: number, hImg: number) => {
    if (wImg / hImg <= 7 / 4 && wImg / hImg >= 4 / 7) {
      return true;
    } else {
      setImgError('Kích thước không đúng tỉ lệ!');
      return false;
    }
  };

  const checkSize = (size: any) => {
    if (size > 2048) {
      setImgError('Dung lượng ảnh không hợp lệ!');
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (paramsURL.id) {
      getDetailCourse(paramsURL.id);
    }
  }, [paramsURL.id]);

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <TitlePage icon={() => <BookIcon />} name="Create Course" />
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
                <Link to={`/course/course-edit/${paramsURL.id}`}>
                  <div
                    className={`p-[10px] rounded-t-md cursor-pointer ${
                      tabActive === Tab.COURSE
                        ? tabActiveStyle
                        : 'border-b !text-[#75757E]'
                    }`}
                    onClick={() => {
                      setTabActive(Tab.COURSE);
                    }}
                  >
                    Course
                  </div>
                </Link>
                <Link to={`/course/course-chapter/${paramsURL.id}`}>
                  <div
                    className={`p-[10px] rounded-t-md cursor-pointer ${
                      tabActive === Tab.COURSE_CHAPTER
                        ? tabActiveStyle
                        : 'border-b !text-[#75757E]'
                    }`}
                    onClick={() => {
                      setTabActive(Tab.COURSE_CHAPTER);
                    }}
                  >
                    Course Chapter
                  </div>
                </Link>
              </div>
            )}
            {tabActive === Tab.COURSE ? (
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
                    <div className="flex justify-center ">
                      <div
                        className={`form-group my-2 ml-[5px] mr-[23px] w-1/2`}
                      >
                        <label
                          className={`${OptionStyle.label_plus}`}
                          htmlFor=""
                        >
                          Image
                        </label>
                        <div className="flex gap-5">
                          {(!imageURL || imageError) && (
                            <div className="flex gap-5">
                              <div className="relative w-[180px] h-[180px] flex items-center justify-center bg-[#e4f4ff] border-dash cursor-pointer">
                                <span className="text-[#0795fe] text-sm font-semibold line leading-6 cursor-pointer">
                                  Tải hình ảnh lên
                                </span>
                                <input
                                  type="file"
                                  className={`opacity-0 absolute top-0 left-0 z-50 w-[180px] h-[180px]`}
                                  onChange={handleInputChange}
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          )}
                          {imageURL && !imageError && (
                            <div className="flex gap-5">
                              <div className="relative w-[180px] h-[180px] flex items-center justify-center cursor-pointer overflow-hidden">
                                <img
                                  src={imageURL}
                                  alt=""
                                  className={`mt-2 mb-4 w-[180px] h-[180px]`}
                                  //   onError={() => setOnErrorImage(true)}
                                />
                                <input
                                  type="file"
                                  className={`opacity-0 absolute top-0 left-0 z-50 w-[180px] h-[180px]`}
                                  onChange={handleInputChange}
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          )}
                          <div>
                            <span className=" text-red-3b text-[20px] inline-block mr-1">
                              *
                            </span>
                            <span className="text-[20px] leading-[26px] font-bold">
                              Chú thích:{' '}
                            </span>
                            <div className=" text-sm leading-5 font-normal">
                              <span className="text-sm">{`Kích thước ảnh trong khoản 4:7 và 7:4`}</span>
                            </div>
                            <div className=" text-sm leading-5 font-normal">
                              <span className="text-sm">{`Dung lượng tối đa `}</span>
                              <span className="text-[#4293F6] font-bold text-sm">{`2MB.`}</span>
                            </div>
                            {imageError && (
                              <div className="text-redCustom-3b text-xs mt-3">
                                {imageError}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <CourseChapter />
            )}
          </ArticleCard>
          {tabActive === Tab.COURSE && (
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
            title={'Do you want to add this course?'}
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

export default CourseManagementAdd;
