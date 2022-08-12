import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

class AdminPage extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        students: [
           { name: 'Farzan Bhuiyan', completed: "22-08-11 08:11", ID: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>ID</a>, Citizenship: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Citizenship</a>, PreApp: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Pre Authorization App</a>, Application: <a href="https://demo.docusign.net/Signing/?ti=b99c120e1e7d46479583ba151cf6ea7c" style = {{color: "black"}}>Filled out Form Information</a> },
           { name: 'Joe Doe', completed: "22-08-11 01:32", ID: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>ID</a>, Citizenship: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Citizenship</a>, PreApp: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Pre Authorization App</a>, Application: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Filled out Form Information</a> },
           { name: 'Testing', completed: "22-08-10 22:58", ID: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>ID</a>, Citizenship: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Citizenship</a>, PreApp: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Pre Authorization App</a>, Application: <a href="https://mag.wcoomd.org/uploads/2018/05/blank.pdf" style = {{color: "black"}}>Filled out Form Information</a> }
        ]
     }
  }

  renderTableHeader() {
     let header = Object.keys(this.state.students[0])
     return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
     })
  }

  renderTableData() {
     return this.state.students.map((student, index) => {
        const { name, completed, ID, Citizenship, PreApp, Application } = student //destructuring
        return (
           <tr key={name}>
              <td>{name}</td>
              <td>{completed}</td>
              <td>{ID}</td>
              <td>{Citizenship}</td>
              <td>{PreApp}</td>
              <td>{Application}</td>
           </tr>
        )
     })
  }

  render() {
     return (
        <div>
           <h1 id='title'>Submitted Applications</h1>
           <table id='students'>
              <tbody>
                 <tr>{this.renderTableHeader()}</tr>
                 {this.renderTableData()}
              </tbody>
           </table>
        </div>
     )
  }
}

export default AdminPage