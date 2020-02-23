import React  from 'react';
import styles from '../SearchAndFilter.module.scss'
import cn     from "classnames";

const SearchAndFilterItem = ({filter, onFilter, currentFilter}) => {
   const handleClick = e => {
      onFilter(e.target.dataset.value)
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
