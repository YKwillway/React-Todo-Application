import { useState } from 'react';
import './App.css';

export const Todo = () => {
  const [todoText, setTodoText] = useState("")
  const [incompleteTodos, setIncompleteTodos] = useState(['TODO1', 'TODO2']);
  const [completeTodos, setCompleteTodos] = useState(['TODO3', 'TODO4']);
  // onChangeなどのイベントが発火するとeventという変数が渡ってくる。よくある書き方。
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]
    // splice -> 対象のindex番目から、要素をX個分削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  }
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos]
    newIncompleteTodos.splice(index, 1);
    
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }
 
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  }
 
  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>
      {/* Reactではclass属性を付与する場合はclassNameで指定する */}
      <div className="todo-complete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            // Reactの仮想DOMは変更前後の差分を抽出して、実際のDOMに反映する。
            // 配列の値を元に一覧を実装するようなループでレンダリングする場合、
            // 何個目の要素に反映する必要があるのか明確にしてあげる必要がある。
            // なので先頭要素に目印としてkey属性をしてあげる必要がある
            // 微妙だけど今回は簡易的にtodoを指定する
            return (
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="todo-incomplete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div></div>
    </>
  );
};
