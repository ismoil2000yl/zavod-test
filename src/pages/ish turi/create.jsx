import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal } from 'antd'
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

    useEffect(() => {
        setClientReady(true);
    }, []);

    const onFinish = async (values) => {
        console.log(values);
        if (modalData?.data) {
            try {
                return (await api.patch(`/post/ish_turi/${modalData?.data?.id}/`, values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["ish_turi"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Ish turi tahrirlandi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Ish turi tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/post/ish_turi/', values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["ish_turi"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi Ish turi qo'shildi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Ish turi qo'shilmadi...!",
                });
            }
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            ish_id: modalData?.data?.ish_id || '',
            name: modalData?.data?.name || '',
        });
    }, [modalData?.data]);

    return (
        <Modal
            open={modalData?.isOpen}
            footer={false}
            destroyOnClose
            title={get(modalData, "data") ? "Ish turini tahrirlash" : "Yangi ish turi qo'shish"}
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
                    name="ish_id"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Ish ID si kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Ish ID si"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Ish turi kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Ish turi"
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