import React from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import processUpload from '../utils/processUpload'

class UploadFile extends React.Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    if (!acceptedFiles) {
      window.alert('check file and try again')
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        const fileAsBinaryString = reader.result
        processUpload(fileAsBinaryString)
      }
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      reader.readAsBinaryString(acceptedFiles[0])
    }
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {
                'dropzone--isActive': isDragActive
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <p>Click to upload (or drag & drop)</p>
              )}
            </div>
          )
        }}
      </Dropzone>
    )
  }
}

export default UploadFile
