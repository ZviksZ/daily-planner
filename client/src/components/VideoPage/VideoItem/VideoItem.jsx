import React, {useState} from 'react';
import styles            from '../VideoPage.module.scss'

const VideoItem = ({item, modalOpen, deleteVideo, updateVideoStatus}) => {
   const [select, setSelect] = useState(item.status)

   const changeStatus = e => {
      e.preventDefault()
      setSelect(e.target.value)
      updateVideoStatus(item._id, e.target.value)
   }

   return (
      <div className={styles.videoItem} id={item._id}>
         <img src={item.previewImg} alt=""
              className={styles.previewImg}
              onClick={() => modalOpen(item.link)}/>
         <h4>{item.name}</h4>
         <p>{item.channelTitle}</p>
         <p>
            <span>Статус: </span>
            <span></span>
            {
               item.status === 'unviewed'
                  ? 'Непросмотренно'
                  : item.status === 'viewed'
                  ? 'Просмотренно'
                  : item.status === 'repeat'
                  ? 'На повтор' : 'Без статуса'
            }
         </p>
         <div>
            <select value={select} onChange={changeStatus}>
               <option value='unviewed'>Непросмотренно</option>
               <option value='viewed'>Просмотренно</option>
               <option value='repeat'>На повтор</option>
            </select>
            <button onClick={() => deleteVideo(item._id)}>Удалить</button>
         </div>
      </div>
   );
}

export default VideoItem;
