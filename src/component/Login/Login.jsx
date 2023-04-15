import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import login from "../../api/login";

const Login = (props) => {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [roleLogin, setRoleLogin] = useState(0);

  useEffect(() => {
    if (props?.is_login_admin === true) {
      setRoleLogin(3);
    } else if (props?.is_login_staff === true) {
      setRoleLogin(2);
    } else {
      setRoleLogin(1);
    }
  }, [props]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
        }}
      >
        {parseInt(roleLogin) === 1 && (
          <SignInUser
            account={account}
            password={password}
            setAccount={setAccount}
            setPassword={setPassword}
          />
        )}
        {parseInt(roleLogin) === 2 && (
          <SignInStaff
            account={account}
            password={password}
            setAccount={setAccount}
            setPassword={setPassword}
          />
        )}
        {parseInt(roleLogin) === 3 && (
          <SignInAdmin
            account={account}
            password={password}
            setAccount={setAccount}
            setPassword={setPassword}
          />
        )}
      </div>
      {/* background */}
      <div
        className={"bg"}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://res.cloudinary.com/cockbook/image/upload/v1676451115/single/Login_lnt2ke.jpg)",
        }}
      ></div>
    </div>
  );
};

const SignInUser = (props) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          color: "#224957",
          textAlign: "center",
          margin: "24px 0",
        }}
      >
        Sign in
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "#224957",
          textAlign: "center",
          margin: "24px 0",
          padding: 10,
        }}
      >
        Sign in to use service
      </div>
      <div style={{ width: 350, height: 55, margin: "24px 0" }}>
        <input
          value={props?.account}
          onChange={(e) => props?.setAccount(e.target.value)}
          className={"l-i"}
          placeholder={"Email"}
          type="text"
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            background: "#224957",
            borderRadius: 10,
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 17,
          }}
        />
      </div>
      <div style={{ width: 350, height: 55, margin: "24px 0" }}>
        <input
          value={props?.password}
          onChange={(e) => props?.setPassword(e.target.value)}
          className={"l-i"}
          placeholder={"Password"}
          type="password"
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            background: "#224957",
            borderRadius: 10,
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 17,
          }}
        />
      </div>
      <div
        style={{
          margin: "24px 0",
          width: 350,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={"c-flex-center"} style={{ gap: 10 }}>
          <input
            type="checkbox"
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              background: "#224957",
            }}
          />
          <div style={{ fontSize: 17, color: "#224957", fontWeight: 600 }}>
            Remember me
          </div>
        </div>
        <div onClick={()=> navigate("/forgot-password")} style={{ fontSize: 17, fontWeight: 600, cursor: "pointer" }}>Forgot password?</div>
      </div>
      <div
        onClick={async () => {
          const result = await login(props?.account, props?.password);
          if (result.login === true) {
            swal("Thông báo ", "Bạn đã đăng nhập thành công", "success")
              .then(() => {
                Cookies.set("uid", result?.user_id);
                Cookies.set("accessToken", result?.accessToken);
              })
              .then(() => (window.location.href = window.location.origin));
          } else if (result.exist === false) {
            swal("Thông báo", "Tài khoản hoặc mật khẩu không tồn tại", "error");
          } else {
            swal("Thông báo", "Đăng nhập thất bại", "error");
          }
        }}
        className={"h-e"}
        style={{ margin: "24px 0", width: 350, cursor: "pointer" }}
      >
        <img
          style={{ width: "100%" }}
          src="https://res.cloudinary.com/cockbook/image/upload/v1676452271/single/Login_btn_fo4xk8.png"
          alt=""
        />
      </div>
      <div
        style={{
          margin: "24px 0",
          textAlign: "center",
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        Don't have account ?
      </div>
      <div
        onClick={() => navigate("/signup")}
        style={{
          margin: "24px 0",
          textAlign: "center",
          fontSize: 17,
          fontWeight: 600,
          color: "#224957",
          cursor: "pointer",
        }}
      >
        Sign up
      </div>
    </div>
  );
};

const SignInStaff = (props) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          color: "#224957",
          textAlign: "center",
          margin: "24px 0",
          lineHeight: 1.6,
        }}
      >
        Sign in with staff
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "#224957",
          textAlign: "center",
          margin: "24px 0",
          padding: 10,
        }}
      >
        Sign in to use service of staff
      </div>
      <div style={{ width: "100%", height: 55, margin: "24px 0" }}>
        <input
          value={props?.account}
          onChange={(e) => props?.setAccount(e.target.value)}
          className={"l-i"}
          placeholder={"Email"}
          type="text"
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            background: "#224957",
            borderRadius: 10,
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 17,
          }}
        />
      </div>
      <div style={{ width: "100%", height: 55, margin: "24px 0" }}>
        <input
          value={props?.password}
          onChange={(e) => props?.setPassword(e.target.value)}
          className={"l-i"}
          placeholder={"Password"}
          type="password"
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            background: "#224957",
            borderRadius: 10,
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 17,
          }}
        />
      </div>
      <div
        style={{
          margin: "24px 0",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={"c-flex-center"} style={{ gap: 10 }}>
          <input
            type="checkbox"
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              background: "#224957",
            }}
          />
          <div style={{ fontSize: 17, color: "#224957", fontWeight: 600 }}>
            Remember me
          </div>
        </div>
        {/* <div style={{ fontSize: 17, fontWeight: 600 }}>Forgot password?</div> */}
      </div>
      <div
        onClick={async () => {
          const result = await login(props?.account, props?.password);
          if (result.login === true && result?.isStaff === true) {
            swal("Thông báo ", "Bạn đã đăng nhập thành công", "success")
              .then(() => {
                Cookies.set("uid", result?.user_id);
                Cookies.set("accessToken", result?.accessToken);
              })
              .then(
                () => (window.location.href = window.location.origin + "/staff")
              );
          } else if (result.login === true) {
            swal("Thông báo ", "Bạn không có quyền vào trang này", "error");
          } else if (result.exist === false) {
            swal("Thông báo", "Tài khoản hoặc mật khẩu không tồn tại", "error");
          } else {
            swal("Thông báo", "Đăng nhập thất bại", "error");
          }
        }}
        className={"h-e"}
        style={{ margin: "24px 0", width: "100%", cursor: "pointer" }}
      >
        <img
          style={{ width: "100%" }}
          src="https://res.cloudinary.com/cockbook/image/upload/v1676452271/single/Login_btn_fo4xk8.png"
          alt=""
        />
      </div>
      <div
        style={{
          margin: "24px 0",
          textAlign: "center",
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        Don't have account ?
      </div>
      <div
        onClick={() => navigate("/signup")}
        style={{
          margin: "24px 0",
          textAlign: "center",
          fontSize: 17,
          fontWeight: 600,
          color: "#224957",
          cursor: "pointer",
        }}
      >
        Sign up
      </div>
    </div>
  );
};

const SignInAdmin = (props) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          color: "#224957",
          textAlign: "center",
          margin: "24px 0",
          lineHeight: 1.6,
        }}
      >
        Sign in with admin
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "#224957",
          textAlign: "center",
          margin: "24px 0",
          padding: 10,
        }}
      >
        Sign in to use all of service
      </div>
      <div style={{ width: "100%", height: 55, margin: "24px 0" }}>
        <input
          value={props?.account}
          onChange={(e) => props?.setAccount(e.target.value)}
          className={"l-i"}
          placeholder={"Email"}
          type="text"
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            background: "#224957",
            borderRadius: 10,
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 17,
          }}
        />
      </div>
      <div style={{ width: "100%", height: 55, margin: "24px 0" }}>
        <input
          value={props?.password}
          onChange={(e) => props?.setPassword(e.target.value)}
          className={"l-i"}
          placeholder={"Password"}
          type="password"
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            background: "#224957",
            borderRadius: 10,
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 17,
          }}
        />
      </div>
      <div
        style={{
          margin: "24px 0",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={"c-flex-center"} style={{ gap: 10 }}>
          <input
            type="checkbox"
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              background: "#224957",
            }}
          />
          <div style={{ fontSize: 17, color: "#224957", fontWeight: 600 }}>
            Remember me
          </div>
        </div>
        {/* <div style={{ fontSize: 17, fontWeight: 600 }}>Forgot password?</div> */}
      </div>
      <div
        onClick={async () => {
          const result = await login(props?.account, props?.password);
          if (result.login === true && result?.isAdmin === true) {
            swal("Thông báo ", "Bạn đã đăng nhập thành công", "success")
              .then(() => {
                Cookies.set("uid", result?.user_id);
                Cookies.set("accessToken", result?.accessToken);
              })
              .then(
                () => (window.location.href = window.location.origin + "/admin")
              );
          } else if (result.login === true) {
            swal("Thông báo ", "Bạn không có quyền vào trang này", "error");
          } else if (result.exist === false) {
            swal("Thông báo", "Tài khoản hoặc mật khẩu không tồn tại", "error");
          } else {
            swal("Thông báo", "Đăng nhập thất bại", "error");
          }
        }}
        className={"h-e"}
        style={{ margin: "24px 0", width: "100%", cursor: "pointer" }}
      >
        <img
          style={{ width: "100%" }}
          src="https://res.cloudinary.com/cockbook/image/upload/v1676452271/single/Login_btn_fo4xk8.png"
          alt=""
        />
      </div>
      <div
        style={{
          margin: "24px 0",
          textAlign: "center",
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        Don't have account ?
      </div>
      <div
        onClick={() => navigate("/signup")}
        style={{
          margin: "24px 0",
          textAlign: "center",
          fontSize: 17,
          fontWeight: 600,
          color: "#224957",
          cursor: "pointer",
        }}
      >
        Sign up
      </div>
    </div>
  );
};

export default Login;
