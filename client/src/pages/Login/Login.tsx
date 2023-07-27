import React, { useEffect, useState } from 'react'
import Toast from '../../components/Toast'
import { LibraryApi } from '../../api/libraryApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const [userForm, setUserForm] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        if (userForm.username.length < 3 || userForm.password.length < 3) {
            Toast.fire({
                icon: 'error',
                title: 'Hata!',
                text: 'Kullanıcı adı veya şifre hatalı.'
            })
            return;
        }
        LibraryApi.Login(userForm).then(res => {
            localStorage.setItem('token', res)
            navigate('/')
        }).catch(err => {
            Toast.fire({
                icon: 'error',
                title: 'Hata!',
                text: 'Kullanıcı adı veya şifre hatalı.'
            })
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    return (
        <div className='w-screen h-screen bg-gray-200 flex justify-center items-center sm:p-0 px-3'>
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <div className="font-medium self-center text-xl sm:text-2xl capitalize text-gray-800">Depo Yönetim Sistemi</div>
                <div className='w-full md:mt-4 mt-2'>
                    <label className='text-gray-600 font-mono'>Kullanıcı Adı</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className='w-full sm:h-10 h-8 font-mono border border-gray-400 focus:border-green-600 focus:border-2 focus:outline-none px-3'
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full md:mt-4 mt-2'>
                    <label className='text-gray-600 font-mono'>Şifre</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className='w-full sm:h-10 h-8 font-mono border border-gray-400 focus:border-green-600 focus:border-2 focus:outline-none px-3'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button onClick={handleLogin} className='w-full sm:h-10 h-8 font-mono border
                         border-gray-400 focus:outline-none px-3
                         bg-green-700 text-white hover:bg-green-600
                         transition duration-100 ease-in-out mt-4'>Giriş Yap</button>
                </div>
            </div>
        </div>
    )
}

export default Login