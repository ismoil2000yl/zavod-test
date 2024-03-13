import { Modal } from 'antd'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const create = ({ foizModal, setFoizModal }) => {

    let mahsulotStatistikasi = {
        data: {
            // labels: [`Jami xato foizi: ${foizModal?.data?.Xato_foizi}%`, `Jami butun foizi: ${foizModal?.data?.Butun_foizi}% `],
            datasets: [
                {
                    data: [foizModal?.data?.Xato_foizi, foizModal?.data?.Butun_foizi],
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
            open={foizModal?.isOpen}
            footer={false}
            destroyOnClose
            title={
                <div className='flex flex-col items-center justify-center gap-4 flex-wrap'>
                    <h3 className='text-center'>{foizModal?.data?.mahsulot_name}</h3>
                    <div className='flex gap-4'>
                        <h3 className='text-[red]'>Xato: {foizModal?.data?.Xato_foizi}%</h3>
                        <h3 className='text-[green]'>Butun: {foizModal?.data?.Butun_foizi}%</h3>
                    </div>
                </div>
            }
            onCancel={() => setFoizModal({ isOpen: false, data: null })}
        >
            <div className='w-full h-full'>
                <Doughnut data={mahsulotStatistikasi?.data} />
            </div>
        </Modal>
    )
}

export default create