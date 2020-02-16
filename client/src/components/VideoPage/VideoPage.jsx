import React, {useEffect, useState}                                                from 'react';
import {connect}                                                                   from "react-redux";
import {getFilteredVideos}                                                         from "../../redux/selectors/videoSelectors.js";
import {addVideo, deleteVideo, getVideos, setFilter, setSearch, updateVideoStatus} from "../../redux/videoReducer.js";
import AddItemForm                                                                 from "../common/AddItemForm/AddItemForm.jsx";
import SearchAndFilter                                                             from "../common/SearchAndFilter/SearchAndFilter.jsx";
import VideoItem                                                                   from "./VideoItem/VideoItem.jsx";
import VideoModal                                                                  from "./VideoModal/VideoModal.jsx";
import styles                                                           from './VideoPage.module.scss'


const VideoPage = ({setSearch, setFilter, filterList, currentFilter, videos, addVideo, getVideos, deleteVideo, updateVideoStatus}) => {

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
          <SearchAndFilter onSearch={setSearch} filterItems={filterList} defaultFilter={currentFilter} onFilter={setFilter}/>
         <div className={styles.videosList}>
            {
               videos && videos.map(item => <VideoItem key={item._id}
                                                       deleteVideo={deleteVideo}
                                                       updateVideoStatus={updateVideoStatus}
                                                       item={item}
                                                       modalOpen={openModal}/>)
            }
         </div>

         <hr/>
         <h3>
            пагинация - сделать универсальную
            фильтр переиспользуемый, с поиском и выбором значения для вывода на экран
         </h3>

      </div>
   );
}



let mapStateToProps = (state) => {
   return {
      videos: getFilteredVideos(state),
      filterList: state.videoPage.filterList,
      currentFilter: state.videoPage.currentFilter,
   }
}

export default connect(mapStateToProps,
   {setFilter, addVideo, getVideos, deleteVideo, updateVideoStatus, setSearch})(VideoPage)
