import React from 'react'
import Navbar from './Navbar'

const Content = ({ pageName, content }: { pageName: string, content: React.ReactNode }) => {
    return (
        <div>
            <Navbar pageName={pageName} />
            <div className='px-20'>
                {content}
            </div>
        </div>
    )
}

export default Content