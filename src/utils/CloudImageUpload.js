// import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
// import '../App.css';
// import '../style/common.style.css';

// const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
// const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

// class CloudinaryUploadWidget extends Component {
//   componentDidMount() {
//     var myWidget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: CLOUDNAME,
//         uploadPreset: UPLOADPRESET,
//       },
//       (error, result) => {
//         if (!error && result && result.event === 'success') {
//           console.log('Done! Here is the image info: ', result.info);
//           document.getElementById('uploadedimage').setAttribute('src', result.info.secure_url);
//           this.props.uploadImage(result.info.secure_url);
//         }
//       }, //https://cloudinary.com/documentation/react_image_and_video_upload
//     );
//     document.getElementById('upload_widget').addEventListener(
//       'click',
//       function () {
//         myWidget.open();
//       },
//       false,
//     );
//   }

//   render() {
//     return (
//       <Button id="upload_widget" size="sm" className="ml-2">
//         Upload Image +
//       </Button>
//     );
//   }
// }

// export default CloudinaryUploadWidget;

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CloudinaryContext, Image } from 'cloudinary-react';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const CloudImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState('');

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloudName: CLOUDNAME, uploadPreset: UPLOADPRESET, sources: ['local', 'url', 'camera'] }, (error, result) => {
      if (result.event === 'success') {
        setImage(result.info.secure_url);
        onUpload(result.info.secure_url);
      }
    });
  };

  return (
    <CloudinaryContext cloudName="your_cloud_name">
      <Button variant="contained" onClick={uploadWidget}>
        Upload Image
      </Button>
      {image && (
        <div>
          <Image publicId={image} width="500" crop="scale" />
        </div>
      )}
    </CloudinaryContext>
  );
};

export default CloudImageUpload;
