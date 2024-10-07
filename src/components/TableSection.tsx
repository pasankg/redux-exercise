import { Table, TableProps } from "antd";
import { UserType } from "../types";
import UserRecords from "../assets/users.json";
import React from "react";

const columns: TableProps<UserType>["columns"] = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "DOB",
    dataIndex: "dob",
    key: "dob",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
];
const data: UserType[] = UserRecords;

const UserTable: React.FC = () => {
  return <Table<UserType> columns={columns} dataSource={data} />;
};

export default UserTable;
