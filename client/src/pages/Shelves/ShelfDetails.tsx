import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../components/Content';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { LibraryApi } from '../../api/libraryApi';
import Toast from '../../components/Toast';

type ShelfParamType = {
    id: string;
    code: string;
    name: string;
    description: string;
};

type ShelfInfoKey = keyof ShelfParamType;

const shelfInfoLabel: { label: string; name: ShelfInfoKey }[] = [
    {
        label: 'Raf ID',
        name: 'id',
    },
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

const shelfParam: ShelfParamType = {
    id: '',
    code: '',
    name: '',
    description: '',
};


let shelfParts: any[] = []

const ShelfDetails = () => {
    const navigate = useNavigate();
    const params: any = useParams();
    const { id } = params;

    const [shelfInfo, setShelfInfo] = useState<ShelfParamType>(shelfParam);

    useEffect(() => {

        LibraryApi.getShelf(id).then((res) => {
            setShelfInfo(res);
            shelfParts = res.parts
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
        });
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setShelfInfo((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const formSubmit = (e: any) => {
        e.preventDefault();
        const fromSend = {
            id: shelfInfo.id,
            name: shelfInfo.name,
            code: shelfInfo.code,
            description: shelfInfo.description,
        };
        LibraryApi.updateShelf(fromSend).then((res) => {
            navigate('/shelves');
            Toast.fire({
                icon: 'success',
                title: 'Raf başarıyla güncellendi!',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((err) => {
            // Eğer Unauthorized ise aşağıdaki kod çalışacak
            if (err.response.status === 401) {
                Toast.fire({
                    icon: 'error',
                    title: 'Yetkisiz Erişim',
                    text: 'Bu sayfayı görüntülemek için yetkiniz bulunmamaktadır.'
                })
                navigate('/login')
                return;
            }
            Toast.fire({
                icon: 'error',
                title: 'Raf güncellenirken bir hata oluştu!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(err);
        });

    };

    const deleteAction = () => {
        LibraryApi.deleteShelf(shelfInfo.id).then((res) => {
            navigate('/shelves');
            Toast.fire({
                icon: 'success',
                title: 'Raf başarıyla silindi!',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((err) => {
            if (err.response.status === 401) {
                Toast.fire({
                    icon: 'error',
                    title: 'Yetkisiz Erişim',
                    text: 'Bu sayfayı görüntülemek için yetkiniz bulunmamaktadır.'
                })
                navigate('/login')
                return;
            }
            Toast.fire({
                icon: 'error',
                title: 'Raf silinirken bir hata oluştu!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(err);
        });
    }

    const deleteShelf = () => {
        const firstQuestion = window.confirm('Rafı silmek istediğinize emin misiniz?');
        if (firstQuestion) {
            if (shelfParts.length === 0) {
                const secondQuestion = window.confirm(`${shelfInfo.name} isimli rafı silmek istediğinize emin misiniz?`)
                if (secondQuestion) {
                    deleteAction();
                }
                return
            }
            const partsString = shelfParts.map((part) => part.name).join(', ')

            const secondQuestion = window.confirm(`${shelfInfo.name} isimli rafı silmek istediğinize emin misiniz? \n\n Bu rafın içindeki parçalar: ${partsString}`)
            if (secondQuestion) {
                deleteAction();
            }
        } else {
            return;
        }
    }

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
                                            {...(name === 'id' && { disabled: true })}
                                            required
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
                            onClick={deleteShelf}
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
