import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import get_history from "../../api/history";
import { IoIosArrowBack } from "react-icons/io";
import { ComponentCart } from "../Cart/Cart";
// import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import PropTypes from "prop-types";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Badge from "@mui/material/Badge";

const History = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const result = await get_history();
      return setData(() => result);
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [change]);
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <div style={{ width: "100%", padding: 10 }}>
        <div
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            paddingBottom: 10,
            borderBottom: "1px solid #e7e7e7",
            width: "100%",
          }}
        >
          <IoIosArrowBack size={24} />
          <div style={{ fontSize: 18, fontWeight: 600 }}>History</div>
        </div>
        <div style={{ margin: "12px 0" }}>
          <div style={{ fontSize: 20 }}>History</div>
          <div style={{ margin: "8px 0" }}>
            You have {data?.length} item in your history
          </div>
        </div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={
                    <Badge max={99} badgeContent={data?.length} color="primary">
                      <div style={{ fontSize: 16 }}>All</div>
                    </Badge>
                  }
                  value="0"
                />
                <Tab
                  label={
                    <Badge
                      max={99}
                      badgeContent={
                        data?.filter((item) => parseInt(item?.state) === 0)
                          ?.length
                      }
                      color="primary"
                    >
                      <div style={{ fontSize: 16 }}>Pending</div>
                    </Badge>
                  }
                  value="1"
                />
                <Tab
                  label={
                    <Badge
                      max={99}
                      badgeContent={
                        data?.filter((item) => (parseInt(item?.state) === 1 && parseInt(item?.is_borrow)=== 1))
                          ?.length
                      }
                      color="primary"
                    >
                      <div style={{ fontSize: 16 }}>Approved</div>
                    </Badge>
                  }
                  value="2"
                />
                <Tab
                  label={
                    <Badge
                      max={99}
                      badgeContent={
                        data?.filter((item) => parseInt(item?.state) === 2)
                          ?.length
                      }
                      color="primary"
                    >
                      <div style={{ fontSize: 16 }}>Declined</div>
                    </Badge>
                  }
                  value="3"
                />
                <Tab
                  label={
                    <Badge
                      max={99}
                      badgeContent={
                        data?.filter((item) => (parseInt(item?.state) === 1 && parseInt(item?.is_borrow)=== 0))
                          ?.length
                      }
                      color="primary"
                    >
                      <div style={{ fontSize: 16 }}>Confirm borrow</div>
                    </Badge>
                  }
                  value="4"
                />
                <Tab
                  label={
                    <Badge
                      max={99}
                      badgeContent={
                        data?.filter((item) => (parseInt(item?.state) === 3))
                          ?.length
                      }
                      color="primary"
                    >
                      <div style={{ fontSize: 16 }}>Finish</div>
                    </Badge>
                  }
                  value="5"
                />
                <Tab
                  label={
                    <Badge
                      max={99}
                      badgeContent={
                        data?.filter((item) => (parseInt(item?.state) === 4))
                          ?.length
                      }
                      color="primary"
                    >
                      <div style={{ fontSize: 16 }}>Overdue</div>
                    </Badge>
                  }
                  value="6"
                />
              </TabList>
            </Box>
            <TabPanel value="0">
              <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {data?.map((item, key) => (
                  <ComponentCart
                    is_history={true}
                    key={key}
                    {...item}
                    data={data}
                    setData={setData}
                    setChange={setChange}
                  />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {data
                  ?.filter((item) => parseInt(item?.state) === 0)
                  ?.map((item, key) => (
                    <ComponentCart
                      is_history={true}
                      key={key}
                      {...item}
                      data={data}
                      setData={setData}
                      setChange={setChange}
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {data
                  ?.filter((item) => (parseInt(item?.state) === 1 && parseInt(item?.is_borrow)=== 1))
                  ?.map((item, key) => (
                    <ComponentCart
                      is_rating={true}
                      key={key}
                      {...item}
                      data={data}
                      setData={setData}
                      setChange={setChange}
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {data
                  ?.filter((item) => parseInt(item?.state) === 2)
                  ?.map((item, key) => (
                    <ComponentCart
                      is_history={true}
                      key={key}
                      {...item}
                      data={data}
                      setData={setData}
                      setChange={setChange}
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel value="4">
              <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {data
                  ?.filter((item) => (parseInt(item?.state) === 1 && parseInt(item?.is_borrow)=== 0))
                  ?.map((item, key) => (
                    <ComponentCart
                      is_history={true}
                      key={key}
                      {...item}
                      data={data}
                      setData={setData}
                      setChange={setChange}
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel value="5">
              <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {data
                  ?.filter((item) => (parseInt(item?.state) === 3))
                  ?.map((item, key) => (
                    <ComponentCart
                      is_history={true}
                      key={key}
                      {...item}
                      data={data}
                      setData={setData}
                      setChange={setChange}
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel value="6">
              <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {data
                  ?.filter((item) => (parseInt(item?.state) === 4))
                  ?.map((item, key) => (
                    <ComponentCart
                      is_history={true}
                      key={key}
                      {...item}
                      data={data}
                      setData={setData}
                      setChange={setChange}
                    />
                  ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </Box>
  );
};

export default History;
