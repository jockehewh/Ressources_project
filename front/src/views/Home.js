import React, {Component} from 'react';
import UserService from "../services/user.service";

export default class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            first_name: null,
            last_name: null,
        }
    }

    
    async componentDidMount() {
        let id = sessionStorage.user_id
        let response = await UserService.details(id);
        let user = response.data.user;
        this.setState({user: user, first_name: user.first_name, last_name: user.last_name});
    }

    render() {
        let {first_name, last_name, user} = this.state;
        return <div className="container-fluid">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Bienvenue {first_name}</h1>
                </div>
            </div>

            <div class="text-center">
                <img src="./graph1.jpg" class="graph border mr-3"/>
                <img src="./graph2.jpg" class="w-25 border mb-3 ml-3"/>
                <img src="./graph3.jpg" class="graph border mb-3 mr-3"/>
                <img src="./graph4.jpg" class="w-25 border mb-3 ml-3"/>

            </div>


        </div>
        
    }
}
