import React  from 'react';
import styles from '../VideoPage.module.scss'

type Props = {
   link: string
   closeModal: () => void
}

const VideoModal: React.FC<Props> = ({link, closeModal}) => {
   return (
      <div className={styles.videoModal}>
         <div className={styles.videoWrap}>
            <iframe src={link}
                    title="daily-planner video"
                    width="560" height="315"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />
         </div>
         <div className={styles.closeModal} onClick={closeModal}/>
      </div>
   );
}

export default VideoModal;
