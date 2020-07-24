import React, {useState} from 'react';
import styles            from './AddItemForm.module.scss'

interface Props {
   onSend: (title: string, additional?: string) => void
   placeholder: string
   secondField?: boolean
   secondFieldPlaceholder?: string
}

const AddItemForm: React.FC<Props> = ({onSend, placeholder, secondField = false, secondFieldPlaceholder = ''}) => {
   const [values, setValues] = useState({title: '', additionalField: ''});

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value})
   }

   const pressHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         if (!secondField) {
            onSend(values.title);

            setValues({title: '', additionalField: ''});
         }
      }
   }

   const twoFieldSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (secondField) {
         onSend(values.title, values.additionalField);

         setValues({title: '', additionalField: ''});
      }
   }

   return (
      <>
         <input className={styles.input}
                type="text"
                value={values.title}
                name={'title'}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyPress={pressHandler}/>

         {
            secondField && <>
               <input className={styles.input}
                      type="text"
                      name={'additionalField'}
                      value={values.additionalField}
                      placeholder={secondFieldPlaceholder}
                      onChange={handleChange}
                      onKeyPress={pressHandler}/>

               <button onClick={twoFieldSend} className='btn-default'>Отправить</button>
            </>
         }

      </>
   )
}

export default AddItemForm;
