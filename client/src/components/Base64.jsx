import React from 'react'
import FileBase64 from 'react-file-base64'

const Base64 = ({ onDone }) => {
    return (
        <FileBase64 multiple={false} onDone={onDone} />
    )
}

export default Base64