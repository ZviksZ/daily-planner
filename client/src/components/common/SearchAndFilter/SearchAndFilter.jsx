import React, {useEffect, useState} from 'react';
import styles                       from './SearchAndFilter.module.scss'
import cn                           from "classnames";
import {FaFilter}                   from "react-icons/fa";
import SearchAndFilterList          from "./SearchAndFilterList/SearchAndFilterList.jsx";

function noop() {}

const SearchAndFilter = ({onSearch, onFilter = noop, filterItems = [], defaultFilter = '', onlySearch = false}) => {
   const [title, setTitle] = useState('');
   const [isOpen, setIsOpen] = useState(false)

   const handleChange = e => setTitle(e.target.value)
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
