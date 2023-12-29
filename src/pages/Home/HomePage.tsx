import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TitlePage from '../../components/titlePage/TitlePage';
import { BookIcon } from '../../assets/icons/BookIcon';
import { Link, useNavigate } from 'react-router-dom';
import ItemsPerPage from '../../components/ItemsPerPage';
import CategoryService from '../../services/category.service';
import { Button } from '../../components/button/Button';
import { CircleSpin } from '../../assets/icons/Index';
import { AiOutlineEdit } from 'react-icons/ai';

export const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<any>([]);

  const [crumbs] = useState([
    { name: 'Category Management', url: '/category' }
  ]);

  const selected = (url: any) => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await CategoryService.get_category();
      if (res.statusCode === 200) {
        setCategory(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected={selected} />
      <div className="flex items-center justify-between">
        <TitlePage icon={() => <BookIcon />} name="Category Management" />
        <div className="flex">
          <div className="mr-6">
            <Button url="category-add">Create Category</Button>
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
                  <span>Code</span>
                </th>
                <th>
                  <span>Parent Code</span>
                </th>
                <th scope="col">
                  <span>Name</span>
                </th>
                <th scope="col" className="w-[60%]">
                  <span>Description</span>
                </th>
                <th scope="col">
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {category.map((item: any, index: number) => {
                  return (
                    <tr key={item?._id}>
                      <th>{(currentPage - 1) * itemPerPage + index + 1}</th>
                      <th className="font-semibold" scope="row">
                        {item?.code || '-'}
                      </th>
                      <td className="order">{item?.parentCode || '-'}</td>
                      <td>{item?.name || '-'}</td>
                      <td className="order">{item?.description || '-'}</td>
                      <td>
                        <div className="table-action-btn table-action-edit w-fit">
                          <Link to={`category-edit/${item._id}`}>
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
