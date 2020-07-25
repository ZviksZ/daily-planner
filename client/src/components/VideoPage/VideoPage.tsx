import React, {useEffect, useState}                                                from 'react';
import {connect}                                                                   from "react-redux";
import {bindActionCreators}                                                        from "redux";
import {ThunkDispatch}                                                             from "redux-thunk";
import {getFilteredVideos}                                                         from "../../redux/selectors/videoSelectors";
import {AppState}                                                                  from "../../redux/store";
import {addVideo, deleteVideo, getVideos, setFilter, setSearch, updateVideoStatus} from "../../redux/videoReducer";
import {AppActions}                                                                from "../../types/common_types";
import AddItemForm                                                                 from "../common/AddItemForm/AddItemForm";
import SearchAndFilter                                                             from "../common/SearchAndFilter/SearchAndFilter";
import VideoItem                                                                   from "./VideoItem/VideoItem";
import VideoModal                                                                  from "./VideoModal/VideoModal";
import styles                                                                      from './VideoPage.module.scss'
import {IVideo, IVideoFilterItem}                                                  from "../../types/video_types";

type Props = LinkStateProps & LinkDispatchProps;

const VideoPage: React.FC<Props> = ({
                      setSearch, setFilter, filterList, currentFilter,
                      videos, addVideo, getVideos, deleteVideo, updateVideoStatus
                   }) => {

   const [modalLink, setModalLink] = useState('')

   const openModal = (link: string) => {
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
         <AddItemForm onSend={addVideo} placeholder={'Ссылка на видео c Youtube'}/>
         <SearchAndFilter onSearch={setSearch}
                          filterItems={filterList}
                          defaultFilter={currentFilter}
                          onFilter={setFilter}/>
         <div className={styles.videosList}>
            {
               videos && videos.map(item => <VideoItem key={item._id}
                                                       deleteVideo={deleteVideo}
                                                       updateVideoStatus={updateVideoStatus}
                                                       item={item}
                                                       filterList={filterList}
                                                       modalOpen={openModal}/>)
            }
         </div>
      </div>
   );
}

interface LinkStateProps {
   videos: IVideo[]
   filterList: IVideoFilterItem[]
   currentFilter: string
}

interface LinkDispatchProps {
   setFilter: (filter: string) => void
   addVideo: (url: string) => void
   getVideos: () => void
   deleteVideo: (videoId: string) => void
   updateVideoStatus: (videoId: string, status: string) => void
   setSearch: (search: string) => void
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      videos: getFilteredVideos(state),
      filterList: state.videoPage.filterList,
      currentFilter: state.videoPage.currentFilter
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   setFilter: bindActionCreators(setFilter, dispatch),
   addVideo: bindActionCreators(addVideo, dispatch),
   getVideos: bindActionCreators(getVideos, dispatch),
   deleteVideo: bindActionCreators(deleteVideo, dispatch),
   updateVideoStatus: bindActionCreators(updateVideoStatus, dispatch),
   setSearch: bindActionCreators(setSearch, dispatch)
});


export default connect(mapStateToProps,mapDispatchToProps)(VideoPage)
