import React          from 'react';
import styles         from './EnglishPage.module.scss'
import {IEnglishItem} from "../../types/english_types";

type Props = {
   word: IEnglishItem
   deleteWord: (id: string) => void
}

const EnglishPageItem: React.FC<Props> = ({word,deleteWord}) => {
   return (
      <tr id={word._id}>
         <td>{word.wordEng}</td>
         <td>{word.wordRu}</td>
         <td>
            <button className={styles.deleteBtn} onClick={() => deleteWord(word._id)}>Удалить</button>
         </td>
      </tr>
   );
}

export default EnglishPageItem;
