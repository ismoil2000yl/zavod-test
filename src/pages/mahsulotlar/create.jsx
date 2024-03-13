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
        if (modalData?.data) {
            try {
                return (await api.patch(`/post/mahsulot/${modalData?.data?.id}/`, values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["mahsulot"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Mahsulot tahrirlandi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Mahsulot tahrirlanmadi!",
                });
            }
        }
        else {
            try {
                return (await api.post('/post/mahsulot/', values),
                    setModalData({ isOpen: false, data: null }),
                    queryClient.invalidateQueries({ queryKey: ["mahsulot"] }),
                    messageApi.open({
                        type: 'success',
                        content: "Yangi mahsulot qo'shildi"
                    }),
                    form.resetFields()
                )
            }
            catch (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: "Mahsulot qo'shilmadi...!",
                });
            }
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            mahsulot_id: modalData?.data?.mahsulot_id || '',
            name: modalData?.data?.name || '',
        });
    }, [modalData?.data]);

    return (
        <Modal
            open={modalData?.isOpen}
            footer={false}
            destroyOnClose
            title={get(modalData, "data") ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
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
                    name="mahsulot_id"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Mahsulot ID si kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Mahsulot ID si"
                        className='py-3'
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    className='w-full'
                    rules={[
                        {
                            required: modalData?.data ? false : true,
                            message: 'Mahsulot nomi kiritilmagan...!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Mahsulot nomi"
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