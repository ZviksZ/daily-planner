import React, {useEffect, useState} from 'react';
import styles                       from './SearchAndFilter.module.scss'
import cn                           from "classnames";
import {FaFilter}                   from "react-icons/fa";
import SearchAndFilterList          from "./SearchAndFilterList/SearchAndFilterList";
import {IVideoFilterItem}           from "../../../types/video_types";

function noop(str: string | undefined) {}

type Props = {
   onSearch: (title: string) => void
   onFilter?: (title: string) => void
   filterItems?: IVideoFilterItem[]
   defaultFilter?: string
   onlySearch?: boolean

}

const SearchAndFilter: React.FC<Props> = ({onSearch, onFilter = noop, filterItems = [], defaultFilter = '', onlySearch = false}) => {
   const [title, setTitle] = useState('');
   const [isOpen, setIsOpen] = useState(false)

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
   useEffect(() => {
      onSearch(title)
   }, [title, onSearch]);

   const toggleOpen = () => setIsOpen(!isOpen)

   return (
      <div className={styles.searchFilter}>
         <FaFilter className={cn({[styles.filterBtnOpen]: isOpen}, styles.filterBtn)} onClick={toggleOpen} title="Поиск и фильтр" size={'1.8rem'}/>
         {isOpen &&
         <>
            <input className={styles.searchInput}
                   type="text"
                   value={title}
                   placeholder={"Поиск..."}
                   onChange={handleChange}/>
            {
               !onlySearch && <SearchAndFilterList onFilter={onFilter} defaultFilter={defaultFilter} filterItems={filterItems}/>
            }
         </>
         }
      </div>
   );
}

export default SearchAndFilter;
