import React from "react"

import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
export default class PieChart extends React.Component {
    getOption=()=>{
        let options={
            title: {
                text: '饼图-1',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 10,
                data: ['西凉', '益州', '兖州', '荆州', '幽州']
            },
            series:[
                {
                    name:"销量",
                    type:"pie",
                    data:[
                        {value: 235, name: '西凉'},
                        {value: 510, name: '益州'},
                        {value: 334, name: '兖州'},
                        {value: 634, name: '荆州'},
                        {value: 735, name: '幽州'}
                    ]
                }
            ]
        }
        return options;
    }
    render() {
        return (
            <div>
                <Card title={"饼图"}>
                    <ReactEcharts option={this.getOption()} />
                </Card>
            </div>
        )
    }
}