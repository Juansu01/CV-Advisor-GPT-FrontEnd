import { createContext, useState } from "react";


const SessionContext = createContext({
  isSessionActivated: false,
  onEndSession: () => { },
  onStartSession: () => { }
});

export const SessionContextProvider = (props) => {
  const [isSessionActivated, setIsSessionActivated] = useState(false);

  const endSessionHandler = () => {
    window.location.reload(false);
    setIsSessionActivated(false);
  }

  const activateSessionHandler = () => {
    console.log("Session activated.")
    setIsSessionActivated(true);
  }

  return (
    <SessionContext.Provider value={{
      isSessionActivated,
      onEndSession: endSessionHandler,
      onStartSession: activateSessionHandler
    }}>
      {props.children}
    </SessionContext.Provider>
  )
}

export default SessionContext;
