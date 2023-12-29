import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { BookIcon } from '../../assets/icons/BookIcon';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import { Button } from '../../components/button/Button';
import { ArticleCard } from '../../components/ArticleCard';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firestore.service';
import { v4 } from 'uuid';
import { Editor } from '@tinymce/tinymce-react';
import BlogService from '../../services/blog.service';

const OptionStyle = {
  form_group_plus: 'w-full',
  label_plus: 'font-semibold text-sm leading-5'
};

const BlogManagementAdd = () => {
  const _paramsURL = useParams();
  const [paramsURL, setParamsURL] = useState({ ..._paramsURL });
  const [confirmAddModal, setConfirmAddModal] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [confirmUpdateModal, setConfirmUpdateModal] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<any>();
  const [imageURL, setImageUrl] = useState<any>();
  const [imageError, setImgError] = useState<any>();
  const [content, setContent] = useState<any>();

  const navigate = useNavigate();
  const [crumbs] = useState([
    {
      name: 'Blog Management',
      url: `/blog`
    },
    {
      name: `${paramsURL.id ? 'Edit Blog' : 'Create Blog'}`,
      url: `${paramsURL.id ? `/blog/${paramsURL?.id}` : '/blog'}`
    }
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    setError,
    formState: { errors }
  } = useForm<any>({});

  const selected = (url: any) => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  const getDetailBlog = async (id: string) => {
    setLoading(true);
    try {
      const res = await BlogService.detail_blog(id);
      if (res.statusCode === 200) {
        setValue('title', res.data.title);
        setValue('description', res.data.description);
        setValue('content', res.data.content);
        setContent(res.data.content);
        setImageUrl(res.data.imgUrl);
      } else {
        toast.error('Get detail fail! Please try again.', {
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
    } catch (error: any) {
      toast.error('Get detail fail! Please try again.', {
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
      getDetailBlog(paramsURL.id);
    }
  }, []);

  const submitHandler: SubmitHandler<any> = async value => {
    if (paramsURL.id) {
      setConfirmUpdateModal(true);
      setSubmitUpdate(true);
      if (currentFile) {
        const idImage = v4();
        const imageRef = ref(storage, `images/${idImage}`);
        uploadBytes(imageRef, currentFile.target.files[0]).then(e => {
          getDownloadURL(e?.ref).then(
            async url => {
              if (!url) {
                toast.error('Image is required!', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  pauseOnFocusLoss: false
                });
                setConfirmUpdateModal(false);
                return;
              } else {
                const params = {
                  ...value,
                  id: paramsURL.id,
                  imgUrl: url
                };
                try {
                  const res = await BlogService.update_blog(params);
                  if (res?.statusCode === 200) {
                    setConfirmUpdateModal(false);
                    setSubmitUpdate(false);
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
                    navigate(`/blog/blog-edit/${paramsURL.id}`);
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
              }
            },
            err => {
              console.log(err);
            }
          );
        });
      } else {
        const params = {
          ...value,
          id: paramsURL.id,
          imgUrl: imageURL
        };
        setConfirmUpdateModal(true);
        setSubmitUpdate(true);
        try {
          const res = await BlogService.update_blog(params);
          if (res?.statusCode === 200) {
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
            setConfirmUpdateModal(false);
            setSubmitUpdate(false);
            navigate(`/blog/blog-edit/${paramsURL.id}`);
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
      }
    }

    if (!paramsURL.id) {
      setConfirmAddModal(true);
      setSubmitAdd(true); 
      if (currentFile?.target?.files[0]) {
        const idImage = v4();
        const imageRef = ref(storage, `images/${idImage}`);
        uploadBytes(imageRef, currentFile.target.files[0]).then(e => {
          getDownloadURL(e?.ref).then(
            async url => {
              if (!url) {
                toast.error('Image is required!', {
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
                return;
              } else {
                const params = {
                  ...value,
                  imgUrl: url
                };

                try {
                  const res = await BlogService.create_blog(params);
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
                    navigate(`/blog`);
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
            },
            err => {
              console.log(err);
            }
          );
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

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <TitlePage icon={() => <BookIcon />} name="Create Category" />
      <div className="mt-10">
        <form
          className="form"
          onSubmit={handleSubmit(submitHandler, onError)}
          noValidate
          autoComplete="off"
        >
          <ArticleCard className="mr-6">
            {loading ? (
              <div className="flex justify-center items-center">
                <CircleSpin />
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="form-group my-2 ml-[5px] mr-[23px] w-full">
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
                        setValueAs: (value: string) => value?.trim(),
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
                <div className="flex justify-center">
                  <div className="form-group my-2 ml-[5px] mr-[23px] w-full">
                    <label
                      htmlFor="description"
                      className={`${OptionStyle.label_plus}`}
                    >
                      Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      required
                      placeholder="Enter description"
                      className="form-control"
                      {...register('description', {
                        required: 'Description is required',
                        setValueAs: (value: string) => value?.trim(),
                        onChange: () => {
                          trigger('description');
                        }
                      })}
                    />
                    {errors?.description?.message && (
                      <span className="text-redCustom-3b text-xs">
                        {errors?.description?.message as string}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="form-group w-full">
                    <label
                      htmlFor=""
                      className={`form-label ${OptionStyle.label_plus}`}
                    >
                      Content
                    </label>
                    <div className="w-full min-h-[300px]">
                      <Editor
                        initialValue={content}
                        init={{
                          plugins: 'link image code',
                          toolbar:
                            'undo redo | bold italic | alignleft aligncenter alignright | code'
                        }}
                        onChange={(e: any) => {
                          setValue('content', e.target.getContent());
                          setContent(e.target.getContent());
                        }}
                        apiKey="hzk805qt1mwjhsw818nrhrvrojsmz5ru719ytsavlh5j0i3w"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center ">
                  <div className={`form-group my-2 ml-[5px] mr-[23px] w-full`}>
                    <label className={`${OptionStyle.label_plus}`} htmlFor="">
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
            title={'Do you want to add this blog?'}
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

export default BlogManagementAdd;
