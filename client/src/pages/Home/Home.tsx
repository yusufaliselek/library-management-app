import React, { useEffect, useState } from 'react'
import Content from '../../components/Content'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { LibraryApi } from '../../api/libraryApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};


const Home = () => {
  const [data, setData] = useState(null)


  useEffect(() => {
    LibraryApi.GetHomeChart().then(res => {
      setData(res)
    })
  }, [])

  window.document.title = "Ana Sayfa | Depo Yönetim Sistemi"
  return (
    <Content pageName="Ana Sayfa" content={
      <div className='flex flex-col items-center py-5 gap-10'>
        <h1 className='text-xl font-mono text-blue-950 text-opacity-75'>Depo Yönetim Sistemi</h1>
        {
          data &&
          <Bar options={options} data={data} style={{maxHeight: "600px"}}/>
        }

      </div>
    } />
  )
}

export default Home