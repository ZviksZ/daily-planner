import React, {useState}   from 'react';
import styles              from './SearchAndFilter.module.scss'
import cn                  from "classnames";
import {FaFilter}          from "react-icons/fa";
import SearchAndFilterItem from "./SearchAndFilterItem/SearchAndFilterItem.jsx";

const SearchAndFilter = ({onSearch, onFilter, filterItems, defaultFilter}) => {
   const [title, setTitle] = useState('');
   const [isOpen, setIsOpen] = useState(false)

   const handleChange = e => {
      if (e.target.value) {
         setTitle(e.target.value)
         onSearch(title)
      } else {
         setTitle('')
         onSearch('')
      }

   }
   const toggleOpen = () => {
      setIsOpen(!isOpen)
   }

   return (
      <div className={styles.searchFilter}>
         <FaFilter onClick={toggleOpen}
                   title="Поиск и фильтр"
                   className={cn({[styles.filterBtnOpen]: isOpen}, styles.filterBtn)}/>
         {isOpen &&
         <>
            <input className={styles.searchInput}
                   type="text"
                   value={title}
                   placeholder={"Поиск..."}
                   onChange={handleChange}/>
            <ul className={styles.filtersList}>
               <li data-value=""
                  onClick={(e) => onFilter(e.target.dataset.value)} className={styles.filterItem}>
                  Все
               </li>
               {
                  filterItems && filterItems.map((f, i) => <SearchAndFilterItem
                                                                     onFilter={onFilter}
                                                                     currentFilter={defaultFilter}
                                                                     filter={f}
                                                                     key={i + 23}/>)
               }
            </ul>
         </>
         }
      </div>
   );
}

export default SearchAndFilter;
