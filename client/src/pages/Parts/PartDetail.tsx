import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LibraryApi } from '../../api/libraryApi';
import Base64 from '../../components/Base64';
import Content from '../../components/Content';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { TbPhotoSensor2 } from 'react-icons/tb';
import ImageViewer from 'react-simple-image-viewer';
import { IShelf } from '../../types/Interfaces';

type PartParamType = {
    id: string;
    code: string;
    name: string;
    description: string;
    shelfName: string;
    shelfId: string;
    image?: string;
    price: string;
    quantity: string;
};

type PartInfoKey = keyof PartParamType;

const partInfoLabel: { label: string; name: PartInfoKey }[] = [
    {
        label: 'Parça ID',
        name: 'id',
    },
    {
        label: 'Parça Kodu',
        name: 'code',
    },
    {
        label: 'Parça Adı',
        name: 'name',
    },
    {
        label: 'Parça Açıklaması',
        name: 'description',
    },
    {
        label: 'Parça Fiyatı',
        name: 'price',
    },
    {
        label: 'Parça Miktarı',
        name: 'quantity',
    }
];

const partParams: PartParamType = {
    id: '',
    code: '',
    name: '',
    description: '',
    shelfId: '',
    shelfName: '',
    image: '',
    price: '',
    quantity: '',
};

const PartDetail = () => {

    const navigate = useNavigate();
    const params: any = useParams();
    const { id } = params;

    const [partInfo, setPartInfo] = useState<PartParamType>(partParams);
    const [shelves, setShelves] = useState<IShelf[]>([]);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {

        LibraryApi.getPart(id).then((res) => {
            setPartInfo(res);
            console.log(res);
        });
        LibraryApi.getShelves().then((res) => {
            setShelves(res);
        })
    }, [id]);

    const openImageViewer = useCallback(() => {
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setIsViewerOpen(false);
    };

    const formSubmit = (e: any) => {

    }

    const handleChange = (e: any) => {

    }

    return (
        <Content pageName='Parçalar' content={
            <div className='w-full sm:h-[calc(100vh-4rem)]  bg-opacity-10 flex items-center justify-center'>
                {/* Shelve Informations */}
                <div className='w-2/3 h-3/4 overflow-auto'>
                    <form onSubmit={formSubmit} className='flex flex-col items-center '>
                        <div className='sm:w-5/6 2xl:w-1/2 flex justify-between items-center'>
                            <div className='w-fit cursor-pointer p-3 hover:bg-gray-200'
                                onClick={() => navigate("/parts")}
                            >
                                <AiOutlineArrowLeft />
                            </div>
                            <div className='h-[40px] px-4 hover:bg-slate-200 cursor-pointer
                            flex items-center gap-3 text-sm text-green-700'
                            onClick={openImageViewer}
                            >
                                Parça Görüntüsü
                                <TbPhotoSensor2 size={25} />
                            </div>
                            {isViewerOpen && (
                                <ImageViewer
                                    src={[partInfo.image || '']}
                                    currentIndex={0}
                                    disableScroll={false}
                                    closeOnClickOutside={true}
                                    onClose={closeImageViewer}
                                />
                            )}
                        </div>
                        <h1 className='text-3xl font-mono text-center text-gray-600'>Parça Bilgilerini Düzenle</h1>
                        {
                            partInfoLabel.map((item) => (
                                <div className='sm:w-5/6 2xl:w-1/2 mt-4' key={item.name}>
                                    <label className='text-gray-600 font-mono'>{item.label}</label>
                                    <input
                                        id={item.name}
                                        name={item.name}
                                        value={partInfo[item.name]}
                                        type="text"
                                        className='w-full h-10 font-mono border border-gray-400 focus:border-green-600 focus:border-2 focus:outline-none px-3'
                                        onChange={handleChange}
                                        required
                                        {...(item.name === 'id' && { disabled: true })}
                                    />
                                </div>
                            ))
                        }
                        <div className='sm:w-5/6 2xl:w-1/2 mt-4' key={'shelfId'}>
                            <label className='text-gray-600 font-mono'>Raf Seçiniz</label>
                            <select onChange={handleChange} value={partParams.shelfId}
                                name="shelfId" className="w-full h-10 font-mono border border-gray-400 focus:border-green-600 focus:border-2 focus:outline-none px-3" required>
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
                                setPartInfo({
                                    ...partInfo,
                                    image: e.base64
                                });
                            }} />
                        </div>
                        <button type='submit' className='sm:w-4/6 2xl:w-1/3 h-10 font-mono border
                         border-gray-400 focus:outline-none px-3
                         bg-green-700 text-white hover:bg-green-600
                         transition duration-100 ease-in-out mt-4'>Kaydet</button>
                         <button type='button' className='sm:w-4/6 2xl:w-1/3 h-10 font-mono border
                            border-gray-400 focus:outline-none px-3
                            bg-red-700 text-white hover:bg-red-600
                            transition duration-100 ease-in-out mt-4'>Sil</button>

                    </form>
                </div>
            </div>
        } />
    );
}

export default PartDetail