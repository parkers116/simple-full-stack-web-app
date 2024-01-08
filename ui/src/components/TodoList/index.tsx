import React, { useRef, useState } from "react";
import { Button, Card, Space } from "antd";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import arr from "../../api/sample_todo_list.json";

import "./index.scss";
import { CloseCircleOutlined } from "@ant-design/icons";

type Props = {};

type SelectedItemType = {
  id: string;
  name: string;
  desc: string;
  dateCreated: string;
};

const TodoList = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>({
    id: "",
    name: "",
    desc: "",
    dateCreated: "",
  });

  const refConfirmRemoveModal = useRef<HTMLDialogElement>(null);

  const onClickNo = () => {
    refConfirmRemoveModal.current?.close();
  };

  const onClickYes = () => {
    // delete method
    // remove state
  };

  return (
    <div className="todo-list">
      <Space direction="vertical" size={16}>
        {arr.map((item) => {
          const onClickRemove = () => {
            setSelectedItem(item);
            refConfirmRemoveModal.current?.showModal();
          };

          return (
            <Card
              key={item.id}
              className="todo-list-item"
              title={item.name}
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <div className="date-created">
                {new Date(item.dateCreated).toDateString()}
              </div>
              <p>{item.desc}</p>
              <CloseCircleOutlined
                className="close-icon"
                onClick={onClickRemove}
              />
            </Card>
          );
        })}
      </Space>
      {selectedItem.id !== "" && (
        <dialog className="modal-confirm-remove" ref={refConfirmRemoveModal}>
          <div>
            Are you sure to remove{" "}
            <text className="name">{selectedItem.name} </text>?
          </div>
          <div className="button-container">
            <Button type="default" onClick={onClickNo}>
              No
            </Button>
            <Button type="primary" danger onClick={onClickYes}>
              Yes
            </Button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TodoList;
