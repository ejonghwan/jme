import React from 'react';

const ImageForm = ({ data }) => {
    
    return (
        <div>
            <img src={data.Images[0]} />
        </div>
    );
};

export default ImageForm;