import React from 'react'
import IconImg from 'assets/images/jpg/images.png'
import AyolIconImg from 'assets/images/jpg/ayol-images.png'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'services/api'
import { useEffect } from 'react'
import { Button, Select } from 'antd'
import {
    ArrowLeftOutlined
} from "@ant-design/icons";
import IconJami from 'assets/images/png/list.png'
import IconX from 'assets/images/png/xicon.png'
import IconDone from 'assets/images/png/doneicon.png'
import IconUpDown from 'assets/images/png/updown.png'
import IconTime from 'assets/images/png/time.png'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart } from "chart.js/auto";
import { Table } from 'components'
import Statistika from './statistika'
import { Triangle } from 'react-loader-spinner'

const xodim = () => {

    const { id } = useParams()
    const [data, setData] = useState({})
    const [allStatistic, setAllStatistic] = useState([])
    const [time_statistic, setTime_statistic] = useState([])
    const [xatoMahsulot, setXatoMahsulot] = useState({})
    const [statistic, setStatistic] = useState([])
    const [ishTuri, setIshTuri] = useState([])
    const [bulimlar, setBulimi] = useState([])
    const [UpDown, setUpDown] = useState(false)
    const [modalData, setModalData] = useState({ isOpen: false, data: null })
    const [select, setSelect] = useState("")

    const getData = async () => {
        const data = await api.get(`/user/xodim/${id}`)
        setData(data?.data?.data)
        setAllStatistic(data?.data?.all_statistic)
        setStatistic(data?.data?.statistic)
        setXatoMahsulot(data?.data?.mahsulot_xato_soni)
        setTime_statistic(data?.data?.time_statistic)
    }

    const getIshTuri = async () => {
        const data = await api.get("/post/ish_turi/")
        setIshTuri(data?.data)
    }

    const getBulim = async () => {
        const dataBulim = await api.get("/post/bulim/")
        setBulimi(dataBulim?.data)
    }

    useEffect(() => {
        getData()
        getIshTuri()
        getBulim()
    }, [])

    const navigate = useNavigate()

    let xatoStatistika = {
        data: {
            labels: statistic?.map(item => item.mahsulot_name),
            datasets: [
                {
                    data: statistic?.map(item => item.xato_soni),
                    label: "Soni",
                    backgroundColor: ["#ef9cda", "#e6e6ea", "#a68a64", "#4AFA9C", "#E6FA62", "#6288FA", "#3a86ff", "#4f772d", "#fcca46", "#606c38", "#a8dadc", "#fe7f2d"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    let butunStatistika = {
        data: {
            labels: statistic.map(item => item.mahsulot_name),
            datasets: [
                {
                    data: statistic.map(item => item.butun_soni),
                    label: "Soni",
                    backgroundColor: ["#ef9cda", "#e6e6ea", "#a68a64", "#4AFA9C", "#E6FA62", "#6288FA", "#3a86ff", "#4f772d", "#fcca46", "#606c38", "#a8dadc", "#fe7f2d"],

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
            labels: [`Jami xato foizi: ${allStatistic?.Xato_foizi}%`, `Jami butun foizi: ${allStatistic?.Butun_foizi}%`],
            datasets: [
                {
                    data: [allStatistic?.Xato_foizi, allStatistic?.Butun_foizi],
                    label: "Foizi: ",
                    backgroundColor: ["red", "green"],

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

    const columns = [
        {
            title: "Mahsulot nomi",
            dataIndex: "mahsulot_name",
            key: "mahsulot_name"
        },
        {
            title: "Xato mahsulot soni",
            dataIndex: "xato_soni",
            key: "xato_soni"
        },
        {
            title: "Butun mahsulot soni",
            dataIndex: "butun_soni",
            key: "butun_soni"
        },
        {
            title: "Jami mahsulotlar soni",
            dataIndex: "jami",
            key: "jami",
            render: (_, row) => {
                return (
                    <span>{row?.xato_soni + row?.butun_soni}</span>
                )
            }
        },
        {
            title: "Statistikasi",
            dataIndex: "korish",
            key: "korish",
            render: (_, row) => {
                return (
                    <Button
                        onClick={() => setModalData({ isOpen: true, data: row })}
                        className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80'
                        type='ghost'
                    >
                        Statistika
                    </Button>
                )
            }
        }
    ]

    // <Button
    //                 // className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80'
    //                 // type='ghost'
    //                 onClick={() => setUpDown(prev => !prev)}
    //             >
    //                 <img src={IconUpDown} className={`w-[25px] h-[25px] mx-1 ${UpDown && "rotate-[180deg]"}`} alt="" />
    //                 {UpDown ? "Yuqoridan pastga" : "Pastdan yuqoriga"}
    //             </Button>

    return (
        <div className='w-full h-full'>
            <Statistika modalData={modalData} setModalData={setModalData} />
            <div className="my-2 flex items-center justify-between">
                <Button type='primary' onClick={() => navigate(-1)}>
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
                    <div className='w-full h-[87vh] overflow-y-auto'>
                        <div className='w-[98%] mx-auto h-[100vh] rounded-2xl sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] bg-[#107C7F] flex flex-col items-center justify-center mt-2'>
                            <h1 className='text-white mt-3 w-full px-10 text-center'>Xodim xaqida ma'lumot: <hr /></h1>
                            <div className='flex flex-col sm:flex-row w-full h-full gap-4 mx-auto'>
                                <div className='w-[95%] mx-auto sm:w-[40%] h-full flex items-center justify-center bg-white sm:bg-[#107C7F] rounded-br-[50%] rounded-bl-[50%] rounded-tl-[5%] rounded-tr-[5%] '>
                                    <div className='w-[250px] h-[250px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px] 2xl:w-[370px] 2xl:h-[370px] rounded-[50%] bg-[#107C7F] sm:bg-white p-2'>
                                        {/* <img src={data.photo !== "/media/base.jpg" ? `https://zavod.pythonanywhere.com/${data?.photo}` : data.gender == "Erkak" ? IconImg : AyolIconImg} alt="" className='w-full h-full rounded-[50%] bg-white' /> */}
                                        <img src={data.photo !== "/media/default.jpg" ? `https://hisobot.pythonanywhere.com/${data?.photo}` : data.gender == "Erkak" ? IconImg : AyolIconImg} alt="" className='w-full h-full rounded-[50%] bg-white' />
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
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white", borderTop: "1px solid white" }}>
                                                <th className="text-left py-2">Xodim ID raqami:</th>
                                                <td>
                                                    {data?.id_raqam?.length > 0 ? (
                                                        data?.id_raqam
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Ismi:</th>
                                                <td>
                                                    {data?.first_name?.length > 0 ? (
                                                        data?.first_name
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Familyasi:</th>
                                                <td>
                                                    {data?.last_name?.length > 0 ? (
                                                        data?.last_name
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Telefon raqami:</th>
                                                <td>
                                                    {data?.phone?.length > 0 ? (
                                                        data?.phone
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Genderi:</th>
                                                <td>
                                                    {data?.gender?.length > 0 ? (
                                                        data?.gender
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Bo'limi:</th>
                                                <td>
                                                    {data?.bulimi ? (
                                                        bulimlar?.map?.((i) => i.id === data?.bulimi && i.name)
                                                    ) : (
                                                        <em>Kiritilmagan</em>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className="border border-red-600" style={{ borderBottom: "1px solid white" }}>
                                                <th className="text-left py-2">Ish turi:</th>
                                                <td>
                                                    {data?.ish_turi?.length > 0 ? (
                                                        <div className='flex items-start justify-start gap-4 flex-wrap'>
                                                            {
                                                                data?.ish_turi?.map((item, ind) => {
                                                                    return (
                                                                        <span key={ind}>{ishTuri?.map?.((i) => i.id === item && i.name)}</span>
                                                                    )
                                                                })
                                                            }
                                                        </div>
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
                                                    allStatistic?.Jami_butun + allStatistic?.Jami_xato :
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
                                            <h4>Jami xatolar:</h4>
                                            <h1>Soni: {
                                                select === "" ?
                                                    allStatistic?.Jami_xato :
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
                            <div className='w-[250px] h-[120px] shadow-md shadow-slate-500 border border-solid border-white p-1 px-6 py-3 rounded-2xl bg-[#107C7F] text-white'>
                                <div className='w-full flex items-center gap-4'>
                                    <div className='w-[65%]'>
                                        <div className='flex flex-col'>
                                            <h4>Jami butunlar:</h4>
                                            <h1>Soni: {
                                                select === "" ?
                                                    allStatistic?.Jami_butun :
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
                                            <h4>Ish vaqti:</h4>
                                            <h1>{
                                                select === "" ?
                                                    0 :
                                                    select === "1 year" ?
                                                        time_statistic?.[0]?.data?.[0]?.ish_vaqti :
                                                        select === "6 months" ?
                                                            time_statistic?.[1]?.data?.[0]?.ish_vaqti :
                                                            select === "3 months" ?
                                                                time_statistic?.[2]?.data?.[0]?.ish_vaqti :
                                                                select === "1 months" ?
                                                                    time_statistic?.[3]?.data?.[0]?.ish_vaqti :
                                                                    select === "1 week" ?
                                                                        time_statistic?.[4]?.data?.[0]?.ish_vaqti :
                                                                        select === "1 day" &&
                                                                        time_statistic?.[5]?.data?.[0]?.ish_vaqti
                                            } soat</h1>
                                        </div>
                                    </div>
                                    <div className='w-[25%] flex flex-col items-center justify-center'>
                                        <div className='rounded-full cursor-pointer w-[80px] h-[80px] p-1 bg-white'>
                                            <div className='w-full h-full bg-slate-200 transition-all hover:bg-slate-300 rounded-full flex items-center justify-center'>
                                                <img src={IconTime} className={"w-[90%] h-[90%] "} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-8">
                            <div className='w-full h-full flex flex-col lg:flex-col items-center justify-center gap-4 lg:gap-8'>
                                <div className='w-[95%] mx-auto lg:w-[70%] h-full flex flex-col items-center justify-center'>
                                    <h1 className="text-center">Jami mahsulotlar foizi</h1>
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
                                <div className='w-[95%] mx-auto lg:w-[70%] h-full flex flex-col items-center justify-center'>
                                    <h1 className='text-center'>Xato mahsulotlar statistikasi</h1>
                                    <Bar options={options} data={xatoStatistika?.data} />
                                </div>
                                <div className='w-[95%] mx-auto my-4 lg:my-0 lg:w-[70%] h-full flex flex-col items-center justify-center'>
                                    <h1 className='text-center'>Butun Mahsulotlar statistikasi</h1>
                                    <Bar options={options} data={butunStatistika.data} />
                                </div>
                            </div>
                        </div>
                        <div className="my-8">
                            <Table
                                items={statistic}
                                columns={columns}
                            />
                        </div>
                    </div> : <div className='w-full h-[80%] flex items-center justify-center'>
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

export default xodim