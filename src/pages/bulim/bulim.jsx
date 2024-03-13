import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'services/api'
import {
    ArrowLeftOutlined
} from "@ant-design/icons";
import IconJami from 'assets/images/png/list.png'
import IconX from 'assets/images/png/xicon.png'
import IconDone from 'assets/images/png/doneicon.png'
import IconXisobot from 'assets/images/png/xisobot.png'
import IconXodimlar from 'assets/images/png/xodimlar.png'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart } from "chart.js/auto";
import IconImg from 'assets/images/jpg/images.png'
import AyolIconImg from 'assets/images/jpg/ayol-images.png'
import { Avatar, Button, Select } from 'antd'
import { Triangle } from 'react-loader-spinner'
import { Table } from 'components'

const bulim = () => {

    const { id } = useParams()
    const [data, setData] = useState([])
    const [mahsulot, setMahsulot] = useState([])
    const [statistic, setStatistic] = useState({})
    const [time_statistic, setTime_statistic] = useState([])
    const [xato, setXato] = useState([])
    const [xodimlar, setXodimlar] = useState([])
    const [user, setUser] = useState({})
    const [select, setSelect] = useState("")
    const navigate = useNavigate()
    const [bulimi, setBulimi] = useState([])

    const getData = async () => {
        const data = await api.get(`/post/bulim/${id}`)
        setData(data?.data?.data)
        setMahsulot(data?.data?.mahsulot)
        setStatistic(data?.data?.statistic)
        setTime_statistic(data?.data?.time_statistic)
        setXato(data?.data?.xato)
        setXodimlar(data?.data?.xodimlar)
    }

    const getUsers = async () => {
        const userData = await api.get(`/user/signup/${data?.user}`)
        setUser(userData?.data)
    }

    const getBulim = async () => {
        const dataBulim = await api.get("/post/bulim/")
        setBulimi(dataBulim?.data)
    }

    useEffect(() => {
        getData()
        getBulim()
    }, [])

    useEffect(() => {
        getUsers()
    }, [data])

    let xatoStatistika = {
        data: {
            labels: mahsulot?.map(item => item.mahsulot_name),
            datasets: [
                {
                    data: mahsulot?.map(item => item.xato_soni),
                    label: "soni",
                    backgroundColor: ["#ef9cda", "#e6e6ea", "#a68a64", "#4AFA9C", "#E6FA62", "#6288FA", "#3a86ff", "#4f772d", "#fcca46", "#606c38", "#a8dadc", "#fe7f2d"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let xatoStatistikaFoizi = {
        data: {
            labels: mahsulot?.map(item => item.mahsulot_name + ": " + item.Xato_foizi + "%"),
            datasets: [
                {
                    data: mahsulot?.map(item => item.Xato_foizi),
                    label: "foizi",
                    backgroundColor: ["#ef9cda", "#e6e6ea", "#a68a64", "#4AFA9C", "#E6FA62", "#6288FA", "#3a86ff", "#4f772d", "#fcca46", "#606c38", "#a8dadc", "#fe7f2d"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let butunStatistika = {
        data: {
            labels: mahsulot?.map(item => item.mahsulot_name),
            datasets: [
                {
                    data: mahsulot?.map(item => item.butun_soni),
                    label: "Soni",
                    backgroundColor: ["#ef9cda", "#e6e6ea", "#a68a64", "#4AFA9C", "#E6FA62", "#6288FA", "#3a86ff", "#4f772d", "#fcca46", "#606c38", "#a8dadc", "#fe7f2d"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let butunStatistikaFoizi = {
        data: {
            labels: mahsulot?.map(item => item.mahsulot_name + ": " + item.Butun_foizi + "%"),
            datasets: [
                {
                    data: mahsulot?.map(item => item.Butun_foizi),
                    label: "foizi",
                    backgroundColor: ["#ef9cda", "#e6e6ea", "#a68a64", "#4AFA9C", "#E6FA62", "#6288FA", "#3a86ff", "#4f772d", "#fcca46", "#606c38", "#a8dadc", "#fe7f2d"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let biryillikfoiz = {
        data: {
            labels: [`Jami xato foizi: ${time_statistic?.[0]?.data?.[0]?.Xato_foizi}%`, `Jami butun foizi: ${time_statistic?.[0]?.data?.[0]?.Butun_foizi}%`],
            datasets: [
                {
                    data: [time_statistic?.[0]?.data?.[0]?.Xato_foizi, time_statistic?.[0]?.data?.[0]?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let oltioylikfoiz = {
        data: {
            labels: [`Jami xato foizi: ${time_statistic?.[1]?.data?.[0]?.Xato_foizi}%`, `Jami butun foizi: ${time_statistic?.[1]?.data?.[0]?.Butun_foizi}%`],
            datasets: [
                {
                    data: [time_statistic?.[1]?.data?.[0]?.Xato_foizi, time_statistic?.[1]?.data?.[0]?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let uchoylikfoiz = {
        data: {
            labels: [`Jami xato foizi: ${time_statistic?.[2]?.data?.[0]?.Xato_foizi}%`, `Jami butun foizi: ${time_statistic?.[2]?.data?.[0]?.Butun_foizi}%`],
            datasets: [
                {
                    data: [time_statistic?.[2]?.data?.[0]?.Xato_foizi, time_statistic?.[2]?.data?.[0]?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let biroylikfoiz = {
        data: {
            labels: [`Jami xato foizi: ${time_statistic?.[3]?.data?.[0]?.Xato_foizi}%`, `Jami butun foizi: ${time_statistic?.[3]?.data?.[0]?.Butun_foizi}%`],
            datasets: [
                {
                    data: [time_statistic?.[3]?.data?.[0]?.Xato_foizi, time_statistic?.[3]?.data?.[0]?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let birxaftalikfoiz = {
        data: {
            labels: [`Jami xato foizi: ${time_statistic?.[4]?.data?.[0]?.Xato_foizi}%`, `Jami butun foizi: ${time_statistic?.[4]?.data?.[0]?.Butun_foizi}%`],
            datasets: [
                {
                    data: [time_statistic?.[4]?.data?.[0]?.Xato_foizi, time_statistic?.[4]?.data?.[0]?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let birkunlikfoiz = {
        data: {
            labels: [`Jami xato foizi: ${time_statistic?.[5]?.data?.[0]?.Xato_foizi}%`, `Jami butun foizi: ${time_statistic?.[5]?.data?.[0]?.Butun_foizi}%`],
            datasets: [
                {
                    data: [time_statistic?.[5]?.data?.[0]?.Xato_foizi, time_statistic?.[5]?.data?.[0]?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const options = {
        scales: {
            x: {  // x o'qi, chunki horizontal bar chart
                beginAtZero: true,
            },
            y: {  // y o'qi
                beginAtZero: true,
            },
        },
        indexAxis: 'y',  // Bu horizontal bar chart, shu sababli 'y'
    };

    let mahsulotFoizi = {
        data: {
            labels: [`Jami xato foizi: ${statistic?.Xato_foizi}%`, `Jami butun foizi: ${statistic?.Butun_foizi}%`],
            datasets: [
                {
                    data: [statistic?.Xato_foizi, statistic?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const columnsXatolar = [
        {
            title: "Xato ID",
            dataIndex: "xato_id",
            key: "xato_id"
        },
        {
            title: "Mahsulot nomi",
            dataIndex: "mahsulot_name",
            key: "mahsulot_name"
        },
        {
            title: "Xato nomi",
            dataIndex: "xato_name",
            key: "xato_name"
        },
        {
            title: "Xato soni",
            dataIndex: "xato_soni",
            key: "xato_soni"
        },
    ]

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
                return <span className='cursor-pointer' onClick={() => navigate(`/xodimlar/${row.id}`)}>+998{item}</span>
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

    return (
        <div className='w-full h-full'>
            <div className="flex items-center justify-between">
                <Button type='primary' onClick={() => navigate("/bulim")}>
                    <ArrowLeftOutlined />Orqaga
                </Button>
                <Select
                    className='py-2 w-[200px]'
                    placeholder={"Xammasi"}
                    onChange={(e) => setSelect(e)}
                    value={select}
                >
                    <Select.Option
                        value={""}
                    >
                        Xammasi
                    </Select.Option>
                    <Select.Option
                        value={"1 year"}
                    >
                        1 Yillik
                    </Select.Option>
                    <Select.Option
                        value={"6 months"}
                    >
                        6 Oylik
                    </Select.Option>
                    <Select.Option
                        value={"3 months"}
                    >
                        3 Oylik
                    </Select.Option>
                    <Select.Option
                        value={"1 months"}
                    >
                        1 Oylik
                    </Select.Option>
                    <Select.Option
                        value={"1 week"}
                    >
                        1 Xaftalik
                    </Select.Option>
                    <Select.Option
                        value={"1 day"}
                    >
                        1 Kunlik
                    </Select.Option>
                </Select>
            </div>
            {
                data.id ?
                    <div className='w-full h-[90vh] overflow-y-auto'>
                        <div className='w-[98%] mx-auto h-[100vh] rounded-2xl sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] bg-[#107C7F] flex flex-col items-center justify-center mt-2'>
                            <h1 className='text-white mt-3 w-full px-10 text-center'>Bo'lim boshlig'i xaqida ma'lumot: <hr /></h1>
                            <div className='flex flex-col sm:flex-row w-full h-full gap-4 mx-auto'>
                                <div className='w-[95%] mx-auto sm:w-[40%] h-full flex items-center justify-center bg-white sm:bg-[#107C7F] rounded-br-[50%] rounded-bl-[50%] rounded-tl-[5%] rounded-tr-[5%] '>
                                    <div className='w-[250px] h-[250px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px] 2xl:w-[370px] 2xl:h-[370px] rounded-[50%] bg-[#107C7F] sm:bg-white p-2'>
                                        {/* <img src={data.photo !== "/media/base.jpg" ? `https://zavod.pythonanywhere.com/${data?.photo}` : data.gender == "Erkak" ? IconImg : AyolIconImg} alt="" className='w-full h-full rounded-[50%] bg-white' /> */}
                                        <img src={user.photo !== "/media/default.jpg" ? `https://hisobot.pythonanywhere.com/${user?.photo}` : user.gender == "Erkak" ? IconImg : AyolIconImg} alt="" className='w-full h-full rounded-[50%] bg-white' />
                                    </div>
                                </div>
                                <div className='w-full sm:w-[60%] h-full'>
                                    <table className="w-[94%] mx-auto text-white mt-4">
                                        <thead>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Ismi:</th>
                                                <td>
                                                    {user?.first_name?.length > 0 ? (
                                                        user?.first_name
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Familyasi:</th>
                                                <td>
                                                    {user?.last_name?.length > 0 ? (
                                                        user?.last_name
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Telefon raqami:</th>
                                                <td>
                                                    {user?.phone?.length > 0 ? (
                                                        user?.phone
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Genderi:</th>
                                                <td>
                                                    {user?.gender?.length > 0 ? (
                                                        user?.gender
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Bulim nomi:</th>
                                                <td>
                                                    {data?.name?.length > 0 ? (
                                                        data?.name
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Bulim ID:</th>
                                                <td>
                                                    {data?.bulim_id?.length > 0 ? (
                                                        data?.bulim_id
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 w-full flex items-center justify-center gap-4 flex-wrap">
                            <div className='w-[250px] h-[120px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-6 py-3 rounded-2xl bg-[#107C7F] text-white'>
                                <div className='w-full flex items-center gap-4'>
                                    <div className='w-[65%]'>
                                        <div className='flex flex-col'>
                                            <h4>Jami mahsulotlar:</h4>
                                            <h1>Soni: {
                                                select === "" ?
                                                    statistic?.butun_soni?.soni + statistic?.xato_soni?.soni :
                                                    select === "1 year" ?
                                                        time_statistic?.[0]?.data?.[0]?.butun_soni +
                                                        time_statistic?.[0]?.data?.[0]?.xato_soni :
                                                        select === "6 months" ?
                                                            time_statistic?.[1]?.data?.[0]?.butun_soni +
                                                            time_statistic?.[1]?.data?.[0]?.xato_soni :
                                                            select === "3 months" ?
                                                                time_statistic?.[2]?.data?.[0]?.butun_soni + time_statistic?.[2]?.data?.[0]?.xato_soni :
                                                                select === "1 months" ?
                                                                    time_statistic?.[3]?.data?.[0]?.butun_soni + time_statistic?.[3]?.data?.[0]?.xato_soni :
                                                                    select === "1 week" ?
                                                                        time_statistic?.[4]?.data?.[0]?.butun_soni + time_statistic?.[4]?.data?.[0]?.xato_soni :
                                                                        select === "1 day" &&
                                                                        time_statistic?.[5]?.data?.[0]?.butun_soni + time_statistic?.[5]?.data?.[0]?.xato_soni
                                            } ta</h1>
                                        </div>
                                    </div>
                                    <div className='w-[25%] flex flex-col items-center justify-center'>
                                        <div className='rounded-full cursor-pointer w-[80px] h-[80px] p-1 bg-white'>
                                            <div className='w-full h-full bg-slate-200 transition-all hover:bg-slate-300 rounded-full flex items-center justify-center'>
                                                <img src={IconJami} className={"w-[90%] h-[90%] "} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[250px] h-[120px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-6 py-3 rounded-2xl bg-[#107C7F] text-white'>
                                <div className='w-full flex items-center gap-4'>
                                    <div className='w-[65%]'>
                                        <div className='flex flex-col'>
                                            <h4>Xisobotlar:</h4>
                                            <h1>Soni: {statistic?.hisobot_soni} ta</h1>
                                        </div>
                                    </div>
                                    <div className='w-[25%] flex flex-col items-center justify-center'>
                                        <div className='rounded-full cursor-pointer w-[80px] h-[80px] p-1 bg-white'>
                                            <div className='w-full h-full bg-slate-200 transition-all hover:bg-slate-300 rounded-full flex items-center justify-center'>
                                                <img src={IconXisobot} className={"w-[90%] h-[90%] "} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[250px] h-[120px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-6 py-3 rounded-2xl bg-[#107C7F] text-white'>
                                <div className='w-full flex items-center gap-4'>
                                    <div className='w-[65%]'>
                                        <div className='flex flex-col'>
                                            <h4>Xodimlar:</h4>
                                            <h1>Soni: {statistic?.xodim_soni?.xodim__count} ta</h1>
                                        </div>
                                    </div>
                                    <div className='w-[25%] flex flex-col items-center justify-center'>
                                        <div className='rounded-full cursor-pointer w-[80px] h-[80px] p-1 bg-white'>
                                            <div className='w-full h-full bg-slate-200 transition-all hover:bg-slate-300 rounded-full flex items-center justify-center'>
                                                <img src={IconXodimlar} className={"w-[90%] h-[90%] "} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[98%] mx-auto my-10">
                            <h2 className='text-center'>Jami mahsulotlar</h2>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-10'>
                                <div className='w-[260px] flex flex-col items-center justify-center gap-8'>
                                    <div className='w-[250px] h-[120px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-6 py-3 rounded-2xl bg-[#107C7F] text-white'>
                                        <div className='w-full flex items-center gap-4'>
                                            <div className='w-[65%]'>
                                                <div className='flex flex-col'>
                                                    <h4>Jami butunlar:</h4>
                                                    <h1>Soni: {
                                                        select === "" ?
                                                            statistic?.butun_soni?.soni :
                                                            select === "1 year" ?
                                                                time_statistic?.[0]?.data?.[0]?.butun_soni :
                                                                select === "6 months" ?
                                                                    time_statistic?.[1]?.data?.[0]?.butun_soni :
                                                                    select === "3 months" ?
                                                                        time_statistic?.[2]?.data?.[0]?.butun_soni :
                                                                        select === "1 months" ?
                                                                            time_statistic?.[3]?.data?.[0]?.butun_soni :
                                                                            select === "1 week" ?
                                                                                time_statistic?.[4]?.data?.[0]?.butun_soni :
                                                                                select === "1 day" &&
                                                                                time_statistic?.[5]?.data?.[0]?.butun_soni
                                                    } ta</h1>
                                                </div>
                                            </div>
                                            <div className='w-[25%] flex flex-col items-center justify-center'>
                                                <div className='rounded-full cursor-pointer w-[80px] h-[80px] p-1 bg-white'>
                                                    <div className='w-full h-full bg-slate-200 transition-all hover:bg-slate-300 rounded-full flex items-center justify-center'>
                                                        <img src={IconDone} className={"w-[90%] h-[90%] "} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[250px] h-[120px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-6 py-3 rounded-2xl bg-[#107C7F] text-white'>
                                        <div className='w-full flex items-center gap-4'>
                                            <div className='w-[65%]'>
                                                <div className='flex flex-col'>
                                                    <h4>Jami xatolar:</h4>
                                                    <h1>Soni: {
                                                        select === "" ?
                                                            statistic?.xato_soni?.soni :
                                                            select === "1 year" ?
                                                                time_statistic?.[0]?.data?.[0]?.xato_soni :
                                                                select === "6 months" ?
                                                                    time_statistic?.[1]?.data?.[0]?.xato_soni :
                                                                    select === "3 months" ?
                                                                        time_statistic?.[2]?.data?.[0]?.xato_soni :
                                                                        select === "1 months" ?
                                                                            time_statistic?.[3]?.data?.[0]?.xato_soni :
                                                                            select === "1 week" ?
                                                                                time_statistic?.[4]?.data?.[0]?.xato_soni :
                                                                                select === "1 day" &&
                                                                                time_statistic?.[5]?.data?.[0]?.xato_soni
                                                    } ta</h1>
                                                </div>
                                            </div>
                                            <div className='w-[25%] flex flex-col items-center justify-center'>
                                                <div className='rounded-full cursor-pointer w-[80px] h-[80px] p-1 bg-white'>
                                                    <div className='w-full h-full bg-slate-200 transition-all hover:bg-slate-300 rounded-full flex items-center justify-center'>
                                                        <img src={IconX} className={"w-[90%] h-[90%] "} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]'>
                                    <Doughnut data={
                                        select === "" ?
                                            mahsulotFoizi?.data :
                                            select === "1 year" ?
                                                biryillikfoiz?.data :
                                                select === "6 months" ?
                                                    oltioylikfoiz?.data :
                                                    select === "3 months" ?
                                                        uchoylikfoiz?.data :
                                                        select === "1 months" ?
                                                            biroylikfoiz?.data :
                                                            select === "1 week" ?
                                                                birxaftalikfoiz?.data :
                                                                select === "1 day" &&
                                                                birkunlikfoiz?.data
                                    } />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1>Xato mahsulotlar statistikasi</h1>
                            <div className="w-[95%] mt-24 my-12 h-[345px] mx-auto ">
                                <div className='w-full h-full flex flex-col sm:flex-row items-center justify-center gap-4 my-auto'>
                                    <div className='w-[300px] h-[300px] sm:w-[500px] sm:h-[330px]'>
                                        <Doughnut data={xatoStatistikaFoizi?.data} />
                                    </div>
                                    <div className='w-full h-full'>
                                        <Bar options={options} data={xatoStatistika?.data} />
                                    </div>
                                </div>
                            </div>
                            <h1 className='mt-10 sm:mt-0'>Butun mahsulotlar statistikasi</h1>
                            <div className="w-[95%] mt-24 my-12 h-[350px] mx-auto ">
                                <div className='w-full h-full flex flex-col sm:flex-row items-center justify-center gap-4 my-auto'>
                                    <div className='w-[300px] h-[300px] sm:w-[500px] sm:h-[330px]'>
                                        <Doughnut data={butunStatistikaFoizi?.data} />
                                    </div>
                                    <div className='w-full h-full'>
                                        <Bar options={options} data={butunStatistika?.data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full my-4'>
                            <h1 className='text-center'>Xato mahsulotlar:</h1>
                            <div className="my-2 h-full w-full overflow-y-auto">
                                <Table
                                    items={xato}
                                    columns={columnsXatolar}
                                />
                            </div>
                        </div>
                        <div className='w-full mt-16'>
                            <h1 className='text-center'>Xodimlar:</h1>
                            <div className="my-2 h-full w-full overflow-y-auto">
                                <Table
                                    items={xodimlar?.reverse()}
                                    columns={columns}
                                />
                            </div>
                        </div>
                    </div> :
                    <div className='w-full h-[80%] flex items-center justify-center'>
                        <Triangle
                            height="100"
                            width="100"
                            color="#070F1D"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
            }

        </div>
    )
}

export default bulim

// <div className='w-[95%] mx-auto my-4 lg:my-0 lg:w-[70%] h-full flex flex-col items-center justify-center'>
//                                     <h1 className='text-center'>Butun Mahsulotlar statistikasi</h1>
//                                     <Bar options={options} data={butunStatistika.data} />
//                                 </div>