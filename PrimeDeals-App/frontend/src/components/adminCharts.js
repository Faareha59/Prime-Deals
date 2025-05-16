import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";

const trafficData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  users: Math.floor(Math.random() * 6000),
}));

const buyRentData = [
  { name: "Houses", Rent: 100, Buy: 250 },
  { name: "Apartments", Rent: 300, Buy: 150 },
];

const adminCharts = () => {
  return (
    <div style={styles.charts}>
    <div style={styles.chart}>
      <h3>Website Traffic</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trafficData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom" }} />
          <YAxis label={{ value: "Users", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div style={styles.chart}>
      <h3>Buy and Rent</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={buyRentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Rent" fill="#8884d8" />
          <Bar dataKey="Buy" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
};

const styles = {

  charts: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
  },


  chart: {
    width: "45%",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default adminCharts;
