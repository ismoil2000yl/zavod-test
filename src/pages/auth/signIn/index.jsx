import { Formik, Form, Field } from 'formik'
import React from 'react'
import { signIn } from 'store/auth'
import { Fields } from 'components'
import { Button, message } from 'antd'
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { changeMyUser } from "store/myuser";
import storage from 'services/storage'
import api from 'services/api'
import { useState } from 'react'
import IconImage from 'assets/images/jpg/login.jpg'

const index = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch()

  const [disable, setDisable] = useState(false)

  const validate = Yup.object({
    username: Yup.string()
      .max(30, 'Xarflar soni 30 dan oshmasin...!')
      .required("Username kiritilmagan...!"),
    password: Yup.string()
      .min(1, "Parol uzunligi 1 ta dan ko'p bo'lsin...!")
      .required("Parol kiritilmagan...!"),
  })

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return api.post(
        "/user/login/",
        newTodo
      );
    },
    onSuccess: (data) => {
      dispatch(changeMyUser(data.data));
      storage.set("token", data.data.access)
      storage.set("refresh-token", data.data.refresh)
      navigate("/");
      dispatch(signIn(data.data));
      setDisable(false)
    },
    onError: (error) => {
      setDisable(false)
      console.log(error);
      if (error?.response?.data?.detail) {
        messageApi.open({
          type: 'error',
          content: "Username yoki parol xato!",
        });
      }
      if (error?.response?.data?.password) {
        messageApi.open({
          type: 'error',
          content: "Parol kiritilmagan!",
        });
      }
      if (error?.response?.data?.username) {
        messageApi.open({
          type: 'error',
          content: "Username kiritilmagan!",
        });
      }
    }
  });

  {/* <div style={{ backgroundImage: "url(/src/assets/images/jpg/login.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: 'cover' }} className='w-full sm:w-[70%] md:w-[90%] h-full mx-auto bg-white rounded-2xl p-4 shadow-xl shadow-[#D4EAFF] border border-solid border-[#d1d4d6]'>
          <div className='w-[350px] md:w-[450px] min-h-[320px] p-4 rounded-xl shadow-xl shadow-[#d1d4d6] border border-solid border-[#d1d4d6] backdrop-blur-sm mt-[10%] bg-[black] bg-opacity-40 mx-auto'></div> */}

  return (

    <div className='w-[100vw] h-[100vh] relative bg-img'>
      <div className='w-[350px] md:w-[450px] min-h-[320px] p-10 rounded-xl shadow-sm shadow-[#d1d4d6] border border-solid border-[#d1d4d6] backdrop-blur-sm bg-[black] bg-opacity-40 absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
        <h1 className='text-center my-2 text-white'>Tizimga kirish <hr /></h1>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={(data) => {
            signIn(data)
          }}
          validationSchema={validate}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                {contextHolder}
                {/* <div className='text-center'>
                        <img src={IconLogo} className="sign-user-avatar bg-[#081224]" />
                        <h3 className='my-3 text-white'>Login</h3>
                      </div> */}
                <Field
                  name='username'
                  label='Login'
                  loginClass={true}
                  component={Fields.Input}
                />
                <Field
                  name='password'
                  label='Parol'
                  type="password"
                  loginClass={true}
                  component={Fields.Input}
                  hasPassword={true}
                />
                <Button
                  className='w-full mt-4 float-right'
                  size='large'
                  type='primary'
                  onClick={() => { mutation.mutate(values), setDisable(true) }}
                  disabled={disable}
                >
                  Kirish
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  )
}

export default index


{/* <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={(data) => {
              signIn(data)
            }}
            validationSchema={validate}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  {contextHolder}
                  <div className='text-center'>
                    <img src={IconLogo} className="sign-user-avatar bg-[#081224]" />
                    <h3 className='my-3 text-white'>Login</h3>
                  </div>
                  <Field
                    name='username'
                    label='User name'
                    component={Fields.Input}
                  />
                  <Field
                    name='password'
                    label='Password'
                    type="password"
                    component={Fields.Input}
                    hasPassword={true}
                  />
                  <Button
                    className='col-md-3 mt-4 float-right'
                    size='large'
                    type='primary'
                    onClick={() => { mutation.mutate(values), setDisable(true) }}
                    disabled={disable}
                  >
                    Login
                  </Button>
                </Form>
              );
            }}
          </Formik> */}