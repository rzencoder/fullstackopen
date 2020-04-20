import React from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const blogs = useSelector((state) => state.blogs);

  const renderUsers = () => {
    const users = blogs.reduce((acc, curr) => {
      acc[curr.user.username] = (acc[curr.user.username] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(users).map((key) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{users[key]}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </div>
  );
};

export default Users;
