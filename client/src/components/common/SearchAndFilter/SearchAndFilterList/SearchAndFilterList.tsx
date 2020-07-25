import cn                  from "classnames";
import React               from 'react';
import styles              from "../SearchAndFilter.module.scss";
import SearchAndFilterItem from "../SearchAndFilterItem/SearchAndFilterItem";
import {IVideoFilterItem}  from "../../../../types/video_types";


type Props = {
   onFilter: (title: string) => void
   defaultFilter?: string
   filterItems: IVideoFilterItem[]
}

const SearchAndFilterList: React.FC<Props> = ({onFilter, defaultFilter, filterItems}) => {
   return (
      <ul className={styles.filtersList}>
         <li data-value=""
             onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                let val = e.currentTarget.dataset.value || ''
                onFilter(val)
             }}
             className={cn({[styles.activeFilterItem]: defaultFilter === ''}, styles.filterItem)}>
            Все
         </li>
         {filterItems && filterItems.map((f, i) => <SearchAndFilterItem onFilter={onFilter}
                                                                        currentFilter={defaultFilter}
                                                                        filter={f}
                                                                        key={i + 23}/>)
         }
      </ul>
   );
}

export default SearchAndFilterList;
