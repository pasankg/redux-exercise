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
    dataIndex: "name",
    key: "name",
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
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: (website) => <span>W: {website}</span>,
  },
];
// const data: UserType[] = UserRecords;

const UserTable: React.FC = () => {
  const { data = [], isFetching } = useGetUsersQuery();

  const normalizedData = useMemo(
    () =>
      map(data, (value: UserType, index: number) => ({
        key: `${index}-user`,
        ...value,
      })),
    [JSON.stringify(data)]
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
