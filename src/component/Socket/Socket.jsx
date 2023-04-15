import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { API_URL } from '../../config'


export const SocketContext= createContext()
const Socket = ({children}) => {
  const [socketState, setSocketState]= useState()
  useEffect(()=> {
    const socket= io(API_URL, {transports: ["websocket"]})
    setSocketState(socket)
    return ()=> socket.close()

  }, [])
  return (
    <SocketContext.Provider value={{socketState}}>
        {children}
    </SocketContext.Provider>
  )
}

export default Socket