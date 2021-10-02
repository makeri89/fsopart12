import React from 'react'

const NotifySuccess = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='success'>
            {message}
        </div>
    )
}

export default NotifySuccess