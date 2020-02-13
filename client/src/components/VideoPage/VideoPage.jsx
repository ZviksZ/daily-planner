import React, {useEffect, useState} from 'react';
import {connect}                    from "react-redux";
import {addVideo, getVideos}        from "../../redux/videoReducer.js";
import AddItemForm                  from "../common/AddItemForm/AddItemForm.jsx";
import VideoItem                    from "./VideoItem/VideoItem.jsx";
import VideoModal                   from "./VideoModal/VideoModal.jsx";
import styles                       from './VideoPage.module.scss'


const VideoPage = ({videos, addVideo, getVideos}) => {
   const [modalLink, setModalLink] = useState('')

   const openModal = link => {
      setModalLink(link)
   }
   const closeModal = () => {
      setModalLink('')
   }

   useEffect(() => {
      getVideos()
   }, [getVideos])

   return (
      <div className="page-section">
         {modalLink && <VideoModal link={modalLink} closeModal={closeModal}/>}
         <h3>Видео для просмотра</h3>
         <AddItemForm onSend={addVideo} placeholder={'Ссылка на видео'}/>
         <div className={styles.videosList}>
            {
               videos && videos.map(item => <VideoItem key={item._id} item={item} modalOpen={openModal}/>)
            }
         </div>

         <hr/>
         <h3>фильтр переиспользуемый, с поиском и выбором значения для вывода на экран</h3>
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
