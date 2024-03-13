import { Button, Form, Input, message, Modal } from 'antd'
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import api from 'services/api';
import storage from 'services/storage';

const create = ({ modalData, setModalData }) => {

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    return (await api.put(`/user/change/`, values).then((data) => {
      storage.set("token", data?.data?.access_token)
      storage.set("refresh-token", data?.data?.refresh_token)
      setModalData({ isOpen: false, data: null }),
        messageApi.open({
          type: 'success',
          content: "Parol o'zgartirildi"
        })
      form.resetFields()
    }).catch((error) => {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: "Parol o'zgartirilmadi!",
      });
    }))
  };

  useEffect(() => {
    form.setFieldsValue({
      old_password: modalData?.data?.old_password || '',
      new_password: modalData?.data?.new_password || '',
    });
  }, [modalData?.data]);

  return (
    <Modal
      open={modalData?.isOpen}
      footer={false}
      destroyOnClose
      title={"Parolni o'zgartirish"}
      onCancel={() => setModalData({ isOpen: false, data: null })}
    >{contextHolder}
      <Form
        form={form}
        className={"flex justify-center items-end flex-col gap-4"}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="old_password"
          className='w-full'
          rules={[
            {
              required: true,
              message: 'Eski parol kiritilmagan...!',
            },
          ]}
        >
          <Input
            placeholder="Eski parolni kiriiting"
            className='py-3'
          />
        </Form.Item>
        <Form.Item
          name="new_password"
          className='w-full'
          rules={[
            {
              required: true,
              message: 'Yangi parol kiritilmagan...!',
            },
          ]}
        >
          <Input
            placeholder="Yangi parolni kiriting"
            className='py-3'
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
            // disabled={
            //     !clientReady ||
            //     !form.isFieldsTouched(true) ||
            //     !!form.getFieldsError().filter(({ errors }) => errors.length).length
            // }
            >
              {modalData?.data ? "Yangilash" : "Qo'shish"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default create