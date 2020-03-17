import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Tasklist extends React.Component {
  constructor(props){
    super(props);
    this.textEdit = this.textEdit.bind(this);
    this.titleEdit = this.titleEdit.bind(this);
    this.saveTask = this.saveTask.bind(this);
    

  }
  
  readyTask(i)
  {
        const thistask = this.props.tasks.slice();
        thistask[i].statustask=true;
        this.setState({
          tasks: thistask
        });
  }
  delTask(i)
  {
        const deltask = this.props.tasks.slice();
        deltask.splice(i, 1);
        this.props.onDelTask(deltask);
       
  }



  addEditInput(i)
  {
    
         const thistask = this.props.tasks.slice();
        thistask[i].edittask=true;
        this.setState({
          tasks: thistask
        }, this.props.handleFormSubmit);
  }

  titleEdit(e) {
    this.props.onEditTitileChange(e.target.value);
  }
  textEdit(e) {
    this.props.onEditTextChange(e.target.value);
  }

  saveTask(i)
  {
    const savetask = this.props.tasks.slice();
    let savetitle= this.props.editTitle;
    let savetext= this.props.editText;
    savetitle !== null ? savetask[i].titletask = this.props.editTitle:savetitle='';
    savetext !== null ? savetask[i].texttask = this.props.editText:savetext='';
    savetask[i].edittask = false;
    this.props.onSaveTask(savetask);
  }

  render() {

    const massiv =  this.props.tasks;
    function sortmass( a, b ) {
      if ( a.titletask < b.titletask ){
        return 1;
      }
      if ( a.titletask > b.titletask ){
        return -1;
      }
      return 0;
    }
    
    massiv.sort( sortmass );

       const moves = massiv.map((step,move) => {
      const title = massiv[move].titletask;
      const text = massiv[move].texttask;
      const etitle = this.props.editTitle;
      const etext = this.props.editText;
      const status = massiv[move].statustask;
      const edittask = massiv[move].edittask;
        return (
            <li 
            key={move} 
            className={status ? 'ready' : ''}
            >
              <span className="task-title">
                {edittask ?  <input type="text" name="edittitle" value={etitle!==null? etitle:title}  onChange={this.titleEdit} required="required" /> : title }
                </span>
              <span className="task-text">
                {edittask ?  <textarea name="edittext" value={etext!==null? etext: text}  onChange={this.textEdit}></textarea> : text }
                </span>
                {edittask ?  <span className="save" onClick={()=>this.saveTask(move)}>Сохранить</span> : '' }
              {status ? '' : <span className="ready" onClick={()=>this.readyTask(move)}>Готово</span>}
              <span className="edit" onClick={()=>this.addEditInput(move)}>Редактировать</span>
              <span className="del" onClick={()=>this.delTask(move)}>Удалить</span>
            </li>
        );
    });

    return moves;
  }

}

  class Task extends React.Component {
      constructor(props){
          super(props);
          this.state = {
            addTitile: null,

            addText: null,
            editTitle: null,
            editText: null,
            stepNumber: 0,
            tasks: [],
          };
          this.titleChange = this.titleChange.bind(this);
          this.textChange = this.textChange.bind(this);
          this.formSubmit = this.formSubmit.bind(this);
          this.onDelTask = this.onDelTask.bind(this);
          this.onEditTitileChange = this.onEditTitileChange.bind(this);
          this.onEditTextChange = this.onEditTextChange.bind(this);
          this.onSaveTask = this.onSaveTask.bind(this);
          
      }
     
      onEditTitileChange(editTitle) {
        this.setState({
          editTitle: editTitle
        }, this.handleFormSubmit);
      }
      onEditTextChange(editText) {
        this.setState({
          editText: editText
        }, this.handleFormSubmit);
      }
      
      onDelTask(deltask) {
        this.setState({
          tasks: deltask,
        }, this.handleFormSubmit);
      }

      onSaveTask(savetask) {
        this.setState({
          tasks: savetask,
          editText: null,
          editTitle: null,
        }, this.handleFormSubmit);
      }
      

      titleChange(e) {
        this.setState({addTitile: e.target.value}, this.handleFormSubmit);
      }
      textChange(e) {
        this.setState({addText: e.target.value}, this.handleFormSubmit);
      }

      

      formSubmit(e) {
        e.preventDefault();
        const tasks = this.state.tasks.slice(0, this.state.stepNumber + 1);
        
        this.setState({
          addTitile: null,
          addText: null,
          tasks: tasks.concat([{
            titletask:this.state.addTitile,
            texttask:this.state.addText,
            statustask: false,
            edittask: false,
          }]),
          stepNumber: tasks.length,
        }, this.handleFormSubmit);
        document.getElementById("title-add").value = "";
        document.getElementById("text-add").value = "";

        return false;
    }


    handleFormSubmit = () => {
      const { tasks, addTitile, addText, editText, editTitle } = this.state;
      localStorage.setItem('tasks', tasks);
      localStorage.setItem('addTitile', addTitile);
      localStorage.setItem('addText', addText);
      localStorage.setItem('editText', editText);
      localStorage.setItem('editTitle', editTitle);
    };

    render() {
      
     
      

      return (
        <div className="tasks">
          <div className="add-tasks-box">
          <form onSubmit={this.formSubmit}>
            <input placeholder="Заголовок" name="title-task" id="title-add" onChange={this.titleChange} required="required" />
            <textarea placeholder="Текст" name="task" id="text-add" onChange={this.textChange} ></textarea>
            <button type="submit">Дабавить</button>
          </form>
          </div>
          <div className="tasks-box">
            <h3>Список задач: </h3>
            <ul>
              <Tasklist 
              tasks={this.state.tasks} 
              onEditTitileChange={this.onEditTitileChange}
              onEditTextChange={this.onEditTextChange}
              onSaveTask={this.onSaveTask}
              onDelTask={this.onDelTask}
              handleFormSubmit={this.handleFormSubmit}
              editTitle={this.state.editTitle} 
              editText={this.state.editText} />
            </ul>
          </div>
        </div>
      );
    }
  }
  
  
  
  ReactDOM.render(
    <Task />,
    document.getElementById('root')
  );


  