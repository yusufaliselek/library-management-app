import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ pageName }: { pageName: string }) => {

    const navItems = [
        {
            name: 'Ana Sayfa',
            path: '/'
        },
        {
            name: 'Raflar',
            path: '/shelves'
        },
        {
            name: "Parçalar",
            path: '/parts'
        }
    ]

    return (
        <div className={`sm:h-16 h-40 flex bg-gray-200 w-full px-20 items-center shadow-md`} >
            <div className='flex gap-x-8'>
                {navItems.map((item) =>
                    <Link to={item.path}>
                        <div className={`px-2 py-1 font-mono
                ${item.name === pageName ? "bg-green-600 text-white font-normal" : " bg-green-700 text-gray-200 hover:bg-green-600 hover:text-gray-100"}
                transition duration-200 ease-in-out rounded-sm`}>
                            {item.name}
                        </div>
                    </Link>
                )}
            </div>
        </div >
    )
}

export default Navbar