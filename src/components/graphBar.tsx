import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";

interface params {
    listViews:Array<number>
}

const GraphBar = ({listViews}:params) => {
const [data,setData] = useState<Array<number>>([])
  const [xLentgh,setXLentgh] =useState<Array<number>>([])
  const [maxNum,setMaxNum] =useState<number>(0)

  useEffect(()=>{
    let oldNum = 0
    const viewsProgress = listViews.map((viewsNum)=>{
        const different = viewsNum-oldNum+1
        oldNum = viewsNum
        return(different)
    })
    const max =Math.max(...listViews)
    setMaxNum(max>=10?max:10)
setData(viewsProgress)
if(data.length<20){
    setXLentgh(Array.from({ length: 20 }, (_, index) => index + 1))}
    else{setXLentgh(Array.from({ length: data.length }, (_, index) => index + 1))}
  },[listViews])
  
  const calculateHeight = () => {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const dynamicHeight = viewportWidth * 0.9;
    const fixedHeight = 400;
    return Math.min(fixedHeight, dynamicHeight);
};

  return (
    <Box width={'90%'} mt={10} padding={2}  borderRadius={5} sx={{  boxShadow: '0px 4px 4px rgba(0.1, 0.1, 0, 0.3)'}}>
<Typography textAlign={'center'} variant="h4">כמות הצפיות בדקה</Typography>
<Box overflow={'auto'} sx={{ '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    }, '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#888',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },}} width={'100%'}  >
    <Box  width={listViews.length<20?400:listViews.length*20}  display={'flex'} flexDirection={'column'} alignItems={'center'}>
    <BarChart
    xAxis={[{scaleType:'band',data:xLentgh,min:20}]}
    yAxis={[{ scaleType: 'linear',max:maxNum}]}
      series={[{data:data}]}
      height={calculateHeight()}
      />    
    </Box></Box></Box>

  );
};

export default GraphBar;
