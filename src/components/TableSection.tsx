import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { UserType } from "../types";
import React, { useMemo } from "react";
import { size, chain, includes } from "lodash";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../quries";

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
   *      gender: By gender:
   * }
   *
   */

  const selectedUsers = useSelector((state) => state.users.usernames); //retrieve data from slice
  const selectedAgeRange = useSelector((state) => state.users.selectedAgeRange);
  const selectedGender = useSelector((state) => state.users.selectedGenders);

  console.log(`selectedUsers`, selectedUsers);
  console.log(`selectedAgeRange`, selectedAgeRange);
  console.log(`selectedGender`, selectedGender);

  const filteredUsers = useMemo(() => {
    return chain(data)
      .filter(
        (user) =>
          (size(selectedUsers) > 0
            ? includes(selectedUsers, user.username)
            : true) &&
          (size(selectedGender) > 0
            ? includes(selectedGender, user.gender)
            : true) &&
          (size(selectedAgeRange) > 0
            ? (Number(selectedAgeRange[0]), user.age >= selectedAgeRange[0]) &&
              (Number(selectedAgeRange[1]), user.age <= selectedAgeRange[1])
            : true)
      )
      .map((value, index) => ({
        key: `${index}-user`,
        ...value,
      }))
      .value();
  }, [data, selectedUsers, selectedAgeRange, selectedGender]);

  return (
    <Table<UserType>
      loading={isFetching}
      columns={columns}
      dataSource={filteredUsers}
    />
  );
};

export default UserTable;
