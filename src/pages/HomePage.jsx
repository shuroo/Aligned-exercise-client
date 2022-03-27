import React, { Component,useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import FormComponent from "../components/FormComponent";
import FooterBar from '../components/FooterBar';
import TaskModel from '../model/TaskModel'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 
import UserItemComponent from '../components/UserItemComponent';

function HomePage(){

    function defaultFilter(task){ return task; }
    function activeTasksFilter(task){ return task && !task.isDone; }
    function completedTasksFilter(task){ return task && task.isDone; };

    const [tasks, setTasks] = useState([]); 
    const [taskToAdd, setTaskToAdd] = useState("");
    const [taskToRemove, setTaskToRemove] = useState("");
    const [filterBy, setFilterBy] = useState("All");
    const [filterByFunc, setFilterByFunc] = useState(()=>defaultFilter);
    const [showAlert, setShowAlert] = useState("none"); 
    const [indexTaskToCheck,setIndexTaskToCheck] = useState(-1);
    const [tasksView,setTasksView] = useState(null);


useEffect(()=>{

    let filterByFunc = ((filterBy === 'All') ? defaultFilter : 
    ((filterBy === 'Active') ? activeTasksFilter : completedTasksFilter )); 
    setFilterByFunc(filterByFunc);
    const tView = (!tasks ? null :tasks.filter( (task)=>filterByFunc(task) ).map((task,index) =>{ 
        return   <TaskComponent removeTask={removeTask} index={index}  checkTask={setIndexTaskToCheck} key={task.key} task={task}/>}));
   
    setTasksView(tView);
},[tasks,filterBy,setFilterBy])

    function addTask(newTaskName){ 
        const taskToAdd = new TaskModel(newTaskName,tasks.length,false); //todo: add key?
        const tasksCpy = [...tasks];
        tasksCpy.push(taskToAdd); 
        setTasks(tasksCpy);
    }

    useEffect(() => {
        addTask(taskToAdd);
     }, [taskToAdd]) 


    function removeTask(taskId){
        const tasksCpy = [...tasks];
        const index = tasksCpy.map(function(item) {
            return item.key;
        }).indexOf(taskId);

        if(tasksCpy[index] && !tasksCpy[index].isDone){
            setShowAlert("block");
        }
        else { setShowAlert("none"); }
        tasksCpy.splice(index, 1);
        setTasks(tasksCpy);
   
    }

    useEffect(() => { 
        removeTask(taskToRemove) 
      }, [taskToRemove]);

 
  function checkTask(index){
    const cpyTask = { ... tasks[index] };
    cpyTask.isDone = (!cpyTask.isDone);
    const tasksCpy = [...tasks];
    tasksCpy[index] = cpyTask;
    setTasks(tasksCpy);
  }

  useEffect(() => { 
    checkTask(indexTaskToCheck);
  },[indexTaskToCheck]);

    
    return (<Container  fluid="md" className="col-lg-6 col-md-6 col-sm-6 col">
            <h1>ToDos</h1>
            <FormComponent tasks={tasks} setTasks={setTaskToAdd}/> 
            {tasksView}       
             <FooterBar  tasks={tasks} setFilter={setFilterBy} />
            </Container>
      
            )
    }

export default HomePage;