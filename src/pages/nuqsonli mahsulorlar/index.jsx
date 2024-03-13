import { Avatar, Button, Checkbox, Input, message, Pagination, Popover, Radio, Select } from 'antd'
import { useState, useEffect } from 'react'
import Create from './create'
import ContainerAll from 'moduls/container/all'
import { Table } from 'components'
import api from 'services/api'
import { get, truncate } from 'lodash'
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'
import {
  FormOutlined, PlusOutlined
} from "@ant-design/icons";
import ModalImage from './image'
import IconImg from 'assets/images/jpg/no-image.jpg'

const index = () => {

  const [modalData, setModalData] = useState({ isOpen: false, data: null })
  const [modalImage, setModalImage] = useState({ isOpen: false, data: null })

  const [xodimlar, setXodimlar] = useState([])
  const [users, setUsers] = useState([])
  const [xatolar, setXatolar] = useState([])
  const [mahsulotlar, setMahsulotlar] = useState([])

  const getXodimlar = async () => {
    const data = await api.get("/user/xodim/")
    setXodimlar(data?.data)
  }

  const getUsers = async () => {
    const dataUser = await api.get("/user/signup/")
    setUsers(dataUser?.data)
  }

  const getXatolar = async () => {
    const dataXato = await api.get("/post/xatolar/")
    setXatolar(dataXato?.data)
  }

  const getMahsulotlar = async () => {
    const dataMahsulot = await api.get("/post/mahsulot/")
    setMahsulotlar(dataMahsulot?.data)
  }

  useEffect(() => {
    getXodimlar()
    getUsers()
    getXatolar()
    getMahsulotlar()
  }, [])

  const columns = [
    {
      title: "Rasmi",
      dataIndex: "photo",
      key: "photo",
      // render: (item, row) => {
      //   return <Avatar onClick={() => setModalImage({ isOpen: true, data: row })} className='shadow-sm cursor-pointer' size={"large"} src={item[0]?.photo !== "/media/null" ? `https://zavod.pythonanywhere.com/${item[0]?.photo}` : IconImg} />
      // }
      render: (item, row) => {
        return <Avatar onClick={() => setModalImage({ isOpen: true, data: row })} className='shadow-sm cursor-pointer' size={"large"} src={item[0]?.photo !== "/media/null" ? `https://hisobot.pythonanywhere.com/${item[0]?.photo}` : IconImg} />
      }
    },
    {
      title: "Xodim ",
      dataIndex: "xodim",
      key: "xodim",
      render: (item, row) => {
        return <span onClick={() => { }}>{item.first_name + " " + item.last_name}</span>
      }
    },
    {
      title: "Tekshiruvchi ",
      dataIndex: "user",
      key: "user",
      render: (item, row) => {
        return <span onClick={() => { }}>{item.first_name + " " + item.last_name}</span>
      }
    },
    {
      title: "Xato",
      dataIndex: "xato",
      key: "xato",
      render: (item, row) => {
        return <span onClick={() => { }}>{item.name}</span>
      }
    },
    {
      title: "Xato soni",
      dataIndex: "xato_soni",
      key: "xato_soni",
      render: (item, row) => {
        return <span>{item}</span>
      }
    },
    {
      title: "Butun soni",
      dataIndex: "butun_soni",
      key: "butun_soni",
      render: (item, row) => {
        return <span onClick={() => { }}>{item}</span>
      }
    },
    {
      title: "Mahsulot",
      dataIndex: "mahsulot",
      key: "mahsulot",
      render: (item, row) => {
        return <span onClick={() => { }}>{item.name}</span>
      }
    },
    {
      title: "Ish vaqti",
      dataIndex: "ish_vaqti",
      key: "ish_vaqti",
      render: (item, row) => {
        return <span onClick={() => { }}>{item}</span>
      }
    },
    {
      title: "Izoh",
      dataIndex: "izoh",
      key: "izoh",
      render: (item, row) => {
        return <Popover className='cursor-pointer' title={item}>
          {truncate(item, { length: 10, omission: "..." })}
        </Popover>
      }
    }
  ]

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient()
  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/post/missed/${id}/`,
      method: "delete",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["missed"] });
        messageApi.open({
          type: 'success',
          content: "Ushbu ma'lumot o'chirib yuborildi"
        })
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: "Ma'lumot o'chirilmadi...!"
        })
      }
    })
  };
  return (
    <div className='w-full h-full'>
      <ModalImage modalImage={modalImage} setModalImage={setModalImage} />
      {contextHolder}
      <div className="my-2 flex items-center justify-end gap-4">
        <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
          <PlusOutlined />
          Qo'shish
        </Button>
      </div>
      <div className='w-full h-[90vh] overflow-y-auto'>
        <div className="w-full my-2 flex items-center justify-between flex-col gap-2 sm:flex-row">
        </div>
        <Create
          modalData={modalData}
          setModalData={setModalData}
          xodimlar={xodimlar}
          xatolar={xatolar}
          mahsulotlar={mahsulotlar}
        />
        <ContainerAll
          className="my-3"
          url={"/post/missed/"}
          queryKey={"missed"}
        >
          {({ items, isLoading, meta }) => {
            return (
              <>
                <div className='h-full w-full'>
                  <Table
                    meta={meta}
                    items={items?.reverse()}
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
                    hasChecked={false}
                    checkedAction={(row) => console.log(row)}
                  />
                </div>
              </>
            )
          }}
        </ContainerAll>
      </div>
    </div >
  )
}

export default index