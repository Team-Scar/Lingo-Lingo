import React from 'react';
import axios from 'axios';

const PhotoUpload = ({setPhotosUrl}) => {
  const handlePhotosChange = (e) => {
    const {length} = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < length; i++) {
      formData.append('file', e.target.files[i]);
    }
    formData.append('upload_preset', 'LingoLingo');
    axios.post('https://api.cloudinary.com/v1_1/may6688/image/upload', formData)
    .then(res => setPhotosUrl(res.data.url));
  };

  return (
    <>
      <label>Upload a profile photo</label>
      <input type="file" onChange={handlePhotosChange}/>
    </>
  );
};

export default PhotoUpload;
