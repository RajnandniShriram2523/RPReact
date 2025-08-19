import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataservice from '../services/dataservice';

const Deletecategorybyid = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  dataservice.savedeletecategory(id)
    .then((res) => {
      if (res.data.status === "delete") {
        navigate("/viewcategory");  // Redirect after success
      } else {
        setMsg("error");
      }
    })
    .catch(() => {
      setMsg("error");
    });
}, [id, navigate]);

  // Only show error message if delete fails (and stay on delete page)
  return (
    <>
      {/* {msg === "error" && <p style={{ color: "red" }}>Record not deleted, something went wrong.</p>} */}
    </>
  );
};

export default Deletecategorybyid;
