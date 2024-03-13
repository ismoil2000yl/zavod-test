import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import api from 'services/api';
import {
    PlusOutlined
} from "@ant-design/icons";

const create = ({ modalData, setModalData }) => {

    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()

    const [users, setUsers] = useState([])


    const getUsers = async () => {
        const data = await api.get("/user/signup/")
        const usersBulim = data?.data?.filter(item => item.status.includes("Bulim"))
        setUsers(usersBulim)
    }

    useEffect(() => {
        setClientReady(true);
        getUsers()
    }, []);

    const onFinish = async (values) => {
        console.log(values);
        if (modalData?.data) {
            try {
                return (await api.patch(`/post/bulim/${modalData?.data?.id}/`, values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["bulim"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Bulim tahrirlandi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Bulim tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/post/bulim/', values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["bulim"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi Bulim qo'shildi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Bulim qo'shilmadi...!",
                });
            }
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            bulim_id: modalData?.data?.bulim_id || '',
            name: modalData?.data?.name || '',
            user: modalData?.data?.user || 'User tanlang',
        });
    }, [modalData?.data]);

    return (
        <Modal
            open={modalData?.isOpen}
            footer={false}
            destroyOnClose
            title={get(modalData, "data") ? "Bulimni tahrirlash" : "Yangi Bulim qo'shish"}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            <Form
                form={form}
                className={"flex justify-center items-end flex-col gap-4"}
                name="horizontal_login"
                layout="inline"
                onFinish={onFinish}
            >
                <Form.Item
                    name="bulim_id"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Bulim ID si kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Bulim ID si"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Bulim kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Bulim nomi"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name={"user"}
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            // required: true,
                            message: "User tanlanmagan!",
                        },
                    ]}
                >
                    <Select
                        onChange={(e) => { }}
                    >
                        {
                            users.map((item, idx) => {
                                return (
                                    <Select.Option
                                        value={item.id}
                                        key={idx}
                                    >
                                        {item.first_name + " " + item.last_name + " || " + item.username}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
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
                            <PlusOutlined />
                            {modalData?.data ? "Yangilash" : "Qo'shish"}
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default create