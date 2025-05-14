import { Button, message } from 'antd';
import FormProvider, { RHFTextField } from 'components/hook-form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from 'zustand/store';

interface LoginFormData {
  account: string;
  password: string;
}

export default function LogInPage() {
  const { login } = useAuthStore(); // ✅ Lấy action login từ store

  const defaultValues = {
    account: '',
    password: '',
  };

  const methods = useForm<LoginFormData>({
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data: LoginFormData) => {
    // 👇 Giả lập logic auth
    if (data.account === 'admin' && data.password === '123456') {
      login(data.account,data.password ); // ✅ Gọi login từ store Zustand
      message.success('Đăng nhập thành công');
      // chuyển hướng, hoặc lưu localStorage nếu cần
    } else {
      message.error('Sai tài khoản hoặc mật khẩu');
    }
  };
  const user = useAuthStore((state) => state.token)
  console.log(user)
  return (
    <div className="login-wrapper">
      <h2 className="login-title">Login</h2>
      <div className="login-form">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField name="account" label="Tài khoản" isRequired />
          <RHFTextField name="password" label="Mật khẩu" isRequired type="password" />
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormProvider>
      </div>
    </div>
  );
}
