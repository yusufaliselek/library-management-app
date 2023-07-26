import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Base64 from '../../components/Base64';
import { LibraryApi } from '../../api/libraryApi';
import { IShelf } from '../../types/Interfaces';
import MySwal from '../../components/Toast';

const shelfInfoLabel = [

    {
        label: 'Parça Adı',
        name: 'name',
    },
    {
        label: 'Parça Açıklaması',
        name: 'description',
    },
    {
        label: 'Parça Kodu',
        name: 'code',
    },
    {
        label: 'Parça Fiyatı',
        name: 'price',
    },
    {
        label: 'Parça Stok',
        name: 'quantity',
    }
];

const shelfParams = {
    name: '',
    description: '',
    code: '',
    price: '',
    quantity: '',
    shelfId: "-1",
    image: null
};


const AddPart = () => {
    const navigate = useNavigate();

    // State tanımlamaları
    const [formValues, setFormValues] = useState(shelfParams);
    const [shelves, setShelves] = useState<IShelf[]>([]);

    // Raf bilgilerini çekme
    useEffect(() => {
        LibraryApi.getShelves().then((response) => {
            setShelves(response)
        })
    }, []);


    // Giriş alanlarındaki değerler değiştikçe state'i güncelleme
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const formSubmit = (e: any) => {
        e.preventDefault();
        LibraryApi.createPart(formValues).then((res: any) => {
            MySwal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Parça başarıyla eklendi',
                timer: 2000,
                showConfirmButton: false
            })
            navigate("/parts");
        }).catch((err: any) => {
            MySwal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Parça eklenirken bir hata oluştu',
                timer: 2000,
                showConfirmButton: false
            })
        })
        setFormValues(shelfParams); // Formu sıfırlar
    };

    return (
        <Content pageName='Parçalar' content={
            <div className='w-full sm:h-[calc(100vh-4rem)]  bg-opacity-10 flex items-center justify-center'>
                {/* Shelve Informations */}
                <div className='w-2/3 h-3/4 '>
                    <form onSubmit={formSubmit} className='flex flex-col items-center'>
                        <div className='sm:w-5/6 2xl:w-1/2'>
                            <div className='w-fit cursor-pointer p-3 hover:bg-gray-200'
                                onClick={() => navigate("/parts")}
                            >
                                <AiOutlineArrowLeft />
                            </div>
                        </div>
                        <h1 className='text-3xl font-mono text-center text-gray-600'>Parça Ekle</h1>
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
                                        required
                                    />
                                </div>
                            ))
                        }
                        <div className='sm:w-5/6 2xl:w-1/2 mt-4' key={'shelfId'}>
                            <label className='text-gray-600 font-mono'>Raf Seçiniz</label>
                            <select onChange={handleChange} defaultValue={shelfParams.shelfId}
                                name="shelfId" className="w-full h-10 font-mono border border-gray-400 focus:border-green-600 focus:border-2 focus:outline-none px-3">
                                <option disabled value={"-1"}>Raf Seçiniz</option>
                                {
                                    Array.from(shelves).map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <Base64 onDone={(e: any) => {
                                setFormValues({
                                    ...formValues,
                                    image: e.base64
                                });
                            }} />
                        </div>
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

export default AddPart;
