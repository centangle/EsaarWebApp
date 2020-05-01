import React from "react";
import "./home.styles.scss";
import dashboardOne from "../../../assets/dashboard1.png";
import dashboardTwo from "../../../assets/dashboard2.png";
import dashboardThree from "../../../assets/dashboard3.png";
import DataTable from "../table/DataTable/DataTable";
const Home = () => {
  const data = [
    {
      id: 1,
      activityType: "One Some activity",
      activityDate: "20th april, 2020",
      organization: "centangle",
      activityValue: "2000",
    },
    {
      id: 2,
      activityType: "Two Some activity",
      activityDate: "25th april, 2020",
      organization: "centangle",
      activityValue: "2000",
    },
  ];

  const columns = [
    {
      name: "Activity Type",
      selector: "activityType",
      sortable: true,
    },
    {
      name: "Activity Date",
      selector: "activityDate",
      sortable: true,
      right: true,
    },
    {
      name: "Organization",
      selector: "organization",
      sortable: true,
      right: true,
    },
    {
      name: "Activity Value",
      selector: "activityValue",
      sortable: true,
      right: true,
    },
  ];
  return (
    <div className="page-right">
      <div className="center-icons">
        <div className="box-50">
          <img className="" src={dashboardTwo} alt="Donate Icon" />
          <h2>DONATE</h2>
        </div>
        <div className="box-50">
          <img className="" src={dashboardThree} alt="Request Icon" />
          <h2>REQUEST</h2>
        </div>
        <div className="box-50">
          <img className="" src={dashboardOne} alt="Request Icon" />
          <h2>REGISTER AS VOLUNTEER</h2>
        </div>
      </div>
      <div className="table">
        <DataTable
          title="Last Activity / History"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default Home;
