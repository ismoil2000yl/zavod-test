import { Button, Input, message, Spin } from 'antd'
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
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const index = () => {

  const [modalData, setModalData] = useState({ isOpen: false, data: null })
  const [bulimId, setBulimId] = useState("")
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient()
  const { mutate: deletedHandler } = usePost()
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const getUsers = async () => {
    const data = await api.get("/user/signup/")
    setUsers(data?.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/post/bulim/${id}/`,
      method: "delete",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bulim"] });
        messageApi.open({
          type: 'success',
          content: "Bulim o'chirib yuborildi"
        })
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: "Bulim o'chirilmadi!"
        })
      }
    })
  };

  const columns = [
    {
      title: "Bulim ID",
      dataIndex: "bulim_id",
      key: "bulim_id",
      render: (item, row) => {
        return (
          <span className='cursor-pointer' onClick={() => navigate(`/bulim/${row.id}`)}>{item}</span>
        )
      }
    },
    {
      title: "Bo'lim nomi",
      dataIndex: "name",
      key: "name",
      render: (item, row) => {
        return (
          <span className='cursor-pointer' onClick={() => navigate(`/bulim/${row.id}`)}>{item}</span>
        )
      }
    },
    {
      title: "Bo'lim boshlig'i",
      dataIndex: "user",
      key: "user",
      render: (item, row) => {
        return (
          users.length ?
            <span className='cursor-pointer' onClick={() => navigate(`/bulim/${row.id}`)}>{users?.map?.((i) => i.id === item && i.first_name + " " + i.last_name)}</span>
            : <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                  }}
                  spin
                />
              }
            />
        )
      }
    },
    {
      title: "Batafsil",
      dataIndex: "batafsil",
      key: "batafsil",
      render: (item, row) => {
        return <Button onClick={() => navigate(`/bulim/${row.id}`)} className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80'
          type='ghost'>Batafsil</Button>
      }
    }
  ]

  return (
    <div className='w-full h-full'>
      {contextHolder}
      <div className="my-2 flex items-center justify-between">
        <Input value={bulimId} onChange={(e) => setBulimId(e.target.value)} className='my-3 w-[200px]' placeholder='Bulim ID sini kiriting' />
        <Button onClick={() => setModalData({ isOpen: true, data: null })} type='primary'><PlusOutlined />Bo'lim yaratish</Button>
      </div>
      <Create modalData={modalData} setModalData={setModalData} />
      <ContainerAll
        className="my-2"
        url={"/post/bulim/"}
        queryKey={"bulim"}
      >
        {({ items, isLoading, meta }) => {
          const data = items?.filter(item => item?.bulim_id?.toUpperCase()?.toLowerCase().includes(bulimId))
          return (
            <>
              <div className="my-2 h-[93%] w-full overflow-y-auto">
                <Table
                  items={data}
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