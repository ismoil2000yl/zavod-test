import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, message, Modal, Select, TimePicker, Upload } from 'antd';
import { get } from 'lodash'
import api from 'services/api';
import { useQueryClient } from '@tanstack/react-query';
import { FormOutlined, CloseOutlined, UploadOutlined, PhoneOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import IconErkak from 'assets/images/jpg/images.png'
import IconAyol from 'assets/images/jpg/ayol-images.png'

const create = ({ modalData, setModalData, getData }) => {

  const { myUser } = useSelector(state => state.myUser)

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [image, setImage] = useState(null)
  const [showImg, setShowImg] = useState(false)

  const onFinish = async (values) => {
    try {
      return (await api.patch(`/user/signup/${modalData?.data?.id}/`, values),
        setModalData({ isOpen: false, data: null }),
        messageApi.open({
          type: 'success',
          content: "Profil tahrirlandi"
        }),
        form.resetFields(),
        getData()
      )
    }
    catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: "Profil tahrirlanmadi!",
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      username: modalData?.data?.username || "",
      first_name: modalData?.data?.first_name || '',
      last_name: modalData?.data?.last_name,
      // photo: modalData?.data?.photo || "",
      phone: modalData?.data?.phone || '',
      gender: modalData?.data?.gender || ""
    });
  }, [modalData?.data]);

  const handlePreview = async (file) => {
    setPreview({ modal: true, url: file?.thumbUrl })
  }

  const handleRemove = () => {
    setImgIsShow(false)
  }

  const [imgIsShow, setImgIsShow] = useState(false)
  const [preview, setPreview] = useState({ modal: false, url: '' })

  useEffect(() => {
    if (image) {
      setImgIsShow(true)
    }
  }, [image])

  const customRequest = async ({ file, onSuccess, onError, onProgress }) => {
    const formData = new FormData()
    formData.append("photo", file)
    await api.patch(`/user/signup/${modalData?.data?.id}/`, formData).then(() => {
      messageApi.open({
        type: 'success',
        content: "Profil rasmi yangilandi"
      }),
        getData(),
        setModalData({ isOpen: false, data: null })
    })
  };

  return (

    <Drawer
      title={"Shaxsiy ma'lumotlarni tahrirlash"}
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
          name={"photo"}
        >
          <div className='w-full flex items-center flex-col'>
            <h4>Image:</h4>
            <div className='flex justify-center items-center gap-4'>
              {
                modalData?.data?.photo ?
                  <img className='w-[100px] h-[100px]' src={modalData?.data?.photo !== "/media/default.jpg" ? `https://hisobot.pythonanywhere.com/${modalData?.data?.photo}` : modalData?.data?.gender === "Erkak" ? IconErkak : IconAyol} alt="" />
                  : null
              }
              <Upload
                listType="picture-circle"
                onChange={(e) => setImage(e.file.originFileObj)}
                onPreview={handlePreview}
                onRemove={handleRemove}
                customRequest={customRequest}
              >
                {
                  imgIsShow ? null :
                    "+ Upload"
                }
              </Upload >
            </div>
            <Modal
              open={preview.modal}
              footer={null}
              onCancel={() => {
                setPreview({ modal: false, url: '' })
              }}
            >
              <img src={preview.url} alt="img" className="w-full" />
            </Modal>
          </div>
        </Form.Item>
        <Form.Item
          name="username"
          className='w-full'
        >
          <Input
            placeholder="Username"
            type='text'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name="first_name"
          className='w-full'
        >
          <Input
            placeholder="Ismi"
            type='text'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          className='w-full'
        >
          <Input
            placeholder="Familyasi"
            type='text'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name="phone"
          className='w-full'
        >
          <Input
            placeholder='901234567'
            style={{
              width: '100%',
            }}
            addonBefore={<span><PhoneOutlined className="site-form-item-icon rotate-90 mr-2" />+998</span>}
            type='number'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name={"gender"}
          className='w-full'
        >
          <Select
            className='py-2 w-full'
            placeholder={"Genderni tanlang"}
          >
            <Select.Option
              value={"Erkak"}
            >
              Erkak
            </Select.Option>
            <Select.Option
              value={"Ayol"}
            >
              Ayol
            </Select.Option>
          </Select>
        </Form.Item>
        <div className='w-full flex items-center justify-between'>
          <Button onClick={() => setModalData({ isOpen: false, data: null })} type='primary' danger><CloseOutlined />Bekor qilish</Button>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
              >
                <FormOutlined /> Tahrirlash
              </Button>
            )}
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
}

export default create