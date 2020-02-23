import React  from 'react';
import Select from "react-select";
import styles from "../VideoPage.module.scss";

const VideoItemEdit = ({itemId, editMode, setEditMode, filterList,
                          changeStatus, select, deleteVideo}) => {
   const changeVideoStatus = val => {
      changeStatus(val)
      setEditMode(false)
   }

   return (
      <div className={styles.editBlock}>
         {
            editMode
               ? <>
                  <Select style={styles.select} className="customSelect"
                          options={filterList} classNamePrefix="customSelect"
                          placeholder="Выбор статуса" onChange={changeVideoStatus} value={select}/>
                  <button onClick={() => deleteVideo(itemId)}>Удалить</button>
                  <button onClick={() => setEditMode(false)}>Отмена</button>
               </>
               : <button  onClick={() => setEditMode(true)}>Изменить статус или удалить</button>
         }


      </div>
   );
}

export default VideoItemEdit;
