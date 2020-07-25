import React              from 'react';
import styles             from '../SearchAndFilter.module.scss'
import cn                 from "classnames";
import {IVideoFilterItem} from "../../../../types/video_types";



type Props = {
   filter: IVideoFilterItem
   onFilter: (title: string) => void
   currentFilter?: string
}

const SearchAndFilterItem: React.FC<Props> = ({filter, onFilter, currentFilter}) => {
   const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      let val = e.currentTarget.dataset.value || ''
      onFilter(val)
   }
   return (
      <li onClick={handleClick}
          data-value={filter.value}
          className={cn({[styles.activeFilterItem]: currentFilter === filter.value}, styles.filterItem)}>
         {filter.label}
      </li>
   );
}

export default SearchAndFilterItem;
