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
    return (<Container  fluid="md" className="col-lg-6 col-md-6 col-sm-6 col">
          </Container>
      
            )
    }

export default HomePage;