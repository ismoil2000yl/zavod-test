import { Avatar, Button, Checkbox, Input, message, Pagination, Radio, Select } from 'antd'
import { useState, useEffect } from 'react'
import Create from './create'
import ContainerAll from 'moduls/container/all'
import { Table } from 'components'
import api from 'services/api'
import { get } from 'lodash'
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'
import {
  FormOutlined
} from "@ant-design/icons";
import ModalImage from './image'
import { useNavigate } from 'react-router-dom'
import IconImg from 'assets/images/jpg/images.png'
import AyolIconImg from 'assets/images/jpg/ayol-images.png'

const index = () => {

  const navigate = useNavigate()

  const [modalData, setModalData] = useState({ isOpen: false, data: null })
  const [modalImage, setModalImage] = useState({ isOpen: false, data: null })

  const [ishTuri, setIshTuri] = useState([])
  const [bulimi, setBulimi] = useState([])

  const [xodimId, setXodimId] = useState("")
  const [selectIshTuri, setSelectIshTuri] = useState("")
  const [selectBulim, setSelectBulim] = useState("")

  const [allData, setAllData] = useState([])

  // const newData = allData?.filter(item => item.subject.name.includes(status))
  // const dayData = newData?.filter(item => item.payt.includes(selectDay))
  // const timeData = dayData?.filter(item => item.vaqt.vaqt.includes(selectTime))

  const getIshTuri = async () => {
    const data = await api.get("/post/ish_turi/")
    setIshTuri(data?.data)
  }

  const getBulim = async () => {
    const dataBulim = await api.get("/post/bulim/")
    setBulimi(dataBulim?.data)
  }

  const getXodim = async () => {
    const data = await api.get("/user/xodim/")
    setAllData(data?.data);
  }

  useEffect(() => {
    getIshTuri()
    getBulim()
    getXodim()
  }, [])

  const columns = [
    {
      title: "Xodim ID",
      dataIndex: "id_raqam",
      key: "id_raqam",
      render: (item, row) => {
        return <span className='cursor-pointer' onClick={() => navigate(`/xodimlar/${row.id}`)}>{item}</span>
      }
    },
    {
      title: "Rasmi",
      dataIndex: "photo",
      key: "photo",
      // render: (item, row) => {
      //   return <Avatar onClick={() => setModalImage({ isOpen: true, data: row })} className='shadow-sm cursor-pointer' size={"large"} src={item !== "https://zavod.pythonanywhere.com/media/base.jpg" ? `${item}` : row.gender == "Erkak" ? IconImg : AyolIconImg} />
      // }
      render: (item, row) => {
        return <Avatar onClick={() => setModalImage({ isOpen: true, data: row })} className='shadow-sm cursor-pointer' size={"large"} src={item !== "/media/default.jpg" ? `https://hisobot.pythonanywhere.com/${item}` : row.gender == "Erkak" ? IconImg : AyolIconImg} />
      }
    },
    {
      title: "Ismi",
      dataIndex: "first_name",
      key: "first_name",
      render: (item, row) => {
        return <span className='cursor-pointer' onClick={() => navigate(`/xodimlar/${row.id}`)}>{item}</span>
      }
    },
    {
      title: "Familyasi",
      dataIndex: "last_name",
      key: "last_name",
      render: (item, row) => {
        return <span className='cursor-pointer' onClick={() => navigate(`/xodimlar/${row.id}`)}>{item}</span>
      }
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      key: "phone",
      render: (item, row) => {
        return <span className='cursor-pointer' onClick={() => navigate(`/xodimlar/${row.id}`)}>{item}</span>
      }
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (item, row) => {
        return <span className='cursor-pointer' onClick={() => navigate(`/xodimlar/${row.id}`)}>{item}</span>
      }
    },
    {
      title: "Bulimi",
      dataIndex: "bulimi",
      key: "bulimi",
      render: (item, row) => {
        return <span className='cursor-pointer' onClick={() => navigate(`/xodimlar/${row.id}`)}>{bulimi?.map?.((i) => i.id === item && i.name)}</span>
      }
    },
    {
      title: "Batafsil",
      dataIndex: "batafsil",
      key: "batafsil",
      render: (item, row) => {
        return <Button onClick={() => navigate(`/xodimlar/${row.id}`)} className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80'
          type='ghost'>Batafsil</Button>
      }
    }
  ]

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient()
  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/user/xodim/${id}/`,
      method: "delete",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["xodim"] });
        messageApi.open({
          type: 'success',
          content: "O'quvchi o'chirib yuborildi"
        })
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: "O'quvchi o'chirilmadi...!"
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
          <FormOutlined />
          Xodim yaratish
        </Button>
      </div>
      <div className='w-full h-[90vh] overflow-y-auto'>
        <div className="w-full my-2 flex items-center justify-between flex-col gap-2 sm:flex-row">
          <div className="w-full flex items-center sm:items-start justify-center gap-4 flex-col sm:flex-row">
            <div className='w-full'>
              <span>Xodim ID:</span>
              <Input value={xodimId} onChange={(e) => setXodimId(e.target.value)} className='my-3 w-full' placeholder='Xodim ID sini kiriting' />
            </div>
            {/* <div className='w-full'>
              <span>Ish turi:</span>
              <Select
                onChange={(e) => setSelectIshTuri(e)}
                value={selectIshTuri}
                defaultValue={""}
                className='py-3 w-[100%]'
              >
                <Select.Option value={""}>
                  Xammasi
                </Select.Option>
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
            </div> */}
            <div className='w-full'>
              <span>Bo'limi:</span>
              <Select
                onChange={(e) => setSelectBulim(e)}
                value={selectBulim}
                defaultValue={""}
                className='py-3 w-[100%]'
              >
                <Select.Option
                  value={""}
                >
                  Xammasi
                </Select.Option>
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
            </div>
          </div>
        </div>
        <Create modalData={modalData} setModalData={setModalData} ishTuri={ishTuri} bulimi={bulimi} />
        <ContainerAll
          className="my-3"
          url={"/user/xodim/"}
          queryKey={"xodim"}
        >
          {({ items, isLoading, meta }) => {
            const data = items?.data?.filter(item => item?.id_raqam?.toUpperCase()?.toLowerCase().includes(xodimId))
            // const ishTuriData = data?.filter(item => item.ish_turi.includes(selectIshTuri))
            const bulimData = data?.filter(item => {
              if (selectBulim) {
                return item.bulimi == selectBulim
              }
              else {
                return item
              }
            })
            return (
              <>
                <div className='h-full w-full'>
                  <Table
                    meta={meta}
                    items={bulimData?.reverse()}
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