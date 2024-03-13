import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, message, Modal, Select } from 'antd';
import { get } from 'lodash'
import api from 'services/api';
import { useQueryClient } from '@tanstack/react-query';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const create = ({ modalData, setModalData, ishTuri, bulimi }) => {

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
                return (await api.patch(`/user/xodim/${modalData?.data?.id}/`, values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["xodim"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Xodim tahrirlandi"
                    }),
                    form.resetFields()
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
                return (await api.post('/user/xodim/', values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["xodim"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi Xodim qo'shildi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Xodim qo'shilmadi...!",
                });
            }
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            first_name: modalData?.data?.first_name || '',
            last_name: modalData?.data?.last_name || '',
            id_raqam: modalData?.data?.id_raqam || '',
            phone: modalData?.data?.phone || '',
            ish_turi: modalData?.data?.ish_turi,
            gender: modalData?.data?.gender || 'Genderni tanlang',
            bulimi: modalData?.data?.bulimi || 'Bulimini tanlang',
        });
    }, [modalData?.data]);

    return (

        <Drawer
            title={get(modalData, "data") ? "Xodimni tahrirlash" : "Yangi Xodim qo'shish"}
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
                        className='py-2'
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
                        className='py-2'
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
                        className='py-2'
                    />
                </Form.Item>
                <Form.Item
                    name="id_raqam"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Xodim uchun Id raqam kiritilmagan',
                        },
                    ]}
                >
                    <Input
                        placeholder="Xodim ID raqami"
                        className='py-2'
                    />
                </Form.Item>
                <Form.Item
                    name={"gender"}
                    className='w-full'
                >
                    <Select
                        onChange={() => { }}
                        className='py-2'
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
                    name={"ish_turi"}
                    className='w-full'
                >
                    <Select
                        className='py-2 w-full'
                        mode="multiple"
                        placeholder={"Ish turini tanlang"}
                    >
                        {
                            ishTuri.map((item, idx) => {
                                return (
                                    <Select.Option
                                        value={item.id}
                                        key={idx}
                                    >
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"bulimi"}
                    className='w-full'
                >
                    <Select
                        className='py-2 w-full'
                    >
                        {
                            bulimi.map((item, idx) => {
                                return (
                                    <Select.Option
                                        value={item.id}
                                        key={idx}
                                    >
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <div className='w-full flex items-center justify-between'>
                    <Button onClick={() => setModalData({ isOpen: false, data: null })} type='primary' danger><CloseOutlined />Bekor qilish</Button>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                <PlusOutlined /> {modalData?.data ? "Yangilash" : "Qo'shish"}
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </Drawer>
    )
}

export default create