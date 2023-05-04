import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { auctionStatuses } from "../data/categories";
import ProductCard from "../components/productUi/productCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RecommendProducts from "../components/recommend/recommendProducts";
import axios from "axios";
import Calendar from "../components/events/Calendar";

const CategoriesNavbar = ({ activeTab, handleTabChange, allTabs }) => {
  return (
    <Tabs
      style={{ marginBottom: "20px" }}
      value={activeTab}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {
        allTabs?.map((category) => {
          return <Tab label={category.status} />
        })
      }
    </Tabs>
  );
};

const Events = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const allTabs = [{ status_id: 0, status: "All" }, ...auctionStatuses]
  let noauctions = true;
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://easy-ruby-hen-cap.cyclic.app/products',
      headers: {}
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data.products);
      setData(response.data.products);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <CategoriesNavbar activeTab={activeTab} handleTabChange={handleTabChange} allTabs={allTabs}/>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          marginLeft: "16px",
        }}
      >
        <Grid container spacing={2}>
          {data?.map((inst) => {
            if(allTabs[activeTab].status === "All" || inst.auctionStatus === allTabs[activeTab].status){
              // console.log("here")
              noauctions = false;
            }
            return ((allTabs[activeTab].status === "All" || inst.auctionStatus === allTabs[activeTab].status) ? <Grid item xs={4}>
              <ProductCard data={inst} />
            </Grid> : <></>)
          })}
          {noauctions ? <Typography variant="h5">No Auctions</Typography> : <></>}
        </Grid>
      </Box>
    </Box>
  );
};

export default Events;
