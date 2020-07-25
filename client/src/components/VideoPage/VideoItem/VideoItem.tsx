import React, {useState}          from 'react';
import styles                     from '../VideoPage.module.scss'
import VideoItemEdit              from "./VideoItemEdit";
import VideoItemStatus            from "./VideoItemStatus";
import {IVideo, IVideoFilterItem} from "../../../types/video_types";


type Props = {
   item: IVideo
   filterList: IVideoFilterItem[]
   updateVideoStatus:(videoId: string, status: string) => void
   deleteVideo: (videoId: string) => void
   modalOpen: (link: string) => void
}

const VideoItem: React.FC<Props> = ({item, modalOpen, deleteVideo, updateVideoStatus, filterList}) => {
   const [select, setSelect] = useState(item.status)

   const [editMode, setEditMode] = useState(false)

   const changeStatus = (val: IVideoFilterItem) => {
      setSelect(val.value)
      updateVideoStatus(item._id, val.value)
   }
   return (
      <div className={styles.videoItem} id={item._id}>
         <img src={item.previewImg} alt=""
              className={styles.previewImg}
              onClick={() => modalOpen(item.link)}/>
         <h4>{item.name}</h4>
         <p>{item.channelTitle}</p>
         <VideoItemStatus status={item.status}/>
         <VideoItemEdit changeStatus={changeStatus} deleteVideo={deleteVideo} editMode={editMode}
                        filterList={filterList} select={select} itemId={item._id} setEditMode={setEditMode}/>
      </div>
   );
}

export default VideoItem;
