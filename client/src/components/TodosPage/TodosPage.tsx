import React, {useEffect}                                           from 'react';
import {connect}                                                    from "react-redux";
import {getTodosCompleted, getTodosNoCompleted}                     from "../../redux/selectors/todoSelectors";
import {completeTodo, createTodo, deleteTodo, getTodos, updateTodo} from "../../redux/todoReducer";
import AddItemForm                                                  from "../common/AddItemForm/AddItemForm.jsx";
import Loader                                                       from "../common/Loader/Loader.jsx";
import TodoList                                                     from "./TodoList/TodoList";
import styles                                                       from './TodosPage.module.scss'
import {ThunkDispatch}                                              from "redux-thunk";
import {AppActions}                                                 from "../../types/common_types";
import {bindActionCreators}                                         from "redux";
import {AppState}                                                   from "../../redux/store";
import {ITodo}                                                      from "../../types/todos_types";


type Props = LinkStateProps & LinkDispatchProps;

const TodosPage: React.FC<Props> = ({
                                       completedTodos, noCompletedTodos, getTodos,
                                       createTodo, deleteTodo, loading,
                                       todos, updateTodo, completeTodo
                                    }) => {
   useEffect(() => {
      getTodos()
   }, [getTodos])

   if (loading) {
      return <Loader/>
   }
   return (
      <div className="page-section">
         <h3>Список задач</h3>
         <AddItemForm onSend={createTodo} placeholder={'Введите новую задачу'}/>
         <div className={styles.todosList}>
            <div className={styles.todoInWork}>
               <TodoList updateTodo={updateTodo} deleteTodo={deleteTodo} completeTodo={completeTodo}
                         list={noCompletedTodos} title={'На выполнении'}/>
            </div>
            <div className={styles.todoCompleted}>
               <TodoList updateTodo={updateTodo} deleteTodo={deleteTodo} completeTodo={completeTodo}
                         list={completedTodos} title={'Завершенные'}/>
            </div>
         </div>
      </div>
   )
}

interface LinkStateProps {
   loading: boolean
   todos: ITodo[]
   completedTodos: ITodo[]
   noCompletedTodos: ITodo[]
}

interface LinkDispatchProps {
   getTodos: () => void
   createTodo: (title:string) => void
   deleteTodo: (todoId:string) => void
   updateTodo: (todoId:string, title:string) => void
   completeTodo: (todoId:string, completed:boolean) => void
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      loading: state.common.loading,
      todos: state.todoPage.todos,
      completedTodos: getTodosCompleted(state),
      noCompletedTodos: getTodosNoCompleted(state)
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   getTodos: bindActionCreators(getTodos, dispatch),
   createTodo: bindActionCreators(createTodo, dispatch),
   deleteTodo: bindActionCreators(deleteTodo, dispatch),
   updateTodo: bindActionCreators(updateTodo, dispatch),
   completeTodo: bindActionCreators(completeTodo, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage)

