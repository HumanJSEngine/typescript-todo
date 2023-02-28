import * as css from './style/style';

import { TodoType } from './AppContainer';
import Input from './components/TodoInput';
import List from './components/TodoList';
type propsType = {
    todoList: Array<TodoType>;
    addTodo: (
        uid: string,
        title: string,
        body: string,
        date: string,
        sticker: string,
        done: boolean
    ) => void;
    updateTodo: (todo: TodoType) => void;
    deleteTodo: (todo: TodoType) => void;
    sortTodo: (sortType: string) => void;
};
function App(props: propsType) {
    return (
        <css.Wrapper className='wrap'>
            <css.Inner className='inner'>
                <css.AppTitle>TodoList App</css.AppTitle>
            </css.Inner>
            <Input
                addTodo={props.addTodo}
                // updateTodo={props.updateTodo}
                // deleteTodo={props.deleteTodo}
            />
            <List
                todoList={props.todoList}
                updateTodo={props.updateTodo}
                deleteTodo={props.deleteTodo}
            />
        </css.Wrapper>
    );
}

export default App;
