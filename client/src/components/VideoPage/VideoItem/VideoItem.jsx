import React  from 'react';
import styles from '../VideoPage.module.scss'

const VideoItem = ({item, modalOpen}) => {
   return (
      <div className={styles.videoItem} id={item._id}>
         <img src={item.previewImg} alt=""
              className={styles.previewImg}
              onClick={() => modalOpen(item.link)}/>
         <h4>{item.name}</h4>
         <p>{item.channelTitle}</p>
         <p>Статус: {item.status}</p>
         <div>
            <select name="" id="">
               <option value='unviewed'>Непросмотренно</option>
               <option value='viewed'>Просмотренно</option>
               <option value='repeat'>На повтор</option>
            </select>
            <button>Удалить</button>
         </div>
      </div>
   );
}

export default VideoItem;
