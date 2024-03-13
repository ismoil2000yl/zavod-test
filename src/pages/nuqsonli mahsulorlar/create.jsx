import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, message, Modal, Select, TimePicker, Upload } from 'antd';
import { get } from 'lodash'
import api from 'services/api';
import { useQueryClient } from '@tanstack/react-query';
import { PlusOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const create = ({ modalData, setModalData, xodimlar, xatolar, mahsulotlar }) => {

  const { TextArea } = Input;
  const { myUser } = useSelector(state => state.myUser)

  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient()
  const [time, setTime] = useState("")
  const [image, setImage] = useState(null)
  const [showImg, setShowImg] = useState(false)

  const changeTime = (time, timeString) => [
    setTime(timeString)
  ]

  const formData = new FormData();

  const props = {
    listType: 'picture',
    beforeUpload(file) {
      // setImage(file);
      setShowImg(true)
      return new Promise((resolve) => {
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob((result) => resolve(result));
          };
        };
      });
    },
  };

  // console.log(time);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    if (modalData?.data) {
      try {
        return (await api.patch(`/post/missed/${modalData?.data?.id}/`, values),
          setModalData({ isOpen: false, data: null }),
          queryClient.invalidateQueries({ queryKey: ["missed"] }),
          messageApi.open({
            type: 'success',
            content: "Nuqsonli mahsulot tahrirlandi"
          }),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Nuqsonli mahsulot tahrirlanmadi!",
        });
      }
    }
    else {
      try {
        // values.ish_vaqti = time
        // values.user = myUser?.id
        // values.photo = image
        formData.append('photo', image)
        formData.append('ish_vaqti', values.ish_vaqti)
        formData.append('user', myUser?.id)
        formData.append('butun_soni', values.butun_soni)
        formData.append('xato', values.xato)
        formData.append('izoh', values.izoh)
        formData.append('mahsulot', values.mahsulot)
        formData.append('xodim', values.xodim)
        formData.append('xato_soni', values.xato_soni)

        return (await api.post('/post/missed/', formData),
          setModalData({ isOpen: false, data: null }),
          queryClient.invalidateQueries({ queryKey: ["missed"] }),
          messageApi.open({
            type: 'success',
            content: "Yangi Nuqsonli mahsulot qo'shildi"
          }),
          form.resetFields()
        )
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: "Nuqsonli mahsulot qo'shilmadi...!",
        });
      }
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      xodim: modalData?.data?.xodim?.id || 'Xodimni tanlang',
      user: modalData?.data?.user?.id || myUser?.id,
      xato: modalData?.data?.xato?.id || 'Xatoni tanlang',
      xato_soni: modalData?.data?.xato_soni || '',
      butun_soni: modalData?.data?.butun_soni,
      photo: modalData?.data?.photo || "",
      mahsulot: modalData?.data?.mahsulot?.id || 'Mahsulotni tanlang',
      izoh: modalData?.data?.izoh || '',
      ish_vaqti: modalData?.data?.ish_vaqti || ""
    });
  }, [modalData?.data]);

  return (

    <Drawer
      title={get(modalData, "data") ? "Xisobotni tahrirlash" : "Xisobot qoshish"}
      placement={"right"}
      closable={false}
      // onClose={() => setModalData({ isOpen: false, data: null })}
      open={modalData.isOpen}
    >
      {contextHolder}
      <Form
        form={form}
        className={"flex justify-center items-end flex-col gap-4"}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name={"xodim"}
          className='w-full'
        >
          <Select
            className='py-2 w-full'
            // mode="multiple"
            placeholder={"Xodimni tanlang"}
          >
            {
              xodimlar?.data?.map((item, idx) => {
                return (
                  <Select.Option
                    value={item.id}
                    key={idx}
                  >
                    {item.first_name + " " + item.last_name}
                  </Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name={"mahsulot"}
          className='w-full'
        >
          <Select
            className='py-2 w-full'
            // mode="multiple"
            placeholder={"Mahsulotni tanlang"}
          >
            {
              mahsulotlar?.data?.map((item, idx) => {
                return (
                  <Select.Option
                    value={item.id}
                    key={idx}
                  >
                    {item.mahsulot_name}
                  </Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name={"xato"}
          className='w-full'
        >
          <Select
            className='py-2 w-full'
            // mode="multiple"
            placeholder={"Xatoni tanlang"}
          >
            {
              xatolar?.map((item, idx) => {
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
        </Form.Item>
        <Form.Item
          name="xato_soni"
          className='w-full'
          rules={[
            {
              required: modalData?.data ? false : true,
              message: 'Xato soni kiritilmagan...!',
            },
          ]}
        >
          <Input
            placeholder="Xato soni"
            type='number'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name="butun_soni"
          className='w-full'
          rules={[
            {
              required: modalData?.data ? false : true,
              message: 'Butun soni kiritilmagan...!',
            },
          ]}
        >
          <Input
            placeholder="Butun soni"
            type='number'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name="izoh"
          className='w-full'
          rules={[
            {
              // required: modalData?.data ? false : true,
              message: 'Izoh kiritilmagan...!',
            },
          ]}
        >
          <TextArea
            placeholder="Izoh..."
            type='text'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name="ish_vaqti"
          className='w-full'
        >
          <Input
            placeholder="Ish vaqti"
            type='number'
            className='py-2'
          />
          {/* <TimePicker placeholder='Ish vaqtini tanlang' className='w-full py-2' format="HH:mm" value={time} onChange={changeTime} /> */}
        </Form.Item>
        <Form.Item
          name="photo"
          className='w-full'
        >
          <Upload onChange={(e) => setImage(e?.fileList[0].originFileObj)} className='w-full' onRemove={() => setShowImg(false)} {...props}>
            {
              !showImg &&
              <Button icon={<UploadOutlined />}>Upload</Button>
            }
          </Upload>
          {/* <input type="file" onChange={(e) => setImage(e.target.value)} /> */}
        </Form.Item>
        <div className='w-full flex items-center justify-between'>
          <Button onClick={() => setModalData({ isOpen: false, data: null })} type='primary' danger><CloseOutlined />Bekor qilish</Button>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
              >
                <PlusOutlined /> {modalData?.data ? "Yangilash" : "Qo'shish"}
              </Button>
            )}
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
}

export default create