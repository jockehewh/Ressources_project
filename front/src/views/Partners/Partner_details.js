import React, {Component} from 'react';
import PartnerService from "../../services/partner.service";

export default class Partner extends Component{

    constructor(props) {
        super(props);
        this.state = {
            partner: {},
        }
    }


    async componentDidMount() {
        let {id} = this.props.match.params;
        let response = await PartnerService.details(id);
        let partner = response.data.partner;
        this.setState({partner: partner});
    }

    render() {
        let {partner} = this.state;
        return <div className="container-fluid">
            <h1 class="title_page">Partenaires</h1>

            <div class="text-center content_center">
                <img src={`${process.env.REACT_APP_HOST_API}/${partner.thumbnail}`} class="rounded thumbnail_partner" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{partner.name}</h5>
                    <div>
                        <p class="card-text"><b>Site web : </b><a href={partner.website}>{partner.website}</a></p>
                        <p class="card-text"><b>Abonnement : </b>Formule payante</p>
                    </div>
                </div>
                <a href="#" class="btn btn-success">Modifier</a>
                <a href="#" class="btn btn-danger">Supprimer</a>
            </div>

           
        </div>
        
    }
}
