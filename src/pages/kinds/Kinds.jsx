import React from "react"
import { Card,Button,Icon,Modal,Table,message } from 'antd';
import "./btn.css"
import KindsFrom from "./KindsForm"
import {addKinds,getKinds,storeChildKinds,updateKindsTitle,delTitle} from "../../api/api";
import UpdateForm from "./updateForm"


export default class Kinds extends React.Component {
    
    state={
        visible:false,//添加
        subKinds:[],
        kinds:[],
        ifUpdate:false,//修改
        word:"",//更新框的默认词
        key:"0",

        columns:[
            {
                title: '名称',
                dataIndex: 'title',
                key:"title"
            },
            {
                align:"right",
                title: '操作',
                dataIndex: 'operate',
                key:"operate",
                render:(text,item)=>{
                    return (
                        <span>
                            <Button type="link" onClick={()=>{this.handleUpdate(item)}}>修改类名</Button>
                            {
                                this.state.key==="0"?<Button type="link" onClick={()=>{this.handleFind(item)}}>查看子分类</Button>:""
                            }
                            <Button type="link" onClick={()=>{this.handleDel(item)}}>删除此类名</Button>
                        </span>
                    )
                }
            }
        ]

    }

    componentDidMount() {
        this.getData("0")
    }

    getData=async (id)=>{
        const {key}=this.state;
        let res =await getKinds(key);
        //console.log(res.data.result);
        if (res.data.status === 1) {
            if(key==="0"){
                this.setState({
                    kinds:res.data.result
                })
            }else{
                this.setState({
                    subKinds:res.data.result
                })
            }
        } else {
            message.error('获取信息失败!');
        }

    }

    //修改标题名
    handleUpdate=(item)=>{
        console.log(item.title);
        this.title=item.title;
        this.setState({
            ifUpdate:true,
            word:item.title
        })
    }
    updateOk=async ()=>{
        this.form.validateFields(async (err, values) => {
            if (!err) {

                let data=Object.assign({name:this.title},values)
                //console.log(values);
                //console.log(this.title);
                let res=await updateKindsTitle(data)
                //console.log(res.data);
                if(res.data.status===0){
                    message.success("数据修改成功!")
                }else{
                    message.error("标题已存在!")
                }

                this.getData("0");
            }
        });
        this.setState({
            ifUpdate:false
        })
    }
    updateNo=()=>{
        this.setState({
            ifUpdate:false
        })
    }
    //删除
    handleDel=(item)=>{
        delTitle({title:item.title});
        this.getData("0")
    }
    //查找子分类
    handleFind=async (item)=>{
        //console.log(item._id);
        this.setState({
            key:item._id,
            word:item.title
        },()=>{
            this.getData(this.state.key)
        })

    }
    handleAdd=()=>{
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
               // console.log( values);
                //将增加的数据传入后台
                let {key}=this.state
                let res=await addKinds(values);
                console.log(key);
                if(res.data.status===0){
                    message.success("数据添加成功!")
                }
                else{
                    message.error("标题已存在!")
                }

                //添加子分类
                await storeChildKinds(values);
                //console.log(childs);
                this.getData(this.key)

            }
        });

        this.setState({
            visible: false,
        });

        //清空输入框
        this.form.resetFields()
    };
    
    handleCancel = e => {

        this.setState({
            visible: false,
        });

        this.form.resetFields()
    }

    getForms=(formData)=>{
        this.form=formData;
    }

    //显示一级分类
    showKinds=()=>{
        this.setState({
            key:"0",
            word:""
        })
    }

    render() {
        let {kinds,key,word,subKinds}=this.state;
        let extra=(
            <Button type="primary" onClick={this.handleAdd}>
                <Icon type="plus" />添加分类
            </Button>
        )
        let title = key==="0"?(
            <Button className="yiji-btn">一级分类</Button>
        ):(
            <span>
                <Button type="link" onClick={this.showKinds}>一级分类</Button>
                <Icon type="swap-right" />
                {word}
            </span>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        dataSource={this.state.key==="0"?kinds:subKinds}
                        columns={this.state.columns}
                        pagination={{defaultPageSize:5}}
                        rowKey="_id"/>
                </Card>

                <Modal
                    title="添加分类"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>

                    <KindsFrom getForms={this.getForms} kinds={kinds}/>
                </Modal>

                {/*修改*/}
                <Modal
                    title="修改标题"
                    visible={this.state.ifUpdate}
                    onOk={this.updateOk}
                    onCancel={this.updateNo}>

                    <UpdateForm getForms={this.getForms} word={this.state.word}/>
                </Modal>
            </div>
        )
    }
}