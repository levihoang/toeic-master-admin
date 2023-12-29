import React, { useCallback, useEffect, useState } from 'react';
import GroupQuestionService from '../../services/groupquestion.service';
import { toast } from 'react-toastify';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import { PaginationOwn } from '../../components/Shared';
import ItemsPerPage from '../../components/ItemsPerPage';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import moment from 'moment';
import { FORM_FORMAT } from '../../constant/form.const';
import { Button } from '../../components/button/Button';
import Modal from '../../components/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import QuestionService from '../../services/question.service';
import { ArticleCard } from '../../components/ArticleCard';
import Select from 'react-select';
import { TrashIcon } from '../../assets/icons/Index';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../services/firestore.service';

const OptionStyle = {
  form_group_plus: 'w-full',
  label_plus: 'font-semibold text-sm leading-5'
};

const question = {
  content: '',
  options: ['A', 'B', 'C', 'D'],
  answer: 0,
  explain: '',
  typeId: []
};

const answerQuestion = [
  {
    label: 'A',
    value: 0
  },
  {
    label: 'B',
    value: 1
  },
  {
    label: 'C',
    value: 2
  },
  {
    label: 'D',
    value: 3
  }
];

const GroupQuestion = () => {
  const _paramsURL = useParams();
  const [paramsURL, setParamsURL] = useState({ ..._paramsURL });
  const [groupQuestion, setGroupQuestion] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [confirmAddModal, setConfirmAddModal] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [imageError, setImgError] = useState<any>();
  const [imageLink, setImageLink] = useState<any>();
  const [audioLink, setAudioLink] = useState<any>();
  const [currentFile, setCurrentFile] = useState<any>();
  const [currentAudio, setCurrentAudio] = useState<any>();
  const [questions, setQuestions] = useState<any>([question]);
  const [typeQuestion, setTypeQuestion] = useState<any>();
  const [listTypeId, setListTypeId] = useState<any>([]);
  const [reload, setReload] = useState(false);
  const [groupQuestionId, setGroupQuestionId] = useState<any>();
  const [groupQuestionDetail, setGroupQuestionDetail] = useState<any>();

  const navigate = useNavigate();

  const page = searchParams.get('page') || 1;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<any>({});

  const getGroupQuestion = async (params: any) => {
    setLoading(true);
    const res = await GroupQuestionService.get_list(params);
    if (res?.statusCode === 200) {
      setGroupQuestion(res.data);
    } else {
      toast.error(res?.message, {
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

  const getGroupQuestionDetail = async (id: any) => {
    const res = await GroupQuestionService.get_detail(id);
    if (res?.statusCode === 200) {
      setGroupQuestionDetail(res.data);
      setImageLink(res.data?.imgUrl);
      setAudioLink(res.data?.audioUrl);
      setQuestions(res.data?.questions);
      setValue('title', res.data?.title);
      setValue('content', res.data?.content);
      setValue('transcript', res.data?.transcript);
      res.data?.questions?.map((item: any, index: number) => {
        setValue(`content_question_${index}`, item.content);
        setValue(`answer_${index}`, item.answer);
        setValue(`explain_${index}`, item.explain);
        setValue(`option_A_${index}`, item.options[0]);
        setValue(`option_B_${index}`, item.options[1]);
        setValue(`option_C_${index}`, item.options[2]);
        setValue(`option_D_${index}`, item.options[3]);
        setValue(`type_${index}`, item.typeIds);
        const _typeID = [...listTypeId];
        _typeID[index] = item.typeIds;
        setListTypeId(
          _typeID.map((item: any) => {
            return item?.map((item: any) => {
              return { label: item, value: item };
            });
          })
        );
      });
    } else {
      toast.error(res?.message, {
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

  const getTypeQuestion = async () => {
    const res = await QuestionService.get_type();
    if (res?.statusCode === 200) {
      const newData = res.data.map((item: any) => {
        return {
          label: item.name,
          value: item._id
        };
      });
      setTypeQuestion(newData);
    }
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
      const params: any = {
        pageNumber: Number(page),
        limit: itemPerPage,
        categoryId: paramsURL?.id
      };
      getGroupQuestion(params);
    }
  }, [itemPerPage, page, paramsURL?.id, reload]);

  useEffect(() => {
    getTypeQuestion();
  }, []);

  useEffect(() => {
    getGroupQuestionDetail(groupQuestionId);
  }, [groupQuestionId]);

  const onPageChange = useCallback(async (event: number) => {
    navigate(`/group-question/${paramsURL?.id}?page=${event}`);
  }, []);

  const handlePageSizeChange = (value: any) => {
    setItemPerPage(value);
  };

  const submitHandler: SubmitHandler<any> = async value => {
    setConfirmAddModal(true);
    setSubmitAdd(true);
    const newQuestion = questions.map((item: any, index: any) => {
      return {
        content: value[`content_question_${index}`],
        answer: value[`answer_${index}`],
        explain: value[`explain_${index}`],
        options: [
          value[`option_A_${index}`],
          value[`option_B_${index}`],
          value[`option_C_${index}`],
          value[`option_D_${index}`]
        ],
        typeIds: getValues(`type_${index}`).map((item: any) => item.value)
      };
    });

    let params = {
      content: value.content,
      imgUrl: '',
      audioUrl: '',
      title: value.title,
      questions: newQuestion,
      transcript: value.transcript,
      categoryId: paramsURL?.id
    };
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
        params = { ...params, imgUrl: imageLink };
      }

      if (currentAudio) {
        const idAudio = v4();
        const audioRef = ref(storage, `audios/${idAudio}`);
        const e = await uploadBytes(audioRef, currentAudio.target.files[0]);
        const url = await getDownloadURL(e?.ref);

        if (!url) {
          toast.error('Audio is required!' /* ... */);
          setSubmitAdd(false);
          return;
        }

        params = { ...params, audioUrl: url };
      } else {
        params = { ...params, audioUrl: audioLink };
      }

      if (groupQuestionId) {
        const res = await GroupQuestionService.update(groupQuestionId, params);
        console.log(res);
        if (res?.statusCode === 200) {
          toast.success('Update Group Question Success!', {
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
          navigate(`/group-question/${paramsURL?.id}`);
        } else {
          toast.error(res?.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false
          });
          setConfirmAddModal(true);
          setSubmitAdd(false);
        }
      } else {
        const res = await GroupQuestionService.create(params);

        if (res?.statusCode === 200) {
          toast.success('Create Group Question Success!', {
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
          navigate(`/group-question/${paramsURL?.id}`);
        } else {
          toast.error(res?.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false
          });
          setConfirmAddModal(true);
          setSubmitAdd(false);
        }
      }
    } catch (err) {
      setSubmitAdd(false);
      console.log(err);
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

  const handleInputChange = (e: any) => {
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
        setImageLink(URL.createObjectURL(e.target.files[0]));
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

  console.log('listTypeId', listTypeId);

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
            Create Group Question
          </Button>
          <div className="ml-auto mt-2">
            <ItemsPerPage
              choice={itemPerPage}
              setChoice={(val: number) => {
                handlePageSizeChange(val);
              }}
            />
          </div>
        </div>
        <div className="w-full h-auto relative mt-2 overflow-auto rounded shadow">
          <table className="table w-full rounded-lg">
            <thead className="bg-gray-f2 border-b-2 border-gray-200">
              <tr>
                <th>STT</th>
                <th scope="col">
                  <span>Title</span>
                </th>
                <th scope="col">
                  <span>Image</span>
                </th>
                <th>
                  <span>Date Create</span>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {groupQuestion?.contents?.map((item: any, index: number) => {
                  return (
                    <tr key={item?._id}>
                      <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                      <td className="order">{item?.title || '-'}</td>
                      <td className="font-semibold">
                        <img
                          src={item?.imgUrl}
                          alt=""
                          className="max-h-[100px]"
                        />
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
                            setGroupQuestionId(item?._id);
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
        {groupQuestion?.contents?.length === 0 && !loading && (
          <p className="text-center text-sm mt-3">No account found</p>
        )}
        {groupQuestion &&
          groupQuestion?.totalItem > itemPerPage &&
          !loading && (
            <div className="my-6 flex text-right justify-center">
              <PaginationOwn
                totalItems={groupQuestion?.totalItem}
                itemPerPage={itemPerPage}
                pageChange={onPageChange}
                pageCurrent={currentPage}
              />
            </div>
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
        title={`${groupQuestionDetail ? 'Edit' : 'Create'} Group Question`}
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
            <div className="form-group my-2 ml-[5px] mr-[23px]">
              <label htmlFor="title" className={`${OptionStyle.label_plus}`}>
                Title
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="Enter Title"
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
            <div className="flex justify-center">
              <div className="form-group my-2 ml-[5px] mr-[23px]">
                <label
                  htmlFor="content"
                  className={`${OptionStyle.label_plus}`}
                >
                  Content
                </label>
                <textarea
                  id="content"
                  className="form-area hidden-scrollbar"
                  {...register('content', {
                    required: 'Content is required',
                    setValueAs: (value: string) => value?.trim(),
                    onChange: () => {
                      trigger('content');
                    }
                  })}
                  rows={3}
                  cols={200}
                  placeholder="Enter Content"
                />
                {errors?.content?.message && (
                  <span className="text-redCustom-3b text-xs">
                    {errors?.content?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-group my-2 ml-[5px] mr-[23px]">
                <label
                  htmlFor="transcript"
                  className={`${OptionStyle.label_plus}`}
                >
                  Transcript
                </label>
                <textarea
                  id="transcript"
                  className="form-area hidden-scrollbar"
                  {...register('transcript', {
                    required: 'Transcript is required',
                    setValueAs: (value: string) => value?.trim(),
                    onChange: () => {
                      trigger('transcript');
                    }
                  })}
                  rows={3}
                  cols={200}
                  placeholder="Enter transcript"
                />
                {errors?.transcript?.message && (
                  <span className="text-redCustom-3b text-xs">
                    {errors?.transcript?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-center ">
                <div className={`form-group my-2 ml-[5px] mr-[23px] w-full`}>
                  <label className={`${OptionStyle.label_plus}`} htmlFor="">
                    Image
                  </label>
                  <div className="flex gap-5">
                    {(!imageLink || imageError) && (
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
                    {imageLink && !imageError && (
                      <div className="flex gap-5">
                        <div className="relative w-[180px] h-[180px] flex items-center justify-center cursor-pointer overflow-hidden">
                          <img
                            src={imageLink}
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
              <div className="flex flex-col gap-2">
                <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                  <label
                    htmlFor="audio"
                    className={`${OptionStyle.label_plus}`}
                  >
                    Audio
                  </label>
                  <input
                    type="file"
                    {...register('audio', {
                      required: audioLink ? false : 'Audio is required',
                      // setValueAs: (value?: string) => value?.trim(),
                      onChange: e => {
                        trigger('audio');
                        setCurrentAudio(e);
                      }
                    })}
                    accept="audio/*"
                  />
                  {!currentAudio && groupQuestionDetail?.audioUrl && (
                    <div className="flex gap-2 line-clamp-1 mt-3">
                      <p>Audio current: </p>
                      <Link
                        to={audioLink}
                        target="_blank"
                        className="underline"
                      >
                        Audio Link
                      </Link>
                    </div>
                  )}

                  {errors?.audio?.message && (
                    <span className="text-redCustom-3b text-xs">
                      {errors?.audio?.message as string}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              {questions.map((item: any, index: number) => {
                return (
                  <ArticleCard key={index} className="relative">
                    {questions.length > 1 && (
                      <div
                        className="absolute right-2 top-2"
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions.splice(index, 1);
                          setQuestions(newQuestions);
                        }}
                      >
                        <TrashIcon />
                      </div>
                    )}
                    <div className="text-center">
                      <h5>Question {index + 1}</h5>
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
                            setValueAs: (value: string) => value?.trim(),
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
                    <div className="form-group my-2 ml-[5px] mr-[23px]">
                      <label
                        htmlFor={`explain_${index}`}
                        className={`${OptionStyle.label_plus}`}
                      >
                        Explain
                      </label>
                      <input
                        id="explain"
                        type="text"
                        required
                        placeholder="Enter explain"
                        className="form-control"
                        {...register(`explain_${index}`, {
                          required: 'Explain is required',
                          setValueAs: (value: string) => value?.trim(),
                          onChange: () => {
                            trigger(`explain_${index}`);
                          }
                        })}
                      />
                      {errors[`explain_${index}`]?.message && (
                        <span className="text-redCustom-3b text-xs">
                          {String(errors[`explain_${index}`]?.message)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor={`option_A_${index}`}
                          className={`${OptionStyle.label_plus}`}
                        >
                          Answer A
                        </label>
                        <input
                          id="answer_A"
                          type="text"
                          required
                          placeholder="Enter Answer A"
                          className="form-control"
                          {...register(`option_A_${index}`, {
                            required: false,
                            setValueAs: (value: string) => value?.trim(),
                            onChange: () => {
                              trigger(`option_A_${index}`);
                            }
                          })}
                        />
                        {errors[`option_A_${index}`]?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors[`option_A_${index}`]?.message as string}
                          </span>
                        )}
                      </div>
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor={`option_B_${index}`}
                          className={`${OptionStyle.label_plus}`}
                        >
                          Answer B
                        </label>
                        <input
                          id="answer_B"
                          type="text"
                          required
                          placeholder="Enter Answer B"
                          className="form-control"
                          {...register(`option_B_${index}`, {
                            required: false,
                            setValueAs: (value: string) => value?.trim(),
                            onChange: () => {
                              trigger(`option_B_${index}`);
                            }
                          })}
                        />
                        {errors[`option_B_${index}`]?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors[`option_B_${index}`]?.message as string}
                          </span>
                        )}
                      </div>
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor={`option_C_${index}`}
                          className={`${OptionStyle.label_plus}`}
                        >
                          Answer C
                        </label>
                        <input
                          id="answer_C"
                          type="text"
                          required
                          placeholder="Enter Answer C"
                          className="form-control"
                          {...register(`option_C_${index}`, {
                            required: false,
                            setValueAs: (value: string) => value?.trim(),
                            onChange: () => {
                              trigger(`option_C_${index}`);
                            }
                          })}
                        />
                        {errors[`option_C_${index}`]?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors[`option_C_${index}`]?.message as string}
                          </span>
                        )}
                      </div>
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor={`option_D_${index}`}
                          className={`${OptionStyle.label_plus}`}
                        >
                          Answer D
                        </label>
                        <input
                          id="answer_D"
                          type="text"
                          required
                          placeholder="Enter Answer D"
                          className="form-control"
                          {...register(`option_D_${index}`, {
                            required: false,
                            setValueAs: (value: string) => value?.trim(),
                            onChange: () => {
                              trigger(`option_D_${index}`);
                            }
                          })}
                        />
                        {errors[`option_D_${index}`]?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors[`option_D_${index}`]?.message as string}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor={`answer_${index}`}
                          className={`${OptionStyle.label_plus}`}
                        >
                          Correct Answer
                        </label>
                        <Select
                          options={answerQuestion}
                          placeholder="Choose Answer"
                          value={answerQuestion?.find(
                            (item: any) =>
                              item.value === getValues(`answer_${index}`)
                          )}
                          onChange={(e: any) => {
                            setValue(`answer_${index}`, e.value);
                            trigger(`answer_${index}`);
                          }}
                          className=" mt-1"
                          classNamePrefix="select"
                        />
                        {errors[`answer_${index}`]?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors[`answer_${index}`]?.message as string}
                          </span>
                        )}
                      </div>
                      <div className="form-group my-2 ml-[5px] mr-[23px] w-1/2">
                        <label
                          htmlFor={`type_${index}`}
                          className={`${OptionStyle.label_plus}`}
                        >
                          Type
                        </label>
                        <Select
                          isMulti
                          options={typeQuestion}
                          placeholder="Choose type question"
                          value={
                            listTypeId[index]?.map((item: any) => {
                              return typeQuestion?.find(
                                (item2: any) => item2.value === item.value
                              );
                            }) ||
                            getValues(`type_${index}`)?.map((item: any) => {
                              return typeQuestion?.find(
                                (item2: any) => item2.value === item.value
                              );
                            })
                          }
                          onChange={(e: any) => {
                            setListTypeId(e);
                            const _typeID = [...listTypeId];
                            _typeID[index] = e;
                            setListTypeId(_typeID);
                            setValue(`type_${index}`, e);
                          }}
                          className=" mt-1"
                          classNamePrefix="select"
                        />
                        {errors[`type_${index}`]?.message && (
                          <span className="text-redCustom-3b text-xs">
                            {errors[`type_${index}`]?.message as string}
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
              onClick={handleSubmit(submitHandler, onError)}
            >
              {submitAdd && <CircleSpin />}
              {groupQuestionId ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              className="flex justify-center w-full md:w-52 form-button"
              onClick={() => {
                setQuestions([...questions, question]);
              }}
            >
              Add Question
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default GroupQuestion;
