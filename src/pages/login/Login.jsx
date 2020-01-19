import React from "react"
import "./login.css"
import { Form, Icon, Input, Button } from 'antd';
//获取后台数据
import {reqLogin} from "../../api/api"
//判断是否存在用户信息
import opUser from "../../utils/storageAdmin"
import { message} from 'antd';
class Login extends React.Component {
    handleSubmit=()=>{
        //console.log(this.props.form);
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let {data}=await reqLogin(values);
                let {code,msg,admin}=data
                //console.log(data);
                if(code===1){
                    message.success(msg);
                    opUser.saveUser(admin);
                    this.props.history.push("/admin")
                }else{
                    message.error(msg)
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="form-box">
                <h2>React后台管理系统</h2>
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    min:2,
                                    max:12,
                                    message: '名字在2-10位之间！'
                                }
                            ],
                        })(
                            <Input prefix={<Icon type="user"
                                              style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    min:6,
                                    max:12,
                                    message: '密码在6-12位之间！'
                                }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            onClick={this.handleSubmit}
                            className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;

