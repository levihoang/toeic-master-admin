import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ExamService from '../../services/exam.service';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import { AiOutlineEdit } from 'react-icons/ai';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { BookIcon } from '../../assets/icons/BookIcon';
import { Button } from '../../components/button/Button';
import moment from 'moment';
import { FORM_FORMAT } from '../../constant/form.const';

const ExamManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [examData, setExamData] = useState<any>();
  const [crumbs] = useState([{ name: 'Exam Management', url: '/exam' }]);
  const [searchParams] = useSearchParams();

  const selected = (url: any) => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  const getData = async (params?: any) => {
    setLoading(true);
    const res = await ExamService.get_list();
    if (res.statusCode === 200) {
      setExamData(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <div className="flex items-center justify-between">
        <TitlePage icon={() => <BookIcon />} name="Exam Management" />
        <div className="flex">
          <div className="mr-6">
            <Button url="exam-add">Create Exam</Button>
          </div>
        </div>
      </div>
      <div className="mt-10 pr-6">
        <div className="w-full h-auto relative mt-2 overflow-auto rounded shadow">
          <table className="table w-full rounded-lg">
            <thead className="bg-gray-f2 border-b-2 border-gray-200">
              <tr>
                <th>STT</th>
                <th scope="col">
                  <span>Title</span>
                </th>
                <th>
                  <span>Order</span>
                </th>
                <th scope="col">
                  <span>Date Create</span>
                </th>
                <th scope="col">
                  <span>Status</span>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {examData?.map((item: any, index: number) => {
                  return (
                    <tr key={item?._id}>
                      <th>{(currentPage - 1) * itemPerPage + index + 1}</th>
                      <td className="order">{item?.title || '-'}</td>
                      <td className="order">{item?.zOrder || '-'}</td>
                      <td className="order">
                        {moment(new Date(item.createdAt)).format(
                          FORM_FORMAT.TABLE_DATE
                        ) || '-'}
                      </td>
                      <td className={`order`}>
                        <div className="p-1 bg-slate-200 w-fit rounded">
                          <p className={`mb-0 status-${item?.status} font-semibold`}>
                            {item?.status || '-'}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="table-action-btn table-action-edit w-fit">
                          <Link to={`exam-edit/${item._id}`}>
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
        {examData?.length === 0 && !loading && (
          <p className="text-center text-sm mt-3">No exam found</p>
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

export default ExamManagement;
