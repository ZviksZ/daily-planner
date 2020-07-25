import React, {useState}   from 'react';
import Select, {ValueType} from "react-select";
import styles              from "../VideoPage.module.scss";
import {IVideoFilterItem}  from "../../../types/video_types";


type Props = {
   itemId: string
   editMode: boolean
   setEditMode: (value: boolean) => void
   filterList: IVideoFilterItem[]
   changeStatus: (value: IVideoFilterItem) => void
   select: string
   deleteVideo: (videoId: string) => void
}

const VideoItemEdit: React.FC<Props> = ({
                                           itemId, editMode, setEditMode, filterList,
                                           changeStatus, select, deleteVideo
                                        }) => {

   const [defVal, setDefVal] = useState<ValueType<IVideoFilterItem>>(filterList.find(i => i.label === select))

   const changeVideoStatus = (val: any) => {
      changeStatus(val)
      setDefVal(val)
      setEditMode(false)
   }

   return (
      <div className={styles.editBlock}>
         {
            editMode
               ? <>
                  <Select style={styles.select} className="customSelect"
                          options={filterList} classNamePrefix="customSelect"
                          placeholder="Выбор статуса" onChange={changeVideoStatus} value={defVal}/>
                  <button onClick={() => deleteVideo(itemId)}>Удалить</button>
                  <button onClick={() => setEditMode(false)}>Отмена</button>
               </>
               : <button onClick={() => setEditMode(true)}>Изменить статус или удалить</button>
         }


      </div>
   );
}

export default VideoItemEdit;
