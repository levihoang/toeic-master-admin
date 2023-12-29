import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { BookIcon } from '../../assets/icons/BookIcon';
import { Button } from '../../components/button/Button';
import { CircleSpin } from '../../assets/icons/CircleSpin';
import { AiOutlineEdit } from 'react-icons/ai';
import ItemsPerPage from '../../components/ItemsPerPage';
import BlogService from '../../services/blog.service';
import { toast } from 'react-toastify';
import { PaginationOwn } from '../../components/Shared';

const BlogManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogData, setBlogData] = useState<any>();
  const [crumbs] = useState([{ name: 'Blog Management', url: '/blog' }]);
  const [searchParams] = useSearchParams();

  const selected = (url: any) => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  const page = searchParams.get('page') || 1;

  const getListBlog = async (params?: any) => {
    setLoading(true);
    try {
      const res = await BlogService.get_blog(params);
      if (res.statusCode === 200) {
        setBlogData(res?.data);
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
      const params: any = {
        limit: itemPerPage,
        pageNumber: page
      };
      getListBlog(params);
    }
  }, [itemPerPage, page]);

  const handlePageSizeChange = (value: any) => {
    setItemPerPage(value);
  };

  const onPageChange = useCallback(async (event: number) => {
    navigate(`/blog?page=${event}`);
  }, []);

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <div className="flex items-center justify-between">
        <TitlePage icon={() => <BookIcon />} name="Category Management" />
        <div className="flex">
          <div className="mr-6">
            <Button url="blog-add">Create Blog</Button>
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
                  <span>Title</span>
                </th>
                <th scope="col" className="w-[50%]">
                  <span>Description</span>
                </th>
                <th scope="col">
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {blogData?.contents?.map((item: any, index: number) => {
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
                      <td className="order">{item?.title || '-'}</td>
                      <td className="order">
                        <span className="line-clamp-2">
                          {item?.description || '-'}
                        </span>
                      </td>
                      <td>
                        <div className="table-action-btn table-action-edit w-fit">
                          <Link to={`blog-edit/${item._id}`}>
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
        {blogData?.contents?.length === 0 && !loading && (
          <p className="text-center text-sm mt-3">No account found</p>
        )}
        {blogData && blogData?.totalItem > itemPerPage && !loading && (
          <div className="my-6 flex text-right justify-center">
            <PaginationOwn
              totalItems={blogData?.totalItem}
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

export default BlogManagement;
