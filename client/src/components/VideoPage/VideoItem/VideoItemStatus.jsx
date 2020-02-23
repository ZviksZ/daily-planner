import React  from 'react';
import styles from "../VideoPage.module.scss";

const VideoItemStatus = ({status}) => {
   return (
      <p>
         <span>Статус: </span>
         <span className={styles.status}>
               {
                  status === 'unviewed'
                     ? 'Непросмотренно'
                     : status === 'viewed'
                     ? 'Просмотренно'
                     : status === 'repeat'
                        ? 'На повтор' : 'Без статуса'
               }
            </span>
      </p>
   );
}

export default VideoItemStatus;
