import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { BookIcon } from '../../assets/icons/BookIcon';
import { Button } from '../../components/button/Button';
import ItemsPerPage from '../../components/ItemsPerPage';
import { PaginationOwn } from '../../components/Shared';
import { AiOutlineEdit } from 'react-icons/ai';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import CourseService from '../../services/course.service';
import moment from 'moment';
import { FORM_FORMAT } from '../../constant/form.const';

const CourseManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [courseData, setCourseData] = useState<any>();
  const [crumbs] = useState([{ name: 'Course Management', url: '/course' }]);
  const [searchParams] = useSearchParams();

  const selected = (url: any) => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  const page = searchParams.get('page') || 1;

  const handlePageSizeChange = (value: any) => {
    setItemPerPage(value);
  };

  const onPageChange = useCallback(async (event: number) => {
    navigate(`/course?page=${event}`);
  }, []);

  const getData = async (params?: any) => {
    setLoading(true);
    const res = await CourseService.get_list(params);
    if (res.statusCode === 200) {
      setCourseData(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
      let params = {
        pageNumber: page,
        limit: itemPerPage
      };
      getData(params);
    }
  }, [itemPerPage, page]);

  console.log('courseData', courseData);

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <div className="flex items-center justify-between">
        <TitlePage icon={() => <BookIcon />} name="Course Management" />
        <div className="flex">
          <div className="mr-6">
            <Button url="course-add">Create Course</Button>
          </div>
        </div>
      </div>
      <div className="mt-10 pr-6">
        <div className="flex">
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
                  <span>Image</span>
                </th>
                <th>
                  <span>Name</span>
                </th>
                <th scope="col" className="w-[50%]">
                  <span>Description</span>
                </th>
                <th scope="col">
                  <span>Date Create</span>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {courseData?.contents?.map((item: any, index: number) => {
                  return (
                    <tr key={item?._id}>
                      <th>{(currentPage - 1) * itemPerPage + index + 1}</th>
                      <th className="font-semibold" scope="row">
                        <img
                          src={item?.imgUrl}
                          alt=""
                          className="max-h-[100px]"
                        />
                      </th>
                      <td className="order">{item?.name || '-'}</td>
                      <td className="order">
                        <span className="line-clamp-2">
                          {item?.description || '-'}
                        </span>
                      </td>
                      <td className="order">
                        {moment(new Date(item.createdAt)).format(
                          FORM_FORMAT.TABLE_DATE
                        ) || '-'}
                      </td>
                      <td>
                        <div className="table-action-btn table-action-edit w-fit">
                          <Link to={`course-edit/${item._id}`}>
                            <AiOutlineEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        {courseData?.contents?.length === 0 && !loading && (
          <p className="text-center text-sm mt-3">No course found</p>
        )}
        {courseData && courseData?.totalItem > itemPerPage && !loading && (
          <div className="my-6 flex text-right justify-center">
            <PaginationOwn
              totalItems={courseData?.totalItem}
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
    </>
  );
};

export default CourseManagement;
