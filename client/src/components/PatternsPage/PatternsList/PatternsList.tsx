import React        from 'react';
import PatternsItem from "../PatternsItem/PatternsItem";
import {IPattern}   from "../../../types/pattern_types";

type Props = {
   title: string
   list: IPattern[]
   updatePattern: (patternId: string, title: string, description: string) => void
   deletePattern: (patternId: string) => void
}


const PatternsList:React.FC<Props> = ({title, list, updatePattern, deletePattern}) => {
   return (
      <>
         {list.length
            ? list.map(pattern => <PatternsItem key={pattern._id}
                                            pattern={pattern}
                                            updatePattern={updatePattern}
                                            deletePattern={deletePattern}/>)
            :
            <div>Здесь пока ничего нет</div>
         }
      </>
   );
}

export default PatternsList;
