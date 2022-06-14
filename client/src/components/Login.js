import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { loginUser } from "../utils/API";
import Auth from "../utils/auth";
import Navbar from "./Navbar"

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await loginUser(userFormData);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { token, user } = await response.json();
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar/>
    <div className="login h-screen">
      <br></br>
      <br></br>
      <div className="flex mt-20 justify-center items-center">
        <div className=" container border border-orange-600 w-fit content-center  justify-center items-center rounded pt-8 pb-8 pl-6 pr-6">
          <Form
            className="flex flex-col justify-center items-center"
            noValidate
            validated={validated}
            onSubmit={handleFormSubmit}
          >
            <Alert
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
              className="fixed w-auto top-16 bg-red-900 py-2 px-5"
            >
              Invalid Username or Password
            </Alert>
            <div className="flex justify-center">
              <Form.Group>
                <Form.Label htmlFor="email" className="text-orange-600">
                  Email
                </Form.Label>
                <Form.Control
                  className="text-slate-1000 mx-1 my-2 w-30 bg-slate-900  pl-2"
                  type="text"
                  placeholder="Email..."
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  required
                />
              </Form.Group>
            </div>
            <br></br>
            <div className="flex justify-center">
              <Form.Group>
                <Form.Label htmlFor="password" className="text-orange-600">
                  Password
                </Form.Label>
                <Form.Control
                  className="text-slate-1000 mx-1 my-2 w-30 bg-slate-900 pl-2"
                  type="password"
                  placeholder="Password..."
                  name="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                  required
                />
              </Form.Group>
            </div>
            <br></br>

            <Button
              className="bg-[#000000] hover:bg-orange-700 hover:border-black text-white font-bold py-2 px-4 border border-[#f06c00] rounded flex justify-center items-center"
              disabled={!(userFormData.email && userFormData.password)}
              type="submit"
              variant="success"
            >
              Login
            </Button>

            <Form.Group className="flex flex-col items-center justify-center mt-8">
              <h1 className="my-2 text-xs">Don't have an account ? </h1>

              <Link
                className=" btn-xs bg-slate-900 hover:bg-orange-700 hover:border-black text-white font-bold py-2 px-4 border rounded border-[#f06c00] flex justify-center items-center"
                as={Link}
                to="/signup"
              >
                Sign Up!
              </Link>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;

