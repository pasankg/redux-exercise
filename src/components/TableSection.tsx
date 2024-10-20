import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { UserType } from "../types";
import React, { useMemo } from "react";
import { size, chain, includes } from "lodash";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../quries";

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

const UserTable: React.FC = () => {
  const { data, isFetching } = useGetUsersQuery();


  /**
   * 
   *  slices: 
   *    filters {
   *      username: filterByName
   *      age: By Age Range  
   *      dateOfBirthFilter: DOB
   *      gender
   * }
   * 
   */




  const selectedUsers = useSelector((state) => state.users.usernames); //retrieve data from slice
  const selectedAge = useSelector((state) => state.users.selectedAgeRange)

  console.log(`selectedAge`, selectedAge)

  const filteredUsers = useMemo(() => {
    return chain(data?.users)
      .filter((user) => (size(selectedUsers) > 0 ? includes(selectedUsers, user.username) : true))
      .map((value, index) => ({
        key: `${index}-user`,
        ...value,
      }))
      .value();
  }, [JSON.stringify(data?.users), selectedUsers, selectedAge]);

  return (
    <Table<UserType>
      loading={isFetching}
      columns={columns}
      dataSource={filteredUsers}
    />
  );
};

export default UserTable;
