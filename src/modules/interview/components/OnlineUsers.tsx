import { MouseEventHandler, useEffect, useState } from "react";
import { checkOnlineUsers } from "../../../controller/api-activeUsers";
import { sendOffer } from "../../../controller/api-sharingSdp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setAcceptor } from "../../../store/slices/interviewRound";

function OnlineUsers() {
  let [onlineUser, setOnlineUsers] = useState<Object[] | null>(null);
   let offerState=useSelector((state:RootState)=>state.interview)
   let dispatch = useDispatch()
  useEffect(() => { 
    OnlineUsers();
    let int = setInterval(() => OnlineUsers(), 100000000);
    return () => clearInterval(int);
  }, []);

  async function OnlineUsers() {
    try {
      let { data } = await checkOnlineUsers();
      setOnlineUsers(data);
    } catch (error) {
      console.log(error);
    }
  }
  function sendingOffer(event:any):any{
          dispatch(setAcceptor(event.target.innerText))
          sendOffer("Alice",event.target.innerText,offerState.offer)
  }
  return (
    <div id="onlineUsers">
      <h2 style={{textDecoration:"underline",padding:"1px"}}>Online Users</h2> 
      {onlineUser
        ? onlineUser.map((ele: any) => {
            return <h3  onClick={sendingOffer} key={ele.name}>{ele.name}</h3>;
          })
        : ""}
    </div>
  );
}

export default OnlineUsers;
