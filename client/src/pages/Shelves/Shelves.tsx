import React, { useEffect, useState } from 'react'
import Content from '../../components/Content'
import { IShelf } from '../../types/Interfaces';
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { LibraryApi } from '../../api/libraryApi';


const Shelves = () => {
    window.document.title = "Raflar | Depo Yönetim Sistemi"
    const navigate = useNavigate();
    const [shelves, setShelves] = useState<IShelf[] | null>(null)
    const [searchShelves, setSearchShelves] = useState<IShelf[] | null>(null)

    const shelveColumns = [
        {
            header: 'Raf Kodu',
            accessor: 'code',
            width: "10%"
        },
        {
            header: 'Raf Adı',
            accessor: 'name',
            width: "25%"
        },
        {
            header: 'Raf Açıklaması',
            accessor: 'description',
            width: "45%"
        },
        {
            header: 'Parça Sayısı',
            accessor: 'parts',
            width: "10%"
        },
        {
            header: 'İşlemler',
            accessor: 'actions',
            width: "10%"
        }
    ]
    useEffect(() => {
        LibraryApi.getShelves().then((response) => {
            setShelves(response)
            setSearchShelves(response)
        })


    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            const value = e.target.value;
            if (value === "") {
                setSearchShelves(shelves)
            } else {
                const filteredShelves: any = shelves?.filter((shelve) => {
                    return shelve.name.toLowerCase().includes(value.toLowerCase())
                })
                setSearchShelves(filteredShelves)
            }
        }, 500)
    }

    return (
        <Content pageName='Raflar' content={
            <div className="flex flex-col">
                {/* SEARCH BAR */}
                <div className='w-full flex items-center justify-end py-3 gap-5'>
                    <div className='sm:max-w-md sm:w-50'>
                        <div className="relative flex items-center w-full h-12 rounded-sm border focus-within:border-green-300 bg-white overflow-hidden focus-within:text-green-300">
                            <div className="grid place-items-center h-full w-12 text-gray-300 font-mono">
                                <BiSearch size={20} />
                            </div>
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Arama Yapın"
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>
                    </div>
                    <div className='sm:max-w-md sm:w-50'>
                        <div className='bg-green-600 w-[100%] font-mono flex items-center justify-center text-gray-200 h-12 hover:text-white hover:bg-green-500 transition delay-75 cursor-pointer rounded-sm px-5'
                            onClick={() => navigate("/shelves/add")}
                        >
                            Yeni Raf Ekleyin
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg flex flex-col">
                    <div className='bg-gray-100 rounded-t-lg border'>
                        <div className='w-[calc(100%-18px)] px-5 py-3 font-sans font-medium'>
                            {
                                Array.from(shelveColumns).map((column, index) => {
                                    return (
                                        <div key={index} className='inline-block' style={{ width: column.width }}>
                                            {column.header}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='w-full rounded-b-lg overflow-y-scroll max-h-[calc(100vh-200px)]'>
                        {
                            searchShelves === null ?
                                <div className='flex items-center justify-center h-40'>
                                    <div className='text-gray-400 font-mono'>
                                        Yükleniyor...
                                    </div>
                                </div>
                                :
                                searchShelves.length > 0 ? Array.from(searchShelves).map((shelve, index) => {
                                    return (
                                        <div key={index} className={`flex flex-row items-center justify-between border-b py-2 font-mono text-sm px-5 hover:bg-slate-200 ${index % 2 === 0 ? "bg-slate-100" : ""}`}>
                                            <div className='inline-block ' style={{ width: shelveColumns[0].width }}>
                                                {shelve.code}
                                            </div>
                                            <div className='inline-block' style={{ width: shelveColumns[1].width }}>
                                                {shelve.name}
                                            </div>
                                            <div className='inline-block' style={{ width: shelveColumns[2].width }}>
                                                {shelve.description}
                                            </div>
                                            <div className='inline-block' style={{ width: shelveColumns[3].width }}>
                                                {shelve.parts}
                                            </div>
                                            <div className='inline-block' style={{ width: shelveColumns[4].width }}>
                                                <div className='bg-green-600 w-[70%]  flex items-center justify-center text-gray-200 py-1 hover:text-white cursor-pointer rounded-sm'
                                                    onClick={() => navigate("/shelves/" + shelve.id)}>
                                                    Düzenle
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                    :
                                    searchShelves.length === 0 &&
                                    <div className='flex items-center justify-center h-40'>
                                        <div className='text-gray-400 font-mono'>
                                            Veri Bulunamadı
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        } />
    )
}

export default Shelves;