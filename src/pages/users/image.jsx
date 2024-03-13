import { Modal } from 'antd'
import React from 'react'
import IconImg from 'assets/images/jpg/images.png'
import AyolIconImg from 'assets/images/jpg/ayol-images.png'

const image = ({ modalImage, setModalImage }) => {
    return (
        <Modal
            destroyOnClose
            open={modalImage.isOpen}
            title={`${modalImage?.data?.first_name} ${modalImage?.data?.last_name}`}
            footer={false}
            onCancel={() => setModalImage({ isOpen: false, data: null })}
        >
            <div className='w-full h-full'>
                {/* <img className='w-full h-full' src={modalImage?.data?.photo !== "https://zavod.pythonanywhere.com/media/base.jpg" ? `${modalImage?.data?.photo}` : modalImage?.data?.gender == "Erkak" ? IconImg : AyolIconImg} alt="" /> */}
                <img className='w-full h-full' src={modalImage?.data?.photo !== "/media/default.jpg" ? `https://hisobot.pythonanywhere.com/${modalImage?.data?.photo}` : modalImage?.data?.gender == "Erkak" ? IconImg : AyolIconImg} alt="" />
            </div>
        </Modal>
    )
}

export default image