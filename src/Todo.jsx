import { useState } from 'react';
import './App.css';
import { InputTodo } from './ components/InputTodo';
import { IncompleteTodos } from './ components/IncompleteTodos';
import { CompleteTodos } from './ components/CompleteTodos';

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
      <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd}></InputTodo>
      <IncompleteTodos incompleteTodos={incompleteTodos} onClickComplete={onClickComplete} onClickDelete={onClickDelete}></IncompleteTodos>
      <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack}></CompleteTodos>
      <div></div>
    </>
  );
};
