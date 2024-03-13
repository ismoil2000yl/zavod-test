import { Button, message } from 'antd'
import {
  PlusOutlined
} from "@ant-design/icons";
import { Table } from 'components';
import { get } from 'lodash';
import api from 'services/api';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePost } from 'crud';
import Create from './create'
import ContainerAll from 'moduls/container/all'
import Statistika from './statistika';

const index = () => {

  const [modalData, setModalData] = useState({ isOpen: false, data: null })
  const [messageApi, contextHolder] = message.useMessage();
  const [foizModal, setFoizModal] = useState({ isOpen: false, data: null })

  const queryClient = useQueryClient()
  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/post/mahsulot/${id}/`,
      method: "delete",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["mahsulot"] });
        messageApi.open({
          type: 'success',
          content: "Mahsulot o'chirib yuborildi"
        })
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: "Mahsulot o'chirilmadi!"
        })
      }
    })
  };

  const columns = [
    {
      title: "Mahsulot ID",
      dataIndex: "mahsulot_id",
      key: "mahsulot_id"
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "mahsulot_name",
      key: "mahsulot_name"
    },
    {
      title: "Butun soni",
      dataIndex: "butun_soni",
      key: "butun_soni"
    },
    {
      title: "Xato soni",
      dataIndex: "xato_soni",
      key: "xato_soni"
    },
    {
      title: "Foizi",
      dataIndex: "statistika",
      key: "statistika",
      render: (_, row) => {
        return (
          <Button onClick={() => setFoizModal({ isOpen: true, data: row })} className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80'
            type='ghost'>Statistika</Button>
        )
      }
    }
  ]

  return (
    <div className='w-full h-full'>
      {contextHolder}
      <div className="my-2 flex items-center justify-end">
        <Button onClick={() => setModalData({ isOpen: true, data: null })} type='primary'><PlusOutlined />Mahsulot yaratish</Button>
      </div>
      <Create modalData={modalData} setModalData={setModalData} />
      <Statistika foizModal={foizModal} setFoizModal={setFoizModal} />
      <ContainerAll
        className="my-2"
        url={"/post/mahsulot/"}
        queryKey={"mahsulot"}
      >
        {({ items, isLoading, meta }) => {
          return (
            <>
              <div className="my-2 h-[93%] w-full overflow-y-auto">
                <Table
                  items={items?.data}
                  isLoading={isLoading}
                  columns={columns}
                  hasDelete={true}
                  deleteAction={(row) => deleteConfirm(get(row, "id"))}
                  updateAction={(row) => setModalData({ isOpen: true, data: row })}
                  hasUpdate={true}
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