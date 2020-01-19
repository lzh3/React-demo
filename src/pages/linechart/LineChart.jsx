import React from "react"

import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class LineChart extends React.Component {
    getOption=()=>{
        let options={
            color: ['skyblue'],
            title:{
                text:"柱形图-1",
                textStyle:"pink"
            },
            legend:{//图例组件
                data:["销量"],
                icon:"circle",
                show:true
            },
            tooltip:{
                trigger : 'axis'
            },
            xAxis:{
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis:{
                //data: ['0', '500', '1000', '1500', '2000', '2500', '3000']
            },
            series:[
                {
                    name:"销量",
                    type:"line",
                    data:[500,1200,2300,1600,800,1800,1500]
                }
            ]
        }


        return options;
    }
    render() {
        return (
            <div>
                <Card title={"折线图"}>
                    <ReactEcharts option={this.getOption()} />
                </Card>
            </div>
        )
    }
}