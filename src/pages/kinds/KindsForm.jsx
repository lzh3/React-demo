import React from "react"
import { Form, Input,Select  } from 'antd';
const { Option } = Select;

class KindsForm extends React.Component {
    UNSAFE_componentWillMount(){
        this.props.getForms(this.props.form)
    }

    componentDidMount() {
        //console.log(this.props);
    }


    render() {
        //console.log(this.props);
        const { getFieldDecorator } = this.props.form;
        const {kinds}=this.props;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('num', {
                            initialValue:"0"
                        },)(
                            <Select>
                                <Option value="0">一级分类</Option>
                                {
                                    kinds.map((item)=>{
                                        return <Option key={item._id}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题！' }]
                        })(
                            <Input placeholder="title"/>,
                        )}
                    </Form.Item>
                    
                </Form>
            </div>
        )
    }
}
export default  Form.create({})(KindsForm);