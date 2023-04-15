import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import signup from "../../api/signup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "semantic-ui-react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import verify_email from "../../api/admin/verify_email";
import OtpInput from "react-otp-input";
import confirm_account from "../../api/confirm_account";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import validatePhoneNumber from "../../util/validatePhone";
import validatePassword from "../../util/validatePassword";
import validateEmail from "../../util/validateEmail";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

const Signup = () => {
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [open, setOpen] = useState(false);
  const [valueForm, setValueForm] = useState({
    otp: "",
  });

  const [errorForm, setErrorForm] = useState({
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueForm({
      ...valueForm,
      [name]: value.trim(),
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <div style={{ width: "100%", maxWidth: 600 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 600,
                color: "#fff",
                textAlign: "center",
                margin: "24px 0",
              }}
            >
              Sign up
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#fff",
                textAlign: "center",
                margin: "24px 0",
                lineHeight: 1.8
              }}
            >
              Sign up and start managing your candidates!
            </div>
            {verify === false && (
              <div style={{ width: "100%" }} className={"c-flex-center"}>
                <div>
                  <div style={{ width: 350, height: 55, margin: "24px 0" }}>
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={"l-i"}
                      placeholder={"Username"}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={"l-i"}
                      placeholder={"Phone number"}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={"l-i"}
                      placeholder={"Address"}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    onClick={async () => {
                      if(validatePhoneNumber(phone) !== true) {
                        swal("Notice", "Phone is invalid, try again", "error")
                      }
                      if(validatePassword(password) !== true) {
                        swal("Notice", "Pass is invalid, password must have less than 8 charaters includes 1 number, 1 uppercase and 1 special charater, try again", "error")
                      }
                      if(validateEmail(email) !== true) {
                        swal("Notice", "Email is not correct form, email must belongs to fpt corporation", "error")
                      }
                      const result= await verify_email(email)
                      if(result?.exist=== true) {
                        swal("Notice", "Email is exists, Please try with email else!")
                      }
                      else if(result?.exist=== false) {
                        setVerify(() => true)
                      }
                    }}
                    className={"h-e"}
                    style={{ margin: "24px 0", width: 350, cursor: "pointer" }}
                  >
                    <img
                      style={{ width: "100%" }}
                      src="https://res.cloudinary.com/cockbook/image/upload/v1676453029/single/Login_btn_1_pmysr5.png"
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      margin: "24px 0",
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    Already have account ?
                  </div>
                  <div
                    onClick={() => navigate("/login")}
                    style={{
                      margin: "24px 0",
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </div>
                </div>
              </div>
            )}
            {verify === true && (
              <>
                <div
                  className="container-1"
                  style={{
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                  }}
                >
                  <section className="wrapper">
                    <div className="heading">
                      <div style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
                      <h1 className="text text-large">
                  <Button
                    onClick={() => setVerify(()=> false)}
                    style={{ aspectRatio: 1 / 1, borderRadius: "50%" }}
                  >
                    <ArrowBackIcon />
                  </Button>
                </h1>
                        We've just send your email a code inclues 6 digit,
                        Please check your email and type to below form to
                        complete register process
                      </div>
                      <OtpInput
                        containerStyle={"asw"}
                        inputStyle={"lll"}
                        value={verifyCode}
                        onChange={setVerifyCode}
                        numInputs={6}
                        separator={<span>&nbsp;&nbsp;</span>}
                      />
                      <br />
                      <div className={"c-flex-center"}>
                        <Button
                          onClick={async () => {
                            const result = await confirm_account(
                              email,
                              verifyCode
                            );
                            if (result?.verify === false) {
                              swal(
                                "",
                                "Verify code is invalid. Please try again",
                                "error"
                              );
                            } else if (result?.verify === true) {
                              // setOpen2(() => undefined);
                              const result = await signup(
                                userName,
                                email,
                                phone,
                                password,
                                address
                              );
                              // if(email.includes("fpt")=== false ) {
                              //     return swal("Notice", "Email của bạn không đúng định dạng", "error")
                              // }
                              if (result.signup === true) {
                                swal(
                                  "Notice ",
                                  "Register is successfully",
                                  "success"
                                ).then(() => {
                                  // setOpen(true);
                                    navigate("/login");
                                });
                                // setOpen(true);
                              } else if (result.exist === true) {
                                swal(
                                  "Notice",
                                  "Email is exist, Please try with another email",
                                  "error"
                                );
                              } else {
                                swal("Notice", "Register failed", "error");
                              }
                            } else {
                              swal("", "Error");
                            }
                          }}
                          variant={"contained"}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>
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
              "url(https://res.cloudinary.com/cockbook/image/upload/v1676452569/single/Signup_xjqcfk.jpg)",
          }}
        ></div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle>{"Đặt lại mật khẩu"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              value={valueForm.otp}
              onChange={handleChange}
              placeholder={"123456"}
              name="otp"
              fullWidth
              helperText={errorForm.otp.length > 0 ? errorForm.otp : ""}
              error={errorForm.otp.length > 0 ? true : false}
            />
            <RedBar />

            <RedBar />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              let isValid = true;
              const newError = {
                otp: "",
              };
              if (valueForm.otp.length === 0) {
                isValid = false;
                newError.otp = "Nhập mã otp";
              } else {
                newError.otp = "";
              }

              if (isValid) {
                const { otp } = valueForm;
                const res = await verify_email(otp);
                console.log("res: ", res);
                if (res?.verify_email === true) {
                  swal(
                    "Notice",
                    "Bạn cập nhật mật khẩu thành công",
                    "success"
                  ).then(() => {
                    navigate("/login");
                    handleClose();
                  });
                } else {
                  swal("Notice", "Error", "error");
                }
                setValueForm({
                  otp: "",
                });
              }
              setErrorForm({ ...newError });
            }}
          >
            Đặt lại
          </Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Signup;
