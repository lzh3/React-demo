import React from "react"
import { Card,Button } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class BarChart extends React.Component {
    state={
        data1:[500,1200,2300,1600,800,1800,1500],
        data2:[800,1800,2600,2200,1200,1800,2100],
    }
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
                trigger : 'item'
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
                    type:"bar",
                    data:[500,1200,2300,1600,800,1800,1500]
                }
            ]
        }


        return options;
    }
    getOption2=()=>{
        let options={
            title:{
                text:"柱形图-2",
                textStyle:"pink"
            },
            legend:{//图例组件
                data:["销量","存货"],
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
                    type:"bar",
                    data:this.state.data1
                },
                {
                    name:"存货",
                    type:"bar",
                    data:this.state.data2,
                    color:"#c66"
                }
            ]
        }


        return options;
    }
    update=()=>{
        this.setState((state)=>({
            data1:state.data1.map(item=>{
                return item>=50?item-50:item;
            }),
            data2:state.data2.map(item=>{
                return item>=70?item-80:item;
            })
        }))
    }
    render() {
        return (
            <div>
                <Card title={"柱形图1"}>
                    <ReactEcharts option={this.getOption()} />
                </Card>
                <Button onClick={this.update} type={"primary"}>更新数据</Button>
                <Card title={"柱形图2"}>
                    <ReactEcharts option={this.getOption2()} />
                </Card>
            </div>
        )
    }
}