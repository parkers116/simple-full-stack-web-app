import React, { useRef } from "react";
import { Button, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";

import "./index.scss";
import { postTodoList, putTodoList } from "../../api/todolist";
import { SelectedItemType } from "../TodoList";

const { TextArea } = Input;
const { Item } = Form;

type FormSubmitProps = {
  type: "create" | "modify";
  selectedId?: string; // only occur if type === "modify";
  cbClose?: () => void;
};

const FormSubmit = (props: FormSubmitProps) => {
  const refForm = useRef<HTMLDialogElement>(null);
  const { data, refetch } = useQuery("todoList");

  const targetData = (data as Array<SelectedItemType>)?.filter(
    (item) => item.id === props.selectedId
  )[0];

  const getSubmitButtonText = () => {
    switch (props.type) {
      case "create":
        return "Submit";
      case "modify":
        return "Modify";
    }
  };

  const onClickClose = () => {
    refForm.current?.close();
    props.cbClose && props.cbClose();
  };

  const onFinish = async (objFormData: any) => {
    switch (props.type) {
      case "create":
        await postTodoList(objFormData);
        break;
      case "modify":
        await putTodoList({ ...objFormData, id: props.selectedId });
        break;
    }
    refetch();
    onClickClose();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <dialog
      className={`form-dialog form-dialog-${props.type}`}
      // role="dialog"
      ref={refForm}
    >
      <Form
        className="form-submit"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Item name="name" label="Name" rules={[{ required: true, max: 100 }]}>
          <Input
            type="text"
            name="name"
            placeholder="name of the todo item"
            defaultValue={targetData?.name}
          />
        </Item>
        <Item name="desc" label="Description" rules={[{ max: 200 }]}>
          <TextArea
            rows={4}
            name="description"
            placeholder="description here..."
            defaultValue={targetData?.desc}
          />
        </Item>
        <div className="button-container">
          <Button aria-label="reset" htmlType="reset">
            Reset
          </Button>
          <Button aria-label="submit" type="primary" htmlType="submit">
            {getSubmitButtonText()}
          </Button>
        </div>
      </Form>
      <div className="close-button-wrapper">
        <Button aria-label="close" shape="circle" onClick={onClickClose} danger>
          <CloseOutlined />
        </Button>
      </div>
    </dialog>
  );
};

export default FormSubmit;
