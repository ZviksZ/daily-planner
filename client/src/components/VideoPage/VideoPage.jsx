import React, {useEffect}    from 'react';
import {connect}             from "react-redux";
import {addVideo, getVideos} from "../../redux/videoReducer.js";
import AddItemForm           from "../common/AddItemForm/AddItemForm.jsx";
import styles                from './VideoPage.module.scss'

/* https://www.googleapis.com/youtube/v3/videos?part=snippet&id=7NU6K4170As&key=AIzaSyDSQa6HWWvzckM7b9qoxgnhc-JOAdQ0QsQ */

const VideoPage = ({videos, addVideo, getVideos}) => {

   useEffect(() => {
      getVideos()
   }, [getVideos])

   return (
      <div className="page-section">
         <h3>Видео для просмотра</h3>
         <AddItemForm onSend={addVideo} placeholder={'Ссылка на видео'}/>
         {
            videos && videos.map(v => <div key={v._id}>{v.name}</div>)
         }
      </div>
   );
}



let mapStateToProps = (state) => {
   return {
      videos: state.videoPage.videos
      /*
      todos: state.todoPage.todos,
      completedTodos: getTodosCompleted(state),
      noCompletedTodos: getTodosNoCompleted(state)*/
   }
}

export default connect(mapStateToProps, {addVideo, getVideos})(VideoPage)
