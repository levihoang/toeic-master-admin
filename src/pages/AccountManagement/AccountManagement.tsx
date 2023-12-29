import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { CircleSpin, UserIcon } from '../../assets/icons/Index';
import ItemsPerPage from '../../components/ItemsPerPage';
import AccountService from '../../services/account.service';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { FORM_FORMAT } from '../../constant/form.const';
import moment from 'moment';
import { PaginationOwn } from '../../components/Shared';

const AccountManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [crumbs] = useState([{ name: 'Account Management', url: '/account' }]);
  const [searchParams] = useSearchParams();
  const [accountData, setAccountData] = useState<any>();
  const [reload, setReload] = useState(false);

  const page = searchParams.get('page') || 1;

  const selected = (url: any) => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  const getData = async (params?: any) => {
    setLoading(true);
    try {
      const res = await AccountService.get_list(params);
      if (res.statusCode === 200) {
        setAccountData(res?.data);
      } else {
        toast.error('Have a error! Please try again.', {
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
    } catch (error) {
      toast.error('Have a error! Please try again.', {
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
    if (page) {
      setCurrentPage(Number(page));
      let params = {
        pageNumber: page,
        limit: itemPerPage
      };
      getData(params);
    }
  }, [itemPerPage, page, reload]);

  const handlePageSizeChange = (value: any) => {
    setItemPerPage(value);
  };

  const handleStatusChange = async (nextChecked: any, id: string) => {
    const params = {
      userId: id,
      status: nextChecked ? 'ACTIVE' : 'DISABLE'
    };
    try {
      const res = await AccountService.update_status(params);
      if (res.statusCode === 200) {
        toast.success('Update status success!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        });
        setReload(!reload);
      } else {
        toast.error('Have a error! Please try again.', {
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
    } catch (error) {
      toast.error('Have a error! Please try again.', {
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

  const onPageChange = (page: number) => {
    navigate(`/account?page=${page}`);
  };

  console.log(accountData);
  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <TitlePage icon={() => <UserIcon />} name="Account Management" />
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
                <th>
                  <span>Name</span>
                </th>
                <th>
                  <span>Email</span>
                </th>
                <th>
                  <span>Date Create</span>
                </th>
                <th>
                  <span>Status</span>
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {accountData?.contents?.map((item: any, index: number) => {
                  return (
                    <tr key={item?._id}>
                      <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                      <td className="font-semibold">{item?.name || '-'}</td>
                      <td className="order">{item?.email}</td>
                      <td className="order">
                        {moment(new Date(item.createdAt)).format(
                          FORM_FORMAT.TABLE_DATE
                        ) || '-'}
                      </td>
                      <td>
                        <div className="flex items-center justify-center">
                          <Switch
                            onChange={(value: any) =>
                              handleStatusChange(value, item?._id)
                            }
                            checked={
                              !item?.status || item?.status === 'ACTIVE'
                                ? true
                                : false
                            }
                            className="react-switch"
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            type="IOS"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        {accountData?.contents?.length === 0 && !loading && (
          <p className="text-center text-sm mt-3">No account found</p>
        )}
        {accountData && accountData?.totalItem > itemPerPage && !loading && (
          <div className="my-6 flex text-right justify-center">
            <PaginationOwn
              totalItems={accountData?.totalItem}
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

export default AccountManagement;
