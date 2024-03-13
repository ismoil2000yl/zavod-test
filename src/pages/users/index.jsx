import { Avatar, Button, message, Pagination, Popconfirm, Popover, Radio, Select, Tooltip } from 'antd'
import React from 'react'
import { useState } from 'react'
import Create from './create'
import ContainerAll from 'moduls/container/all'
import { useQueryClient } from '@tanstack/react-query'
import { Table } from 'components'
import { usePost } from 'crud'
import { get, truncate } from 'lodash'
import {
    PlusOutlined, DeleteOutlined
} from "@ant-design/icons";
import { useSelector } from 'react-redux'
import ModalImage from './image'
import IconImg from 'assets/images/jpg/images.png'
import AyolIconImg from 'assets/images/jpg/ayol-images.png'

const index = () => {

    const [modalData, setModalData] = useState({ isOpen: false, data: null })
    const [status, setStatus] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [modalImage, setModalImage] = useState({ isOpen: false, data: null })

    const queryClient = useQueryClient()
    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/user/signup/${id}/`,
            method: "delete",
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["users"] });
                messageApi.open({
                    type: 'success',
                    content: "Foydalanuvchi o'chirib yuborildi"
                })
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: "Foydalanuvchi o'chirilmadi!"
                })
            }
        })
    };

    const cancel = (e) => {
        message.error("Ushbu ma'lumot o'chirilmadi");
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Rasmi",
            dataIndex: "photo",
            key: "photo",
            // render: (item, row) => {
            //     return <Avatar onClick={() => setModalImage({ isOpen: true, data: row })} className='shadow-sm cursor-pointer' size={"large"} src={item !== "https://zavod.pythonanywhere.com/media/base.jpg" ? `${item}` : row.gender == "Erkak" ? IconImg : AyolIconImg} />
            // }
            render: (item, row) => {
                return <Avatar onClick={() => setModalImage({ isOpen: true, data: row })} className='shadow-sm cursor-pointer' size={"large"} src={item !== "/media/default.jpg" ? `https://hisobot.pythonanywhere.com/media/${item}` : row.gender == "Erkak" ? IconImg : AyolIconImg} />
            }
        },
        {
            title: "Ismi",
            dataIndex: "first_name",
            key: "first_name"
        },
        {
            title: "Familyasi",
            dataIndex: "last_name",
            key: "last_name"
        },
        {
            title: "Telefon raqami",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (value) => {
                return value?.length > 15 ? (
                    <Popover title={value}>
                        {truncate(value, { length: 15, omission: "..." })}
                    </Popover>
                ) : (
                    value
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        // {
        //     title: "O'chirish",
        //     dataIndex: 'delete',
        //     key: 'delete',
        //     render: (_, row) => {
        //         if (row?.status === "Manager") {
        //             return <h4>O'chirish imkonsiz</h4>
        //         }
        //         else {
        //             return (
        //                 <Tooltip placement='right' title={"O'chirish"}>
        //                     <Popconfirm
        //                         placement="topRight"
        //                         title={"O'chirish"}
        //                         description={"O'chirishni xoxlaysizmi?"}
        //                         onConfirm={() => deleteConfirm(row?.id)}
        //                         onCancel={cancel}
        //                         okText="Ha"
        //                         cancelText="Yo'q"
        //                     >
        //                         < Button className='bg-red-600 hover:bg-red-600 text-white hover:bg-opacity-80' type='ghost' >
        //                             <DeleteOutlined
        //                                 className="text-white cursor-pointer text-lg"
        //                             />
        //                         </ Button>
        //                     </Popconfirm>
        //                 </Tooltip>
        //             )
        //         }
        //     },
        // }
    ]

    return (
        <div className='w-full h-full'>{contextHolder}
            <ModalImage modalImage={modalImage} setModalImage={setModalImage} />
            <div className="my-2 flex items-center justify-between gap-2">
                <Select
                    className='w-[150px]'
                    onChange={(e) => setStatus(e)}
                    placeholder={"Statusni tanlang"}
                >
                    <Select.Option
                        value=""
                    >
                        Xammasi
                    </Select.Option>
                    <Select.Option
                        value="Direktor"
                    >
                        Direktor
                    </Select.Option>
                    <Select.Option
                        value="Admin"
                    >
                        Admin
                    </Select.Option>
                    <Select.Option
                        value="Tekshiruvchi"
                    >
                        Tekshiruvchi
                    </Select.Option>
                    <Select.Option
                        value="Bulim"
                    >
                        Bo'lim
                    </Select.Option>
                </Select>
                <div className="flex sm:items-center justify-end">
                    <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
                        <PlusOutlined />
                        Foydalanuvchi yaratish
                    </Button>
                </div>
            </div>
            <Create modalData={modalData} setModalData={setModalData} />
            <ContainerAll
                className="my-2"
                url={"/user/signup/"}
                queryKey={"users"}
            >
                {({ items, isLoading, meta }) => {
                    const data = items?.filter(item => item?.status?.includes(status))
                    return (
                        <>
                            <div className='h-[92%] w-full overflow-y-auto'>
                                <Table
                                    meta={meta}
                                    items={data?.reverse()}
                                    isLoading={isLoading}
                                    columns={columns}
                                    hasDelete={true}
                                    deleteAction={(row) => deleteConfirm(get(row, "id"))}
                                    updateAction={(row) => setModalData({ isOpen: true, data: row })}
                                    hasUpdate={false}
                                    hasPagination={false}
                                    customPagination={false}
                                    hasContent={false}
                                    contentAction={(row) => { }}
                                />
                            </div>
                        </>
                    )
                }}
            </ContainerAll>
        </div>
    )
}

export default index