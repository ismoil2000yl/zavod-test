import { Spin } from 'antd'
import React from 'react'

const loading = () => {
    return (
        <div className='w-full h-full relative'>
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </div>
        </div>
    )
}

export default loading