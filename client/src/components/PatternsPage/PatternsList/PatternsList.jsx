import React        from 'react';
import PatternsItem from "../PatternsItem/PatternsItem.jsx";


const PatternsList = ({title, list, updatePattern, deletePattern}) => {
   return (
      <
>
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
