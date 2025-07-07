import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import DashBoard from "./Dashboard";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "https://zerodha-frontend-9dz2.onrender.com/login";
        return;
      }

      try {
        const { data } = await axios.get(
          "https://zerodha-backend-axjb.onrender.com/api/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.status) {
          setUsername(data.user);
          toast(`Hello ${data.user}`);
        } else {
          localStorage.removeItem("token");
          window.location.href = "https://zerodha-frontend-9dz2.onrender.com/login";
        }
      } catch (err) {
        localStorage.removeItem("token");
        window.location.href = "https://zerodha-frontend-9dz2.onrender.com/login";
      }
    };

    verifyToken();
  }, []);

  return (
    <>
      <TopBar />
      <DashBoard />
    </>
  );
};

export default Home;
