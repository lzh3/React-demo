import React from "react"
import { Form, Input  } from 'antd';

class KindsForm extends React.Component {
    UNSAFE_componentWillMount(){
        this.props.getForms(this.props.form)
    }

    componentDidMount() {
        //console.log(this.props);
    }


    render() {
        // console.log(this.props);
        const { getFieldDecorator} = this.props.form;
        const {word}=this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">

                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题！' }]
                        })(
                            <Input placeholder={word}/>,
                        )}
                    </Form.Item>

                </Form>
            </div>
        )
    }
}
export default  Form.create({})(KindsForm);