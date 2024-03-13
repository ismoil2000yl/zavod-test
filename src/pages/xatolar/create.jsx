import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal } from 'antd'
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import api from 'services/api';

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
                return (await api.patch(`/post/xatolar/${modalData?.data?.id}/`, values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["xatolar"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Xato tahrirlandi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Xato tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/post/xatolar/', values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["xatolar"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi xato qo'shildi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Xato qo'shilmadi...!",
                });
            }
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            xato_id: modalData?.data?.xato_id || '',
            name: modalData?.data?.name || '',
        });
    }, [modalData?.data]);

    return (
        <Modal
            open={modalData?.isOpen}
            footer={false}
            destroyOnClose
            title={get(modalData, "data") ? "Xatoni tahrirlash" : "Yangi xato qo'shish"}
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
                    name="xato_id"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Xato ID si kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Xato ID si"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Xato nomi kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Xato nomi"
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