import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@material-ui/core";

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
            <TableRow key={key}>
              <TableCell>
                <Link to={`/users/${blogs[i].user.id}`}>{key}</Link>
              </TableCell>
              <TableCell>{users[key]}</TableCell>
            </TableRow>
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
      <TableContainer>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderUsers()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
