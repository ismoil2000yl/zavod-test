import { Modal } from 'antd'
import React from 'react'
import IconImg from 'assets/images/jpg/no-image.jpg'

const image = ({ modalImage, setModalImage }) => {
    return (
        <Modal
            destroyOnClose
            open={modalImage.isOpen}
            title={`Nuqsonli mahsulot rasmi`}
            footer={false}
            onCancel={() => setModalImage({ isOpen: false, data: null })}
        >
            <div className='w-full h-full'>
                {/* <img className='w-full h-full' src={modalImage?.data?.photo[0]?.photo !== "/media/null" ? `https://zavod.pythonanywhere.com/${modalImage?.data?.photo[0]?.photo}` : IconImg} alt="" /> */}
                <img className='w-full h-full' src={modalImage?.data?.photo[0]?.photo !== "/media/null" ? `https://hisobot.pythonanywhere.com/${modalImage?.data?.photo[0]?.photo}` : IconImg} alt="" />
            </div>
        </Modal>
    )
}

export default image