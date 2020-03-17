import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tasklist extends React.Component {
   
  
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


          return (
              <li 
              key={move} 
             
              >
                <span className="task-title">
                  {title} 
                  </span>
                <span className="task-text">
                  {text} 
                  </span>
                  
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
              />
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