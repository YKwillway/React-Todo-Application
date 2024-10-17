import { useState } from 'react';
import './App.css';

export const Todo = () => {
  const [incompleteTodos, setIncompleteTodos] = useState(['TODO1', 'TODO2']);
  const [completeTodos, setcompleteTodos] = useState(['TODO3', 'TODO4']);

  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" />
        <button>追加</button>
      </div>
      {/* Reactではclass属性を付与する場合はclassNameで指定する */}
      <div className="todo-complete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo) => {
            // Reactの仮想DOMは変更前後の差分を抽出して、実際のDOMに反映する。
            // 配列の値を元に一覧を実装するようなループでレンダリングする場合、
            // 何個目の要素に反映する必要があるのか明確にしてあげる必要がある。
            // なので先頭要素に目印としてkey属性をしてあげる必要がある
            // 微妙だけど今回は簡易的にtodoを指定する
            return (
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button>完了</button>
                  <button>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="todo-incomplete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button>戻す</button>
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
