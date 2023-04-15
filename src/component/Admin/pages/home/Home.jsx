import Chart from "../../components/chart/Chart";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import get_stats from "../../../../api/manage/get_stats";
import get_dashboard from "../../../../api/manage/get_dashboard";
import { DatePicker, Space } from 'antd';
import get_stats_range from "../../../../api/manage/get_stats_range";
import moment from "moment";
const { RangePicker } = DatePicker;

export default function Home() {
  const [data, setData]= useState({})
  const [data2, setData2]= useState([])
  const [dateRange, setDateRange]= useState([])
  const [timeRange, setTimeRange]= useState([])
  useEffect(()=> {
    (async ()=> {
      const result= await get_stats()
      return setData2(result)
    })()
  }, [])
  useEffect(()=> {
    (async ()=> {
      const result= await get_dashboard()
      return setData(result)
    })()
  }, [])
  const handleDateRangeChange = async (value) => {
    setDateRange(value);
    const dateRangeString = value.map(date => date.format('DD-MM-YYYY'));
    const result= await get_stats_range(dateRangeString[0], dateRangeString[1])
    setTimeRange(dateRangeString)
    setData2(result.reverse())
  }
  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <div style={{margin: 20}}>
      {/* <p>Selected Range: {JSON.stringify(dateRangeString)}</p> */}
        <Space direction="vertical" size={12} >
          <RangePicker format={"DD-MM-YYYY"} value={dateRange} onCalendarChange={handleDateRangeChange} />
        </Space>
      </div>
      <Chart data={data2.reverse()} title={timeRange?.length > 1 ? `History transaction from ${moment(timeRange[0], "DD-MM-YYYY").format("DD-MM-YYYY")} to ${moment(timeRange[1], "DD-MM-YYYY").format("DD-MM-YYYY")}` : "History transaction last 7 days"} grid dataKey="stats"/>
      <div className="homeWidgets">
        <WidgetSm data={data?.newUser} />
        <WidgetLg data={data?.newHistory}/>
      </div>
    </div>
  );
}
