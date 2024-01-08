import React, { useRef } from "react";
import { Button, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import "./index.scss";

const { TextArea } = Input;
const { Item } = Form;

type Props = {};

const FormSubmit = (props: Props) => {
  const refForm = useRef<HTMLDialogElement>(null);

  const onClickClose = () => {
    refForm.current?.close();
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <dialog className="form-dialog" ref={refForm}>
      <Form
        className="form-submit"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Item name="name" label="Name" rules={[{ required: true, max: 100 }]}>
          <Input type="text" placeholder="name of the todo item" />
        </Item>
        <Item name="desc" label="Description" rules={[{ max: 200 }]}>
          <TextArea rows={4} placeholder="description here..." />
        </Item>
        <div className="button-container">
          <Button htmlType="reset">Reset</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
      <div className="close-button-wrapper">
        <Button shape="circle" onClick={onClickClose} danger>
          <CloseOutlined />
        </Button>
      </div>
    </dialog>
  );
};

export default FormSubmit;
