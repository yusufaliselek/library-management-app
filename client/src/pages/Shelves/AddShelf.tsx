import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { LibraryApi } from '../../api/libraryApi';
import Toast from '../../components/Toast';

const shelfInfoLabel = [
    {
        label: 'Raf Kodu',
        name: 'code',
    },
    {
        label: 'Raf Adı',
        name: 'name',
    },
    {
        label: 'Raf Açıklaması',
        name: 'description',
    },
];

const shelfParams = {
    code: '',
    name: '',
    description: '',
};


const AddShelf = () => {
    const navigate = useNavigate();

    // State tanımlamaları
    const [formValues, setFormValues] = useState(shelfParams);

    // Giriş alanlarındaki değerler değiştikçe state'i güncelleme
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const formSubmit = (e: any) => {
        e.preventDefault();

        LibraryApi.createShelf(formValues).then((response) => {
            console.log(response)
            navigate('/shelves')
        }).catch((err: any) => {
            // Eğer Unauthorized ise aşağıdaki kod çalışacak
            if (err.response.status === 401) {
                Toast.fire({
                    icon: 'error',
                    title: 'Yetkisiz Erişim',
                    text: 'Bu sayfayı görüntülemek için yetkiniz bulunmamaktadır.'
                })
                navigate('/login')
            }
        })

        setFormValues(shelfParams); // Formu sıfırlar
    };

    useEffect(() => {
        // Token kontrolü
        const token = localStorage.getItem('token');
        if (!token) {
            Toast.fire({
                icon: 'error',
                title: 'Yetkisiz Erişim',
                text: 'Bu sayfayı görüntülemek için yetkiniz bulunmamaktadır.'
            })
            navigate('/login')
        }
    }, []);

    return (
        <Content pageName='Raflar' content={
            <div className='w-full sm:h-[calc(100vh-4rem)]  bg-opacity-10 flex items-center justify-center'>
                {/* Shelve Informations */}
                <div className='w-2/3 h-3/4 '>
                    <form onSubmit={formSubmit} className='flex flex-col items-center'>
                        <div className='sm:w-5/6 2xl:w-1/2'>
                            <div className='w-fit cursor-pointer p-3 hover:bg-gray-200'
                                onClick={() => navigate("/shelves")}
                            >
                                <AiOutlineArrowLeft />
                            </div>
                        </div>
                        <h1 className='text-3xl font-mono text-center text-gray-600'>Raf Ekle</h1>
                        {
                            shelfInfoLabel.map((item) => (
                                <div className='sm:w-5/6 2xl:w-1/2 mt-4' key={item.name}>
                                    <label className='text-gray-600 font-mono'>{item.label}</label>
                                    <input
                                        id={item.name}
                                        name={item.name}
                                        type="text"
                                        className='w-full h-10 font-mono border border-gray-400 focus:border-green-600 focus:border-2 focus:outline-none px-3'
                                        onChange={handleChange}
                                    />
                                </div>
                            ))
                        }
                        <button type='submit' className='sm:w-4/6 2xl:w-1/3 h-10 font-mono border
                         border-gray-400 focus:outline-none px-3
                         bg-green-700 text-white hover:bg-green-600
                         transition duration-100 ease-in-out mt-4'>Kaydet</button>
                    </form>
                </div>
            </div>
        } />
    );
};

export default AddShelf;
