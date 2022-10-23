import React,{useState} from 'react'
import { AppContext } from './AppContext'



function AppState(props) {
const [savedData,setSavedData]= useState([]);
const [status, setStatus] = useState([]);
  return (<>
  <AppContext.Provider value={{savedData,setSavedData,status,setStatus}}>
  {props.children}  
  </AppContext.Provider>
  </>
  )
}

export default AppState;