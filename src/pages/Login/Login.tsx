import React from 'react';
import imgLogin from '../../assets/images/Learning-cuate-2.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFrom } from '../../types/data.type';
import { UserIcon, EmailIcon } from '../../assets/icons/Index';
import { Button } from '../../components/Button';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const errorStyle = 'text-red-500 text-sm font-normal leading-5 mt-1 text-red';
const inputStyle =
  'border border-yellow_2 border-solid p-[10px] text-base font-normal text-yellow_3 rounded-3xl w-[100%] lg:w-[50%] h-[42px] mt-1';
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFrom>({
    defaultValues: {
      user_name: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<LoginFrom> = async ({
    user_name,
    password
  }: LoginFrom) => {
    const user = {
      email: user_name,
      password
    };

    try {
      const res = await AuthService.login(user);
      if (res.statusCode === 200) {
        console.log(res);
        localStorage.setItem('admin', JSON.stringify(res.data));
        navigate('/');
      } else {
        setError('user_name', {
          type: 'manual',
          message: res?.message
        });
      }
    } catch (error) {
      setError('user_name', {
        type: 'manual',
        message: 'We have a problem, please try again'
      });
    }
  };

  return (
    <div className="bg-[#4D57AA] min-h-[100vh] flex items-center justify-center">
      <div className="container max-w-[70vw] min-h-[70vh] bg-white rounded-xl flex items-center justify-between">
        <div className="w-1/2 flex justify-center items-center">
          <img src={imgLogin} alt="Login" className="h-[300px]" />
        </div>
        <div className="flex flex-col items-center w-1/2">
          <h1 className="font-bold text-[30px]">Admin Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-y-3"
          >
            <div className="form-input">
              <div className="absolute z-30 top-[13px] left-[14px]">
                <UserIcon />
              </div>
              <input
                id="user_name"
                type="text"
                className={`${inputStyle} outline-none`}
                placeholder="Username or Email"
                {...register('user_name', {
                  required: 'Please enter your username or email address'
                  //   onChange: e => {
                  //     trigger('user_name');
                  //   }
                })}
              />
              {errors.user_name && (
                <p
                  className={`${errorStyle} lg:text-sm lg:font-medium lg:leading-6`}
                >
                  {errors.user_name?.message}
                </p>
              )}
            </div>
            <div className="form-input">
              <div className="absolute z-30 top-[13px] left-[14px]">
                <EmailIcon />
              </div>
              <input
                id="password"
                type="password"
                className={`${inputStyle} outline-none`}
                placeholder="Password"
                {...register('password', {
                  required: 'Please enter your password'
                  //   onChange: e => {
                  //     trigger('password');
                  //   }
                })}
              />
              {errors.password && (
                <p
                  className={`${errorStyle} lg:text-sm lg:font-medium lg:leading-6`}
                >
                  {errors.password?.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-5">
              LOGIN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
