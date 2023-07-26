import React from 'react'
import { Link } from 'react-router-dom'
import { MdShelves } from 'react-icons/md';
import { AiOutlineHome, AiOutlinePartition } from 'react-icons/ai';

const Navbar = ({ pageName }: { pageName: string }) => {

    const navItems = [
        {
            name: 'Ana Sayfa',
            path: '/',
            icon: <AiOutlineHome size={25} />
        },
        {
            name: 'Raflar',
            path: '/shelves',
            icon: <MdShelves size={25} />
        },
        {
            name: "Parçalar",
            path: '/parts',
            icon: <AiOutlinePartition size={25} />
        }
    ]

    return (
        <div className={`sm:h-16 h-40 flex bg-gray-200 w-full px-20 items-center shadow-md`} >
            <div className='flex gap-x-8'>
                {navItems.map((item) =>
                    <Link to={item.path} key={item.name}>
                        <div className={`px-2 py-1 font-mono flex items-center gap-x-2
                ${item.name === pageName ? "bg-green-600 text-white font-normal" : " bg-green-700 text-gray-200 hover:bg-green-600 hover:text-gray-100"}
                transition duration-200 ease-in-out rounded-sm`}>
                            <>{item.icon}</>
                            <>{item.name}</>
                        </div>
                    </Link>
                )}
            </div>
        </div >
    )
}

export default Navbar