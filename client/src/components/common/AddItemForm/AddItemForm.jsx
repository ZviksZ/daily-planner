import React, {useState} from 'react';
import styles            from './AddItemForm.module.scss'


const AddItemForm = ({onSend, placeholder}) => {
   const [title, setTitle] = useState('');

   const handleChange = e => setTitle(e.target.value)

   const pressHandler = async e => {
      if (e.key === 'Enter') {
         onSend(title)
         setTitle('')
      }
   }

   return (
      <>
         <input className={styles.input} 
                type="text" 
                value={title} 
                placeholder={placeholder}
                onChange={handleChange} 
                onKeyPress={pressHandler}/>
      </>
   )
}

export default AddItemForm;