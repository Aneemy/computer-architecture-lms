import React, { useState } from 'react';

const ImageUpload = ({ setPictures }) => {
    const [imageCaptionList, setImageCaptionList] = useState([]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        const updatedList = [...imageCaptionList];

        const loadImage = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        };

        const loadImages = async () => {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const image = await loadImage(file);
                updatedList.push({ img: image, caption: '' });
            }
            setImageCaptionList(updatedList);
            setPictures(updatedList);
        };

        loadImages();
    };

    const handleCaptionChange = (event, index) => {
        const updatedList = [...imageCaptionList];
        updatedList[index].caption = event.target.value;
        setImageCaptionList(updatedList);
        setPictures(updatedList);
    };

    const handleImageDelete = (index) => {
        const updatedList = [...imageCaptionList];
        updatedList.splice(index, 1);
        setImageCaptionList(updatedList);
        setPictures(updatedList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(imageCaptionList);
    };

    const renderImages = () => {
        return imageCaptionList.map((item, index) => (
            <div className="iu-container" key={index}>
                <img
                    src={item.img}
                    alt={`Image ${index}`}
                    className="image"
                    onClick={() => handleImageDelete(index)}
                />
                <input
                    type="text"
                    value={item.caption}
                    onChange={(event) => handleCaptionChange(event, index)}
                    placeholder="Подпись к картинке"
                    className="iu__caption"
                />
            </div>
        ));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple onChange={handleImageChange} />
                <div className="iu-grid">{renderImages()}</div>
            </form>
        </div>
    );
};

export default ImageUpload;



