import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { UserType } from "../types";
// import UserRecords from "../assets/users.json";
import React, { useMemo } from "react";
import { useGetUsersQuery } from "../quries";
import { map } from "lodash";
/* 

interface TableColumnsType<T> {
  title: string,
  dataIndex: T[key]
  
}

*/

const columns: TableColumnsType<UserType> = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    render: (company) => <span>{company?.name}</span>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Date of Birth",
    dataIndex: "birthDate",
    key: "birthDate",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Picture",
    dataIndex: "image",
    key: "image",
    render: (image) => <img src={image} />,
  },
];
// const data: UserType[] = UserRecords;

const UserTable: React.FC = () => {
  const { data = [], isFetching } = useGetUsersQuery();

  const normalizedData = useMemo(
    () =>
      map(data["users"], (value: UserType, index: number) => ({
        key: `${index}-user`,
        ...value,
      })),
    [JSON.stringify(data["users"])]
  );

  return (
    <Table<UserType>
      loading={isFetching}
      columns={columns}
      dataSource={normalizedData}
    />
  );
};

export default UserTable;
