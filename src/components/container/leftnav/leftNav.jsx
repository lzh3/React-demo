import React from "react"
import {Menu, Icon} from 'antd';
import {NavLink,withRouter} from "react-router-dom"
import menuConf from "../menuConfig"

const {SubMenu} = Menu;

class leftNav extends React.Component {
    state={
    
    }
    UNSAFE_componentWillMount() {
        this.menus=this.getConf(menuConf);
    }

    componentDidMount() {

    }

    getConf = (menus) => {
       let pathname=this.props.history.location.pathname;
        //console.log(pathname);
        return menus.map((item) => {
            if (item.children) { //如果item有children属性，可折叠
                let result=item.children.filter((cItem)=>{
                    return pathname===cItem.key;
                })
                if(result.length){
                    this.defaultOpenKey=item.key
                }
    
                return (
                    <SubMenu
                        key={item.key}
                        title={<span>
                                <Icon type={item.icon}/>
                                <span>
                                    {item.title}
                                </span>
                              </span>}>
                        {
                            this.getConf(item.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                )
            }
            
        })
    }
    render(){
        let pathname=this.props.location.pathname;
        //console.log(pathname);
        return (
            <Menu
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={[this.defaultOpenKey]}
                mode="inline"
                theme="dark">
                {this.menus}
            </Menu>
        )
    }
    
}

export default withRouter(leftNav)


