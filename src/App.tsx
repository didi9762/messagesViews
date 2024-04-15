import { Container,Box, Typography } from "@mui/material"
import GraphBar from "./components/graphBar"
import GraphLine from "./components/graphLine"
import { useEffect,useState } from "react";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFXo_Ho0L7pB-2_FSad2nd7j32rxAf3dU",
  authDomain: "whatsappdata-a1e14.firebaseapp.com",
  databaseURL:
    "https://whatsappdata-a1e14-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whatsappdata-a1e14",
  storageBucket: "whatsappdata-a1e14.appspot.com",
  messagingSenderId: "141302883704",
  appId: "1:141302883704:web:e33057844975cbe7c6d48d",
  measurementId: "G-GFLB2JWRZY",
};

function App() {
  
  const [listViews, setListViews] = useState([]);
  const [errorNotFound, setErrorNotFoynd] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("iaddd");
    if (id) {
      try {
        initializeApp(firebaseConfig);
        async function getData() {
          const dbRef = ref(
            getDatabase(),
            "messages/" +id
          );
          const snapShot = await get(dbRef);
          const data = snapShot.val();
          setListViews(data);

          if (!data || !Array.isArray(data)) {
            setErrorNotFoynd(true);
            return;
          }
          if (listViews.length < 180) {
            function listen() {
              const dbRef = ref(getDatabase(), "messages/" + id);
              onValue(dbRef, (snapShot:any) => {
                setListViews(snapShot.val());
              });
            }
            listen()
          }
        }
        getData();
      } catch (e) {
        console.log("error try fetch data:", e);
      }
    } else {
      setErrorNotFoynd(true);
    }
  }, []);



  return (
   <Container sx={{height:'100%'}} >
   {!errorNotFound?<Box width={'100%'} height={'100%'}  display={'flex'} flexDirection={'column'} alignItems={'center'}>
    <Typography sx={{mb:10}} textAlign={'center'} variant="h3">מעקב צפיות מאז פרסום</Typography>
    <GraphLine listViews={listViews}/>
    <GraphBar listViews={listViews}/>
    </Box>:
    <Box>
      <Typography>
        404 NOT FOUND
      </Typography>
      </Box>}

   </Container>
  )
}

export default App
