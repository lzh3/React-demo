import React from "react"
import {Button,Modal} from "antd"
import "./header.css"
import opUser from "../../utils/storageAdmin"
import {withRouter} from "react-router-dom"
import menuConf from "../container/menuConfig"
import {reqWeather} from "../../api/api"

const { confirm } = Modal;

class Header extends React.Component {
    state = {
        currentTime:"",
    }
    
    showModal = () => {
        confirm({
            title: '确认退出吗？',
            content: '',
            onOk:()=> {
                opUser.delUser()
                this.props.history.push("/login")
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    
    getTitle=()=>{
        //console.log(this.props.location.pathname)
        let pathname=this.props.location.pathname;
        let title="";
        menuConf.forEach((item)=>{
            if( pathname === item.key ){
                title=item.title;
            }
            if(item.children){
                let res=item.children.find((cItem)=>pathname===cItem.key);
                if(res){
                    title=res.title;
                }
            }
        });
        return title;
    }
    getWeather=(city)=>{
        reqWeather(city).then((res)=>{
            // console.log(res.city);
            let {wea,tem2,tem,win_speed} = res.data[0];
            //console.log(wea, tem2, tem, win_speed);
            this.setState({
                wea,
                tem2,
                tem,
                win_speed,
                city:res.city
            })
        })
    }
    UNSAFE_componentWillMount() {
        this.username=opUser.getUser().username;
    
        this.getTitle()
    
    }
    componentDidMount() {
        this.getWeather("深圳")
    
        this.timer=setInterval(()=>{
            this.setState({
                currentTime:new Date().toLocaleString()
            })
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎 · {this.username}</span>
                    <Button type="link" onClick={this.showModal}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="name">{this.getTitle()}</div>
                    <div className="area-info">
                        <span>{this.state.currentTime}</span>
                        <span>{this.state.city}</span>
                        <span> {this.state.tem2}-{this.state.tem}</span>
                        <span>
                            {this.state.win_speed}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
