import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

const Image = ({uploadImage}) => {

      // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dlkytw4he'
    }
  });

  // cld.image returns a CloudinaryImage with the configuration set.
  const myImage = cld.image(uploadImage);
  console.log(myImage);
  

  // The URL of the image is: https://res.cloudinary.com/demo/image/upload/sample

  // Render the image in a React component.

  return (
    <div>
        <AdvancedImage cldImg={myImage} />
    </div>
  )
}

export default Image