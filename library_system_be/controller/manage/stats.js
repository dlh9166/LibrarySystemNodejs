const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const connection = require("../../database/connect");

const stats= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM history WHERE is_borrow= 1")
        if(Boolean(req.query.time_range)=== true ) {
            const rowsStats= rows?.filter(item=> (moment(item?.time_approve).diff(moment(req.query.time_start, "DD-MM-YYYY")) >= 0) && (moment(item?.time_approve).diff(moment(req.query.time_end, "DD-MM-YYYY")) <= 0)) 
            const newRowStats= rowsStats?.map(({book_id, history_id, state, time_approve, time_book, user_id, ...rest})=> ({
                stats: state,
                name: moment(time_approve).format("DD-MM-YYYY"),
                ...rest
            }))
            const time_start_f= moment(req.query.time_start, "DD-MM-YYYY")
            const time_end_f= moment(req.query.time_end, "DD-MM-YYYY")
            const datesArray = [];
            let currentDate = (time_start_f);
            while (currentDate <= time_end_f) {
            datesArray.push({
                name: moment(currentDate).format('DD-MM-YYYY'),
                stats: 0
            });
            currentDate = moment(currentDate).add(1, 'days');
            }

            newRowStats.forEach((item) => {
            const index = datesArray.findIndex((value) => value.name === item.name);
            if (index !== -1) {
                datesArray[index] = item;
            }
            });
            return res.status(200).json(datesArray)

        }
        else {

                const s1= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY"))?.length
                const s2= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(1, "days").format("DD-MM-YYYY"))?.length
                const s3= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(2, "days").format("DD-MM-YYYY"))?.length
                const s4= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(3, "days").format("DD-MM-YYYY"))?.length
                const s5= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(4, "days").format("DD-MM-YYYY"))?.length
                const s6= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(5, "days").format("DD-MM-YYYY"))?.length
                const s7= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(6, "days").format("DD-MM-YYYY"))?.length
                
                return res.status(200).json([{name: moment().format("DD-MM-YYYY"), stats: s1},
                {name: moment().subtract(1, "days").format("DD-MM-YYYY"), stats: s2},
                {name: moment().subtract(2, "days").format("DD-MM-YYYY"), stats: s3},
                {name: moment().subtract(3, "days").format("DD-MM-YYYY"), stats: s4},
                {name: moment().subtract(4, "days").format("DD-MM-YYYY"), stats: s5},
                {name: moment().subtract(5, "days").format("DD-MM-YYYY"), stats: s6},
                {name: moment().subtract(6, "days").format("DD-MM-YYYY"), stats: s7},
            ])
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= stats