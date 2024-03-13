import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, message, Modal, Select } from 'antd';
import { get } from 'lodash'
import api from 'services/api';
import { useQueryClient } from '@tanstack/react-query';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const create = ({ modalData, setModalData }) => {

    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()

    // console.log(modalData?.data);

    useEffect(() => {
        setClientReady(true);
    }, []);
    const onFinish = async (values) => {
        if (modalData?.data) {
            try {
                return (await api.put(`/edit/${modalData?.data?.id}/`, values).then(() => {
                    setModalData({ isOpen: false, data: null }),
                        queryClient.invalidateQueries({ queryKey: ["users"] }),
                        messageApi.open({
                            type: 'success',
                            content: "Foydalanuvchi tahrirlandi"
                        }),
                        form.resetFields()
                })
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Foydalanuvchi tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/user/signup/', values).then(() => {
                    setModalData({ isOpen: false, data: null }),
                        queryClient.invalidateQueries({ queryKey: ["users"] }),
                        messageApi.open({
                            type: 'success',
                            content: "Yangi Foydalanuvchi qo'shildi"
                        }),
                        form.resetFields()
                })
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Foydalanuvchi qo'shilmadi...!",
                });
            }
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            username: modalData?.data?.username || '',
            password: modalData?.data?.password || '',
            first_name: modalData?.data?.first_name || '',
            last_name: modalData?.data?.last_name || '',
            phone: modalData?.data?.phone || '',
            status: modalData?.data?.status || 'Statusni tanlang',
            gender: modalData?.data?.gender || 'Genderni tanlang'
        });
    }, [modalData?.data]);
    return (
        // <Modal
        //     destroyOnClose
        //     title={get(modalData, "data") ? "Foydalanuvchini tahrirlash" : "Yangi Foydalanuvchi qo'shish"}
        //     open={modalData.isOpen}
        //     footer={false}
        //     onCancel={() => setModalData({ isOpen: false, data: null })}
        // >

        <Drawer
            title={get(modalData, "data") ? "Foydalanuvchini tahrirlash" : "Yangi Foydalanuvchi qo'shish"}
            placement={"right"}
            closable={false}
            // onClose={() => setModalData({ isOpen: false, data: null })}
            open={modalData.isOpen}
        >
            {contextHolder}
            <Form
                form={form}
                className={"flex justify-center items-end flex-col gap-4"}
                name="horizontal_login"
                layout="inline"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Username kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    className='w-full'
                    name="password"
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Parol kiritilmagan...!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name="first_name"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Ism kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Ism"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Familya kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Familya"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name={"status"}
                    className='w-full'
                >
                    <Select
                        onChange={() => { }}
                        className='py-3'
                        defaultValue={"Statusni tanlang"}
                        options={[
                            {
                                value: 'Direktor',
                                label: 'Direktor',
                            },
                            {
                                value: 'Admin',
                                label: 'Admin',
                            },
                            {
                                value: 'Tekshiruvchi',
                                label: 'Tekshiruvchi',
                            },
                            {
                                value: 'Bulim',
                                label: "Bo'lim",
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name={"gender"}
                    className='w-full'
                >
                    <Select
                        onChange={() => { }}
                        className='py-3'
                        defaultValue={"Genderni tanlang"}
                        options={[
                            {
                                value: 'Erkak',
                                label: 'Erkak',
                            },
                            {
                                value: 'Ayol',
                                label: 'Ayol',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            // required: true,
                            message: 'Telefon raqam kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                        addonBefore={<span><PhoneOutlined className="site-form-item-icon rotate-90 mr-2" />+998</span>}
                        type='number'
                    />
                </Form.Item>
                <div className='w-full flex items-center justify-between'>
                    <Button onClick={() => setModalData({ isOpen: false, data: null })} type='primary' danger><CloseOutlined />Bekor qilish</Button>
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
                                <PlusOutlined /> {modalData?.data ? "Yangilash" : "Qo'shish"}
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </Drawer>
        // </Modal>
    )
}

export default create