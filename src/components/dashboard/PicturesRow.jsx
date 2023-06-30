import React, {useEffect, useState} from "react";
import axios from "axios";

const PicturesRow = (props)=>{
    const [questionImages, setQuestionImages] = useState([]);

    useEffect(() => {
        if (props.array !== null) {
            getImagesForQuestion(props.array, props.gindex);
        }
    }, [props.array, props.gindex]);

    const getImagesForQuestion = async (array, gindex) => {
        const tempArray = new Array(array.length);
        await Promise.all(
            array.map(async (item, index) => {
                const image = await getImageData(item.img);
                tempArray[index] = image;
            })
        );
        const updatedImages = [...questionImages];
        updatedImages[gindex] = tempArray;
        setQuestionImages(updatedImages);
    };

    const getImageData = async (imageUrl) => {
        try {
            const response = await axios.get(imageUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    console.log(props.array)
    if (props.array !== null) {
        return (
            <div className="testconst__imagerow">
                {props.array.map((picture, index) => {
                    if (index % 3 === 0) {
                        return (
                            <div className="testconst__subrow" key={index}>
                                {[0, 1, 2].map((subIndex) => {
                                    const elementIndex = index + subIndex;
                                    if (props.array[elementIndex]) {
                                        return (
                                            <div className="testconst__image" key={elementIndex}>
                                                <div>
                                                    <img src={questionImages[props.gindex]?.[elementIndex]} alt="" />
                                                </div>
                                                <div>{props.array[elementIndex].caption}</div>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }


    return null;
}
export default PicturesRow;