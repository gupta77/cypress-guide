import * as React from 'react';
import { observer } from 'mobx-react';
import { FieldState } from 'formstate';
import { classNames } from '../todomvc/css';
import { appState } from '../state/appState';

export const App: React.SFC<{}> = observer((props) => {
  return (
    <>
      <section className={classNames.app}>
        <Header />
        {appState.todos.hasTodos && <Main />}
        {appState.todos.hasTodos && <Footer />}
      </section>
      <Info />
    </>
  );
});

export const Header: React.SFC<{
}> = observer(() => {
  const fieldState = appState.todos.current;

  return (<header className={classNames.header}>
    <h1>todos</h1>
    <form onSubmit={(e) => {
      e.preventDefault();
      appState.todos.addCurrentItem();
    }}>
      <input
        className={classNames.newTodo}
        autoFocus={true}
        placeholder="What needs to be done?"
        value={fieldState.value}
        onChange={(e) => fieldState.onChange(e.target.value)}
      />
    </form>
  </header>);
});

export const Main: React.SFC<{}> = observer(() => {
  return (
    <section className={classNames.main}>
      <input id={classNames.toggleAll} className={classNames.toggleAll} type="checkbox" />
      <label htmlFor={classNames.toggleAll}>Mark all as complete</label>
      <ul className={classNames.todoList}>
        {appState.todos.items.map(item => {
          return (
            <li key={item.id} className={item.completed ? classNames.completed : ''}>
              <div className={classNames.view}>
                <input className={classNames.toggle} type="checkbox"
                  checked={item.completed}
                  onChange={() => appState.todos.toggle(item)}
                />
                <label>{item.message}</label>
                <button className={classNames.destroy}
                  onClick={() => appState.todos.destroy(item)} />
              </div>
              <input className={classNames.edit} />
            </li>
          );
        })}
      </ul>
    </section>
  );
});

export const Footer: React.SFC<{}> = observer(() => {
  return (
    <footer className={classNames.footer}>

    </footer>
  );
});

export const Info = () => {
  return (
    <footer className={classNames.info}>
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="http://basarat.com">@basarat</a></p>
    </footer>
  );
}