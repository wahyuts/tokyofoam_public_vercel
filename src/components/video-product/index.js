// import Image from "next/image";
// import ImageVideo from '../../public/assests/images/vidbanner.png';
import React, { useState } from 'react';
import YouTube from 'react-youtube';
// import Modal from "react-modal";
import styles from '../../../public/assets/css/ModalVideo.module.css';
import ReactResponsiveHook from '../../utils/ReactResponsiveHook';

const VideoProduct = () => {
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=syAucRv8Pcs&t=1s');
    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();

    // const handleClickImage = () => {
    //     setVideoUrl("https://www.youtube.com/watch?v=sAw-BuP5Vs8&t=1s")
    // }

    // const handleExerciseComplete = () => console.log("Do something");

    //Pake let videoCode jika link utube berasal dari api BE
    let videoCode;
    if (videoUrl) {
        videoCode = videoUrl.split('v=')[1].split('&')[0];
    }

    //Pake tembakVidCode jika sudah mengetahui code name video dari link utube nya
    // code name videonya bisa dilihat dari url utube  The video id is the string after v= and before the &.
    // let tembakVidCode = 'sAw-BuP5Vs8';
    let tembakVidCode = 'syAucRv8Pcs';

    // console.log("VIDCODE",videoCode); syAucRv8Pcs

    const checkElapsedTime = (e) => {
        // console.log(e.target.playerInfo.playerState);
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        if (currentTime / duration > 0.95) {
            setModalIsOpen(true);
        }
    };

    const opts = {
        playerVars: {
            height: '352',
            width: '426',
            autoplay: 0
            // origin: `https://${window.location.host}`
        }
    };

    let YoutubeMedia = (
        <div style={{ paddingTop: 10 }}>
            <div className={styles.ModalVideo}>
                <YouTube
                    videoId={videoCode}
                    // videoId={tembakVidCode}
                    containerClassName="embed embed-youtube"
                    onStateChange={(e) => checkElapsedTime(e)}
                    opts={opts}
                />
            </div>
        </div>
    );
    // return <>{YoutubeMedia}</>;

    return <>{isMobile ? (isTablet ? (isDesktop ? YoutubeMedia : YoutubeMedia) : YoutubeMedia) : null}</>;
};

export default VideoProduct;
