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

const index = () => {

  const [modalData, setModalData] = useState({ isOpen: false, data: null })
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient()
  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/post/ish_turi/${id}/`,
      method: "delete",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ish_turi"] });
        messageApi.open({
          type: 'success',
          content: "Ish turi o'chirib yuborildi"
        })
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: "Ish turi o'chirilmadi!"
        })
      }
    })
  };

  const columns = [
    {
      title: "Ish ID",
      dataIndex: "ish_id",
      key: "ish_id"
    },
    {
      title: "Ish turi",
      dataIndex: "name",
      key: "name"
    }
  ]

  return (
    <div className='w-full h-full'>
      {contextHolder}
      <div className="my-2 flex items-center justify-end">
        <Button onClick={() => setModalData({ isOpen: true, data: null })} type='primary'><PlusOutlined />Ish turi yaratish</Button>
      </div>
      <Create modalData={modalData} setModalData={setModalData} />
      <ContainerAll
        className="my-2"
        url={"/post/ish_turi/"}
        queryKey={"ish_turi"}
      >
        {({ items, isLoading, meta }) => {
          return (
            <>
              <div className="my-2 h-[93%] w-full overflow-y-auto">
                <Table
                  items={items}
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