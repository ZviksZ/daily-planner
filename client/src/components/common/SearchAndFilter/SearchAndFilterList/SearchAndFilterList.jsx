import cn                  from "classnames";
import React               from 'react';
import styles              from "../SearchAndFilter.module.scss";
import SearchAndFilterItem from "../SearchAndFilterItem/SearchAndFilterItem.jsx";

const SearchAndFilterList = ({onFilter, defaultFilter, filterItems}) => {
   return (
      <ul className={styles.filtersList}>
         <li data-value=""
             onClick={(e) => onFilter(e.target.dataset.value)}
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
