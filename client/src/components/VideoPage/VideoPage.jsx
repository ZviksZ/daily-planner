import React       from 'react';
import AddItemForm from "../common/AddItemForm/AddItemForm.jsx";
import styles      from './VideoPage.module.scss'

/* https://www.googleapis.com/youtube/v3/videos?part=snippet&id=7NU6K4170As&key=AIzaSyDSQa6HWWvzckM7b9qoxgnhc-JOAdQ0QsQ */

const VideoPage = (props) => {
   return (
      <div className="page-section">
         <h3>Видео для просмотра</h3>
         <AddItemForm onSend={() => console.log('add video')} placeholder={'Ссылка на видео'}/>
      </div>
   );
}

export default VideoPage;
