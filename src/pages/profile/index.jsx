import React from 'react'
import IconImg from 'assets/images/jpg/images.png'
import AyolIconImg from 'assets/images/jpg/ayol-images.png'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'services/api'
import { useEffect } from 'react'
import { Button } from 'antd'
import {
    FormOutlined
} from "@ant-design/icons";
import { useSelector } from 'react-redux'
import IconUsername from 'assets/images/png/username.png'
import IconPhone from 'assets/images/png/phone.png'
import IconStatus from 'assets/images/png/lavozim.png'
import IconGirl from 'assets/images/png/girl.png'
import IconBoy from 'assets/images/png/boy.png'
import Edit from './edit'
import Password from './password'

const xodim = () => {

    const { myUser } = useSelector(state => state.myUser)
    const [data, setData] = useState({})
    const [modalData, setModalData] = useState({ isOpen: false, data: null })
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, data: null })

    const getData = async () => {
        const data = await api.get(`/user/signup/${myUser?.id}`)
        setData(data?.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate()


    return (
        <div className='w-full h-full overflow-y-auto'>
            <Edit
                modalData={modalData}
                setModalData={setModalData}
                getData={getData}
            />
            <Password
                modalData={passwordModal}
                setModalData={setPasswordModal}
                getData={getData}
            />
            <div className="my-2 flex items-center justify-end gap-4">
                <Button onClick={() => setPasswordModal({ isOpen: true, data: data })} className='bg-orange-600 hover:bg-orange-600 text-white hover:bg-opacity-80' type='ghost'>
                    <FormOutlined />
                    Parolni o'zgartirish
                </Button>
                <Button onClick={() => setModalData({ isOpen: true, data: data })} className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80' type='ghost'>
                    <FormOutlined />
                    Profilni tahrirlash
                </Button>
            </div>
            <div className='w-full h-[120vh] rounded-2xl sm:h-[410px] md:h-[410px] lg:h-[410px] xl:h-[470px] 2xl:h-[400px] bg-[#107C7F] flex flex-col items-center justify-center'>
                <h1 className='text-white mt-3 w-full px-10 text-center'>Mening profilim: <hr /></h1>
                <div className='flex flex-col sm:flex-row w-full h-full gap-10 sm:gap-4 mx-auto px-4 sm:px-0'>
                    <div className='w-full sm:w-[40%] h-full flex items-center justify-center bg-white sm:bg-[#107C7F] rounded-br-[50%] rounded-bl-[50%] rounded-tl-[5%] rounded-tr-[5%] '>
                        <div className='w-[250px] h-[250px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]  lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px] 2xl:w-[370px] 2xl:h-[370px] rounded-[50%] bg-[#107C7F] sm:bg-white p-2'>
                            {/* <img src={data.photo !== "/media/base.jpg" ? `https://zavod.pythonanywhere.com/${data?.photo}` : data.gender == "Erkak" ? IconImg : AyolIconImg} alt="" className='w-full h-full rounded-[50%] bg-white' /> */}
                            <img src={data.photo !== "/media/default.jpg" ? `https://hisobot.pythonanywhere.com/${data?.photo}` : data.gender == "Erkak" ? IconImg : AyolIconImg} alt="" className='w-full h-full rounded-[50%] bg-white' />
                            <h3 className="w-fit mx-auto text-center text-lg bg-white text-[#107C7F] rounded-md border p-2 shadow-lg">
                                {data?.first_name?.length > 0 ? data?.first_name : "Ism"}{" "}
                                {data?.last_name?.length > 0 ? data?.last_name : "Familiya"}
                            </h3>
                        </div>
                    </div>
                    <div className='w-full sm:w-[60%] h-full'>
                        <div className='w-full flex items-center justify-center gap-4 flex-wrap'>
                            <div className='w-[200px] h-[70px] lg:w-[210px] lg:h-[80px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-3 py-3 rounded-2xl bg-white bg-opacity-90 backdrop-blur-sm text-[black]'>
                                <div className="w-full flex items-start gap-2">
                                    <img src={IconUsername} className={"w-[40px] h-[40px] lg:w-[55px] lg:h-[55px] object-contain"} alt="" />
                                    <div className='flex flex-col items-start justify-center'>
                                        <h4>Username:</h4>
                                        <h3>{data?.username}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[200px] h-[70px] lg:w-[210px] lg:h-[80px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-3 py-3 rounded-2xl backdrop-blur-sm bg-white bg-opacity-90 text-black'>
                                <div className="w-full flex items-start gap-2">
                                    <img src={IconPhone} className={"w-[40px] h-[40px] lg:w-[55px] lg:h-[55px] object-contain"} alt="" />
                                    <div className='flex flex-col items-start justify-center'>
                                        <h4>Telefon raqami:</h4>
                                        <h3>+998{data?.phone}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[200px] h-[70px] lg:w-[210px] lg:h-[80px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-3 py-3 rounded-2xl backdrop-blur-sm bg-white bg-opacity-90 text-black'>
                                <div className="w-full flex items-start gap-2">
                                    <img src={IconStatus} className={"w-[40px] h-[40px] lg:w-[55px] lg:h-[55px] object-contain"} alt="" />
                                    <div className='flex flex-col items-start justify-center'>
                                        <h4>Status:</h4>
                                        <h3>{data?.status === 'Diretor' ? "Direktor" : data?.status}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[200px] h-[70px] lg:w-[210px] lg:h-[80px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-3 py-3 rounded-2xl backdrop-blur-sm bg-white bg-opacity-90 text-black'>
                                <div className="w-full flex items-start gap-2">
                                    <img src={data?.gender === "Erkak" ? IconBoy : IconGirl} className={"w-[40px] h-[40px] lg:w-[55px] lg:h-[55px] object-cover"} alt="" />
                                    <div className='flex flex-col items-start justify-center'>
                                        <h4>Gender:</h4>
                                        <h3>{data?.gender}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default xodim