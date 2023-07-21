import React, { useEffect, useState } from 'react'
import Content from '../../components/Content'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { LibraryApi } from '../../api/libraryApi';

interface Part {
  _id: number,
  code: string,
  name: string,
  description: string,
  quantity: string,
  shelfId: string
  image: string

}

const partColumns = [
  {
    header: 'Parça Kodu',
    accessor: 'code',
    width: "10%"
  },
  {
    header: 'Parça Adı',
    accessor: 'name',
    width: "20%"
  },
  {
    header: "Raf Adı",
    accessor: 'shelfId',
    width: "10%"
  },
  {
    header: 'Parça Açıklaması',
    accessor: 'description',
    width: "40%"
  },
  {
    header: 'Parça Sayısı',
    accessor: 'quantity',
    width: "10%"
  },
  {
    header: 'İşlemler',
    accessor: 'actions',
    width: "10%"
  }
]

const Parts = () => {

  const navigate = useNavigate();

  const [searchParts, setSearchParts] = useState<Part[] | null>(null)
  const [parts, setParts] = useState<Part[] | null>(null)

  useEffect(() => {
    LibraryApi.getParts().then((res: any) => {
      setParts(res)
      setSearchParts(res)
    })
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  return (
    <Content pageName="Parçalar" content={

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
              onClick={() => navigate("/parts/add")}
            >
              Yeni Parça Ekleyin
            </div>
          </div>
        </div>

        <div className="border rounded-lg flex flex-col">
          <div className='bg-gray-100 rounded-t-lg border'>
            <div className='w-[calc(100%-18px)] px-5 py-3 font-sans font-medium'>
              {
                Array.from(partColumns).map((column, index) => {
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
              searchParts === null ?
                <div className='flex items-center justify-center h-40'>
                  <div className='text-gray-400 font-mono'>
                    Yükleniyor...
                  </div>
                </div>
                :
                searchParts === undefined || (searchParts !== undefined && searchParts.length === 0) ?
                  <div className='flex items-center justify-center h-40'>
                    <div className='text-gray-400 font-mono'>
                      Veri Bulunamadı
                    </div>
                  </div>
                  :
                  searchParts && Array.from(searchParts).map((part, index) => {
                    return (
                      <div key={index} className={`flex flex-row items-center justify-between border-b py-2 font-mono text-sm px-5 hover:bg-slate-200 ${index % 2 === 0 ? "bg-slate-100" : ""}`}>
                        <div className='inline-block ' style={{ width: partColumns[0].width }}>
                          {part.code}
                        </div>
                        <div className='inline-block' style={{ width: partColumns[1].width }}>
                          {part.name}
                        </div>
                        <div className='inline-block' style={{ width: partColumns[2].width }}>
                          {part.shelfId}
                        </div>
                        <div className='inline-block' style={{ width: partColumns[3].width }}>
                          {part.description}
                        </div>
                        <div className='inline-block' style={{ width: partColumns[4].width }}>
                          {part.quantity}
                        </div>
                        <div className='inline-block' style={{ width: partColumns[5].width }}>
                          <div className='bg-green-600 w-[70%]  flex items-center justify-center text-gray-200 py-1 hover:text-white cursor-pointer rounded-sm'
                            onClick={() => navigate("/parts/" + part._id)}>
                            Düzenle
                          </div>
                        </div>
                      </div>
                    )
                  })
            }
          </div>
        </div>
      </div>

    } />
  )
}

export default Parts