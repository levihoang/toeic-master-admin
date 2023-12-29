import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  url: string;
};

const Auth = ({ children, url }: Props) => {
  const navigate = useNavigate();

  let user: any = localStorage.getItem('admin');
  if (!user) {
    navigate('/login');
  } else {
    navigate(url);
  }

  return <div>{children}</div>;
};

export default Auth;
