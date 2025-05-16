import React from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const properties = [
    {
      id: 1,
      type: "Apartment",
      location: "Bahria Town - Sector N",
      buy: "1.2 Crore",
      rent: "60,000",
      beds: 2,
      baths: 3,
      agent: "Ahmed Ali",
      description: "This is a beautiful Apartment in Bahria Town - Sector N.",
      features: "2 bedrooms, 3 bathrooms, Spacious rooms, Modern Architecture, Beautiful Location",
    },
    {
      id: 2,
      type: "House",
      location: "F-8, Islamabad",
      buy: "32 Crore",
      rent: "5 Lac",
      beds: 5,
      baths: 6,
      agent: "Asaad Khan",
      description: "This is a beautiful House in F-8, Islamabad.",
      features: "2 bedrooms, 3 bathrooms, Spacious rooms, Lawn, Modern Architecture, Beautiful Location",
    },
  ];


const PropertiesTable = () => {
  return (
    <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Buy</th>
                <th>Rent</th>
                <th>Beds</th>
                <th>Baths</th>
                <th>Agent</th>
                <th>Description</th>
                <th>Features</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.type}</td>
                  <td>{property.location}</td>
                  <td>{property.buy}</td>
                  <td>{property.rent}</td>
                  <td>{property.beds}</td>
                  <td>{property.baths}</td>
                  <td>{property.agent}</td>
                  <td>{property.description}</td>
                  <td>{property.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={styles.viewAllButton}>View All</button>
        </div>
  );
};

const styles = {
    tableContainer: {
        overflowX: "auto",
        marginBottom: "30px",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
    },

    viewAllButton: {
        marginTop: "10px",
        padding: "10px 20px",
        backgroundColor: "#1B4C7F",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};
export default PropertiesTable;
