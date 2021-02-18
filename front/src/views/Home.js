import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserService from "../services/user.service";
import Charts from "../components/Chart";

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    async componentDidMount() {
        let id = this.props.user;
        try{
            let response = await UserService.details(id);
            let user = response.data.user;
            this.setState({user: user});
        }catch (e) {
            console.error(e);
        }
    }

    render() {
        let {user} = this.state;
        return <div className="container-fluid">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Bienvenue {user.first_name}</h1>
                </div>
            </div>

            {/**
             * Charts */}
                {/* Nombre de ressources */}
                <Charts
                    width={1200}
                    heigth={300}
                    chartType={"PieChart"}
                    data={[                          
                        ['Ressources', 'Nombre Total'],
                        ['articles web', 293],
                        ['publi. scient.', 262],
                        ['sites web', 224],
                        ['événements', 61]
                    ]}
                    options={{
                        title: 'Nombre de ressources',
                    }}
                />

                {/* AJouts de ressources */}
                <Charts
                    width={1200}
                    heigth={400}
                    chartType={"ComboChart"}
                    data={[                          
                        ['Month', 'articles web', 'publi. scient.', 'sites web', 'événements', 'Moyenne'],
                        ['01',   5,  8,  2,  1,  4.00], 
                        ['02',  17, 12,  9,  1,  9.75], 
                        ['03',  15, 17, 12,  5, 12.25], 
                        ['04',  33, 23, 11,  8, 18.75], 
                        ['05',  18, 20, 30,  7, 18.75], 
                        ['06',  22, 32, 24,  3, 20.25], 
                        ['07',  32, 19, 22,  0, 18.25], 
                        ['08',  19, 21, 16,  9, 16.25], 
                        ['09',  29, 24, 38, 11, 25.50], 
                        ['10',  41, 27, 30,  7, 26.25], 
                        ['11',  37, 41, 14,  4, 24.00], 
                        ['12',  25, 18, 16,  5, 16.00]
                    ]}
                    options={{
                        title : 'Ajouts de ressources',
                        vAxis: {title: 'Ressources'},  hAxis: {title: 'Mois'},
                        seriesType: 'bars', series: {4: {type: 'line'}}
                    }}
                />

                {/* Distribution des types de cancer */}
                <Charts
                    width={1200}
                    heigth={400}
                    chartType={"BubbleChart"}
                    data={[                          
                        ['Type cancer', 'h pos', '% homme', 'sévérité', 'population'],
                        ['colorectal',   10,  62,   67,  107],
                        ['foie',         20,  34,   76,   93],
                        ['peau',         30,  42,   60,   88],
                        ['poumons',      40,  67,   89,  121],
                        ['prostate',     50, 100,   40,   76],
                        ['ovaires',      60,   0,   75,   59],
                        ['sein',         70,   2,   67,  105],
                        ['syst.nerveux', 80,  69,   82,   100],
                        ['vessie',       90,  81,   39,   90]
                    ]}
                    options={{
                        title: 'Distribution des types de cancer par sexe ' +
                        '\ncolorisation par sévérité moyenne des cas',
                        // hAxis: {title: 'pathologies'},
                        vAxis: {title: '% hommes'},
                        hAxis: {
                            ticks: [], 
                            baselineColor:'grey',
                            viewWindow: 140
                        },
                        vAxis: {
                            ticks: ['100','50','','',''], 
                            gridlines: {count:100}, 
                            maxValue: 10, 
                            minValue: -10, 
                            baselineColor: 'grey',
                            viewWindow: 140
                        },
                        colorAxis: {colors: ['yellow', 'red']},
                        bubble: {
                            textStyle: {
                                fontSize: 8,
                                fontName: 'Times-Roman',
                                color: 'black',
                                bold: true,
                                italic: false
                            }
                        }
                    }}
                />

                {/* Répartition par sexe et tranche d'âge' */}
                <Charts
                    width={1200}
                    heigth={300}
                    chartType={"ColumnChart"}
                    data={[                          
                        ["Sexe", "18-34 ans", "35-54 ans", "55-74 ans", "Plus de 75 ans", { role: "annotation" } ],
                        ["Homme", 40, 62, 28, 5, ""],
                        ["Femme", 58, 88, 48, 15, ""],
                        ["Autre",  9, 19, 12, 11, ""]
                    ]}
                    options={{
                        isStacked: 'percent',
                        height: 300,
                        title: 'Répartition par sexe et tranche d\'âge',
                        legend: {position: 'top', maxLines: 3},
                        vAxis: {
                            minValue: 0,
                            ticks: [0, .2, .4, .6, .8, 1]
                        }
                    }}
                />
        </div>
        
    }
}

const mapStateToProps = state => {
    return {user: state.user}
};

export default connect(mapStateToProps, null)(Home);
