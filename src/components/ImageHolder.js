import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

export default function ImageHolder(props) {
    const [loaded, setLoaded] = useState(false);

    function handleImageClick() {
        props.handleClick(loaded);
    }

    const loadingSpinnerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div>
            {loaded ? null :
                <div>
                    {/* <img className={props.className} src={process.env.PUBLIC_URL + '/loading.png'} alt='loading' /> */}
                    <Loader className={props.className} type="Grid" color="#fcba03" height={30} width={30} style={loadingSpinnerStyle} />
                </div>
            }
            <img
                className={props.className}
                style={loaded ? {} : { display: 'none' }}
                src={props.src}
                onLoad={() => setLoaded(true)}
                alt={props.full_name}
                onClick={handleImageClick}
            />
        </div>
    );
}