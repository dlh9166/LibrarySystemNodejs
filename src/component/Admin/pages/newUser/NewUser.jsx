import { TextField } from "@mui/material";
import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser" style={{padding: 10}}>
      <h1 className="newUserTitle">Người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>First Name</label>
          <TextField style={{background: "#fff"}} type="text" placeholder="John" />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <TextField style={{background: "#fff"}} type="text" placeholder="Doe" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <TextField style={{background: "#fff"}} type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <TextField style={{background: "#fff"}} type="password" placeholder="password" />
        </div>
        <button className="newUserButton">Tạo</button>
      </form>
    </div>
  );
}
