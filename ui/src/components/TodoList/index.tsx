import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Space } from "antd";
import { useQuery } from "react-query";
import { CloseCircleOutlined } from "@ant-design/icons";

import arr from "../../api/sample_todo_list.json";
import { deleteTodoList, getTodoList } from "../../api/todolist";

import "./index.scss";
import FormSubmit from "../FormSubmit";

type Props = {};

export type SelectedItemType = {
  id: string;
  name: string;
  desc: string;
  date_created: string;
};

const INITIAL_SELECTED_ITEM = {
  id: "",
  name: "",
  desc: "",
  date_created: "",
};

const TodoList = (props: Props) => {
  const [selectedId, setSelectedId] = useState<string>(""); // for modify item
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>(
    INITIAL_SELECTED_ITEM
  ); // for delete item
  const { data, refetch } = useQuery("todoList", getTodoList);

  const refConfirmRemoveModal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selectedId === "") return;
    (
      document.getElementsByClassName(
        "form-dialog-modify"
      )[0] as HTMLDialogElement
    )?.showModal();
  }, [selectedId]);

  useEffect(() => {
    if (selectedItem.id === "") return;
    refConfirmRemoveModal.current?.showModal();
  }, [selectedItem]);

  const onClickNo = () => {
    refConfirmRemoveModal.current?.close();
    setSelectedItem(INITIAL_SELECTED_ITEM);
  };

  const onClickYes = async () => {
    await deleteTodoList({ id: selectedItem.id });
    refetch();
    setSelectedItem(INITIAL_SELECTED_ITEM);
  };

  return (
    <div className="todo-list">
      <Space direction="vertical" size={16}>
        {data
          ?.sort((a: SelectedItemType, b: SelectedItemType) => {
            if (new Date(a.date_created) > new Date(b.date_created)) {
              return 1;
            } else {
              return -1;
            }
          })
          ?.map((item) => {
            const onClickModify = () => {
              setSelectedId(item.id);
            };

            const onClickRemove = () => {
              setSelectedItem(item);
            };

            return (
              <Card
                key={item.id}
                className="todo-list-item"
                title={item.name}
                extra={
                  <div className="moidfy-button" onClick={onClickModify}>
                    Modify
                  </div>
                }
                style={{ width: 300 }}
              >
                <div className="date-created">
                  {new Date(item.date_created).toDateString()}
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
      {selectedId !== "" && (
        <FormSubmit
          type="modify"
          selectedId={selectedId}
          cbClose={() => setSelectedId("")}
        />
      )}

      {selectedItem.id !== "" && (
        <dialog className="modal-confirm-remove" ref={refConfirmRemoveModal}>
          <div>
            Are you sure to remove{" "}
            <span className="name">{selectedItem.name} </span>?
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
