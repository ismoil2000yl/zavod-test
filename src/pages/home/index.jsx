import { Button, Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'store/auth'
import {
  LogoutOutlined
} from "@ant-design/icons";

const index = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(signOut())
    navigate("/auth/sign-in")
  }

  const confirm = (e) => {
    handleLogout()
    // message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };

  return (
    <div className='w-full h-full p-10'>
      <Tooltip placement='bottom' title={"Profildan chiqish"}>
        <Popconfirm
          title="Profildan chiqish"
          description="Profildan chiqishni xoxlaysizmi?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Ha"
          cancelText="Yo'q"
        >
          <Button type='primary' danger><LogoutOutlined /> Profildan chiqish</Button>
        </Popconfirm>
      </Tooltip>
    </div>
  )
}

export default index