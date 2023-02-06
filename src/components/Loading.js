import React, { useState } from 'react'

import { Circle } from 'better-react-spinkit'
import Image from 'next/image'

const Loading = () => {
    return (
        <div className="grid place-items-center h-[100vh]">
            <div className="flex justify-center items-center flex-col">
                <Image
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                    alt='WhatsApp Logo'
                    height={200}
                    width={200}
                    style={{ marginBottom: 20 }}
                    priority={true}
                />
                <Circle color="#3CBC28" size={60} />
            </div>
        </div>
    )
}

export default Loading