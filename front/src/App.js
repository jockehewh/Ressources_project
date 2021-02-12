import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./views/Home";
import Login from "./views/Login";
import MyAccount from "./views/MyAccount";
import MyTeam from "./views/MyTeam";
import Member_details from "./views/Member-details";
import Ressources from "./views/Ressources/Ressources";
import WebArticles from "./views/Ressources/WebArticles";
import WebArticles_details from "./views/Ressources/WebArticles_details";
import WebSites from "./views/Ressources/WebSites";
import WebSites_details from "./views/Ressources/WebSites_details";
import Events from "./views/Ressources/Events";
import Events_details from "./views/Ressources/Events_details";
import ScientificPublications from "./views/Ressources/ScientificPublications";
import ScientificPublications_details from "./views/Ressources/ScientificPublications_details";
import Partner from "./views/Partners/Partner";
import Partner_details from "./views/Partners/Partner_details";

import {connect} from 'react-redux';

class App extends Component{

    render() {
        return <BrowserRouter>
      
          {//If user logout
            ! this.props.user && 
            <div>
              {/*LOGIN*/}
              <Route exact path="/login" component={Login}/>
              <Redirect to={"/login"}/>
            </div>
          }

          {//If user login
            this.props.user && 
            <div>
                <Header />

                {/*Home*/}
                <Route exact path="/" component={Home}/>

                {/*MyAccount*/}
                <Route exact path="/myaccount" component={MyAccount}/>

                {/*MyTeam*/}
                <Route exact path="/myteam/" component={MyTeam}/>
                <Route exact path="/myteam/member/:id" component={Member_details}/>
                
                {/*Partner*/}
                <Route exact path="/partners" component={Partner}/>
                <Route exact path="/partners/:id" component={Partner_details}/>

                {/*Ressources*/}
                <Route exact path="/ressources" component={Ressources}/>

                  {/*WebArticles*/}
                  <Route exact path="/ressources/webarticles" component={WebArticles}/>
                  <Route exact path="/ressources/webarticles/:id" component={WebArticles_details}/>

                  {/*WebSites*/}
                  <Route exact path="/ressources/websites" component={WebSites}/>
                  <Route exact path="/ressources/websites/:id" component={WebSites_details}/>

                  {/*ScientificPublications*/}
                  <Route exact path="/ressources/scientificpublications" component={ScientificPublications}/>
                  <Route exact path="/ressources/scientificpublications/:id" component={ScientificPublications_details}/>
                  
                  {/*Events*/}
                  <Route exact path="/ressources/events" component={Events}/>
                  <Route exact path="/ressources/events/:id" component={Events_details}/>
            </div> 
          }
          
        </BrowserRouter>
    }
}

const mapStateToProps = state => {
    return {user: state.user}
};

export default connect(mapStateToProps, null)(App);
