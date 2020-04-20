import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const blogs = useSelector((state) => state.blogs);

  const renderUsers = () => {
    const users = blogs.reduce((acc, curr) => {
      acc[curr.user.username] = (acc[curr.user.username] || 0) + 1;
      return acc;
    }, {});
    const userRow = [];
    Object.keys(users).forEach((key) => {
      for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].user.username === key) {
          userRow.push(
            <tr key={key}>
              <td>
                <Link to={`/users/${blogs[i].user.id}`}>{key}</Link>
              </td>
              <td>{users[key]}</td>
            </tr>
          );
          break;
        }
      }
    });
    return userRow;
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
