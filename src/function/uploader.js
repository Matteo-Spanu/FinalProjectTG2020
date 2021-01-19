import React, { useState } from 'react';
export default function Uploader(){
    const [url, setUrl] = useState("");
    const [alt, setAlt] = useState("");

  const  handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData();
    formData.append('file', files[0]);

    formData.append('upload_preset', 'ybbaz9va');
    const options = {
      method: 'POST',
      body: formData,
    };
    

    return fetch('https://api.Cloudinary.com/v1_1/ilbrad/image/upload', options)
      .then(res => res.json())
      .then(res => {
        setUrl(res.secure_url);
         setAlt(res.original_filename)
        })
      .catch(err => console.log(err));
      }

return(<div>
    
    <form>
      <div >
        <input type="file"/>
      </div>

      <button type="button" className="btn" onClick={handleImageUpload}>Submit</button>
      <button type="button" className="btn widget-btn">Upload Via Widget</button>
    </form>
 
    <p>The resulting image will be displayed here</p>
    {url && (
      <img src={url} alt={alt} />
    )}

  </div>
)
}