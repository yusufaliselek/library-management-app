import React from 'react'
import Content from '../../components/Content'
import { Link } from 'react-router-dom'

const NotFound = () => {
    const image404 = require('../../assets/images/404.png')
    const imageGroup = require('../../assets/images/Group.png')
    return (
        <Content pageName="Not Found" content={
            <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative">
                        <div className="absolute">
                            <div className="">
                                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                    Aradığınız sayfa bulunamadı.
                                </h1>
                                <p className="my-2 text-gray-800">Bunun için üzgünüz. Lütfen anasayfaya geri dönün.</p>
                                <Link to={"/"}><button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                                >Geri dön</button></Link>
                            </div>
                        </div>
                        <div>
                            <img src={image404} alt='404.png' />
                        </div>
                    </div>
                </div>
                <div>
                    <img src={imageGroup} alt='Group.png' />
                </div>
            </div>
        } />
    )
}

export default NotFound