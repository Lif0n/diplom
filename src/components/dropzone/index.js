import { React, memo, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'

function StyledDropzone(props) {
  const {
    getRootProps,
    acceptedFiles,
    fileRejections,
    getInputProps,
  } = useDropzone({ accept: { 'text/csv': [], 'application/vnd.ms-excel': [], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : [] }, maxFiles: 1 });

  //const [label, setLabel] = useState('Перетащите необходимый файл или нажмите сюда')

  const label = useMemo(() => {
    console.log(acceptedFiles);
    console.log(fileRejections);
    if(fileRejections.length > 0){
      return 'Выбран файл неверного формата'
    }
    if(acceptedFiles.length > 0){
      return `Файл ${acceptedFiles[0].path} успешно загружен`
    }

    return 'Перетащите необходимый файл или нажмите сюда';

  }, [acceptedFiles, fileRejections])

  useEffect(() => {
    props.setFile(acceptedFiles[0])
  }, [acceptedFiles])

  return (
    <div className="dropzone-container">
      <div {...getRootProps({})}>
        <input {...getInputProps()} />
        <p>{label}</p>
      </div>
    </div>
  );
}

export default memo(StyledDropzone);