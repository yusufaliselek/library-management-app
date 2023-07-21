import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../components/Content';
import { data } from '../../assets/data/data';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { LibraryApi } from '../../api/libraryApi';

type ShelfParamType = {
    _id: string;
    name: string;
    description: string;
};

type ShelfInfoKey = keyof ShelfParamType;

const shelfInfoLabel: { label: string; name: ShelfInfoKey }[] = [
    {
        label: 'Raf ID',
        name: '_id',
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

const shelfParam: ShelfParamType = {
    _id: '',
    name: '',
    description: '',
};

const ShelfDetails = () => {
    const navigate = useNavigate();
    const params: any = useParams();
    const { id } = params;

    const [shelfInfo, setShelfInfo] = useState<ShelfParamType>(shelfParam);

    useEffect(() => {

        LibraryApi.getShelf(id).then((res) => {
            setShelfInfo(res);
        });
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setShelfInfo((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const formSubmit = (e: any) => {
        e.preventDefault();
        console.log(shelfInfo);
    };

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
                            <h1 className='text-3xl font-mono text-center text-gray-600'>Rafı Düzenle</h1>
                        </div>
                        {
                            shelfInfoLabel.map((item) => {
                                const { name } = item;
                                return (
                                    <div className='sm:w-5/6 2xl:w-1/2 mt-4' key={item.name}>
                                        <label className='text-gray-600 font-mono'>{item.label}</label>
                                        <input
                                            name={item.name} // Add 'name' attribute to the input element
                                            id={item.name}
                                            type="text"
                                            value={shelfInfo[name]}
                                            className='w-full h-10 font-mono border border-gray-400 focus:border-green-600 focus:border-2 focus:outline-none px-3'
                                            onChange={handleChange}
                                            {...(name === '_id' && { disabled: true })}
                                        />
                                    </div>
                                );
                            })
                        }
                        <button type='submit' className='sm:w-4/6 2xl:w-1/3 h-10 font-mono border
                     border-gray-400 focus:outline-none px-3
                     bg-green-700 text-white hover:bg-green-600
                     transition duration-100 ease-in-out mt-4'
                        >
                            Kaydet
                        </button>
                        <button type='button' className='sm:w-4/6 2xl:w-1/3 h-10 font-mono border 
                        border-gray-400 focus:outline-none px-3
                        bg-red-700 text-white hover:bg-red-600
                        transition duration-100 ease-in-out mt-4'
                            onClick={() => {
                                const confirm = window.confirm('Rafı silmek istediğinize emin misiniz?');
                            }}
                        >
                            Sil
                        </button>
                    </form>
                </div>
            </div>
        }
        />
    );
};

export default ShelfDetails;
