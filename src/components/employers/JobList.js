import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";

const JobList = () => {
  const [state, updateState] = useState([]);

  const getAllJobs = () => {
    axios
      .get("http://localhost:5000/api/jobs", { withCredentials: true })
      .then((res) => updateState(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const orderList = state.sort((a, b) =>
    a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  );

  return (
    <div className="container">
      {orderList.map((ele, i) => {
        return (
          <div key={i} className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="avatar"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">
                    {ele.name} {ele.lastName}
                  </p>
                  <p className="subtitle is-6">{ele.profession}</p>
                </div>
              </div>

              <div className="content">
                {ele.jobDescription}
                <p className="subtitle is-5">
                  ${(ele.pricePerHour / 22.5).toFixed(2)} USD per hour
                </p>
                <p className="title is-5">Contact: {ele.phoneNumber}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobList;
