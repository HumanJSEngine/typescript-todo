import * as css from '../style/style';
import { UserOutlined, EditOutlined, UndoOutlined } from '@ant-design/icons';
import { Input, DatePicker, Radio, Button, Space, Form, Checkbox } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CallBacksType, StatesType, TodoType } from '../AppContainer';

type propsType = {
    states: StatesType;
    callBacks: CallBacksType;
};

const TodoEdit = ({ states, callBacks }: propsType) => {
    const { uid } = useParams();
    const navigate = useNavigate();
    console.log('uid:', uid);

    let todoItem = states.todoList.find((item) => item.uid === uid);
    console.log('todoItem : ', todoItem);

    const [todo, setTodo] = useState({ ...todoItem });
    console.log(todo === todoItem);
    console.log('투두', todo);

    useEffect(() => {
        if (!todoItem) {
            alert('목록이 없습니다');
            navigate('/');
        }
    }, []);

    const [form] = Form.useForm();

    // 내용 입력
    const { TextArea } = Input;

    // 필수 항목 작성시
    const onFinish = (values: any) => {
        let day = moment(values.date).format('YYYY-MM-DD');
        const updateTodo: TodoType = {
            uid: String(uid),
            title: values.title,
            body: values.body,
            date: values.date,
            done: values.done,
            sticker: values.sticker,
        };
        // console.log("Success:", values);
        // 새로운 아이템
        // const todoItem: TodoType = {
        //   uid: String(new Date().getTime()),
        //   title: values.title,
        //   body: values.body,
        //   done: false,
        //   sticker: values.sticker,
        //   date: day,
        // };
        // callBacks.addTodo(
        //     String(new Date().getTime()),
        //     values.title,
        //     values.body,
        //     false,
        //     values.sticker,
        //     day
        // );
        // 항목 초기화
        form.resetFields();
        setTodo(values);
        callBacks.updateTodo(updateTodo);
        alert('내용수정');
        navigate('/');
    };
    // 항목 누락시
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <css.TodoInputWrap style={{ paddingBottom: 50 }}>
            {/* Ant.design Form 이용 */}
            <Form
                name='todoform'
                form={form}
                layout='vertical'
                labelCol={{}}
                wrapperCol={{}}
                style={{ maxWidth: '100%' }}
                initialValues={{
                    title: todo.title,
                    sticker: todo.sticker,
                    date: moment(todo.date),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                {/* 제목 */}
                <Form.Item
                    label='Title'
                    name='title'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        size='large'
                        placeholder='제목을 입력하세요.'
                        prefix={<UserOutlined />}
                        maxLength={20}
                        showCount
                    />
                </Form.Item>
                <Form.Item
                    name='done'
                    valuePropName='checked'
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>{todo.done ? <>완료</> : <> 진행중</>}</Checkbox>
                </Form.Item>

                {/* 날짜 */}
                <Form.Item
                    label='날짜'
                    name='date'
                    rules={[{ required: true, message: '날짜를 입력하세요.' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                {/* 스티커 선택 */}
                <Form.Item
                    label='Sticker'
                    name='sticker'
                    rules={[
                        { required: true, message: '스티커를 선택하세요.' },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={'1'}></Radio>
                        <Radio value={'2'}></Radio>
                        <Radio value={'3'}></Radio>
                        <Radio value={'4'}></Radio>
                    </Radio.Group>
                </Form.Item>
                {/* 내용 */}
                <Form.Item
                    label='Contents'
                    name='body'
                    rules={[{ required: true, message: '내용을 입력하세요.' }]}
                >
                    <TextArea
                        showCount
                        maxLength={100}
                        style={{ height: 120, resize: 'none' }}
                        placeholder='할일 입력해 주세요.'
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space align='center'>
                        <Button
                            htmlType='reset'
                            danger
                            icon={<UndoOutlined />}
                            onClick={() => navigate('/')}
                        >
                            Reset
                        </Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            danger
                            icon={<EditOutlined />}
                        >
                            Update
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </css.TodoInputWrap>
    );
};

export default TodoEdit;
