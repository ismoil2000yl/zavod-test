import { Modal } from 'antd'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const create = ({ modalData, setModalData }) => {

    let mahsulotStatistikasi = {
        data: {
            // labels: [`Jami xato foizi: ${modalData?.data?.Xato_foizi}%`, `Jami butun foizi: ${modalData?.data?.Butun_foizi}% `],
            datasets: [
                {
                    data: [modalData?.data?.Xato_foizi, modalData?.data?.Butun_foizi],
                    label: "Foizi",
                    backgroundColor: ["red", "green"],

                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Modal
            open={modalData?.isOpen}
            footer={false}
            destroyOnClose
            title={
                <div className='flex flex-col items-center justify-center gap-4 flex-wrap'>
                    <h3 className='text-center'>{modalData?.data?.mahsulot_name}</h3>
                    <div className='flex gap-4'>
                        <h3 className='text-[red]'>Xato: {modalData?.data?.Xato_foizi}%</h3>
                        <h3 className='text-[green]'>Butun: {modalData?.data?.Butun_foizi}%</h3>
                    </div>
                </div>
            }
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            <div className='w-full h-full'>
                <Doughnut data={mahsulotStatistikasi?.data} />
            </div>
        </Modal>
    )
}

export default create