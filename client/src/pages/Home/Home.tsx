import React from 'react'
import Content from '../../components/Content'

const Home = () => {
    window.document.title = "Ana Sayfa | Depo Yönetim Sistemi"
    return (
        <Content pageName="Ana Sayfa" content={<div>Home</div>} />
    )
}

export default Home