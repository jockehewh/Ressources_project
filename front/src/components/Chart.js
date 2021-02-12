import React, {Component} from 'react';
import { Chart } from "react-google-charts";

export default class Charts extends Component{

    render() {
        let {width, heigth, chartType, data, options} = this.props;

        return <div clas="charts">
            <Chart
                width={width}
                height={heigth}
                chartType={chartType}
                loader={<div>Loading Chart</div>}
                data={data}
                options={options}
                legendToggle
            /> 
        </div>
    }
}
