import React, { useEffect, useRef, useState } from 'react'
import { VncScreen } from 'react-vnc'
import { Combobox } from "react-widgets"
import "react-widgets/styles.css"
import { MButton, MContainer, MLabel, MIcon, 
  MDivHead, Ma, MDivRight } from '../../styles/styled_components'
import { TbPlugConnected, TbArrowUpRightCircle } from "react-icons/tb"

const Interactive = () => {

  const [connected, setConnected] = useState(false)
  const vncScreenRef = useRef(VncScreen)
  const [vncValue, setVncValue] = useState('')
  const [vncServers, setVncServers] = useState([])

  const ENDPOINT = 'https://api.heroes-project.eu'
  const jwt = window.sessionStorage.getItem("jwt")
    
  const connectVNC = () => {
    if (connected)
      setConnected(false)
    else
      setConnected(true)
  }  
  
  const getVisualization = async () => {
    fetch(`${ENDPOINT}/organization/workflow/visualization`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: `${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((object) => {
        setVncServers(object)
      }) 
      .catch((error) => {
        console.log("error" + error);
      });
  };

  useEffect(() => {
    getVisualization()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setVncName = (value) => {
    let vncCorrectName
    if (value.host.includes("http://")) {
      vncCorrectName = value.host.replace("http://", "")
    } else if (value.host.includes("https://")) {
      vncCorrectName = value.host.replace("https://", "")
    }
    setVncValue(vncCorrectName)
  }

  return (
    <>
    <h1>Interactive window</h1>
      <div style={{ margin: '1rem' }}>
      <MDivHead>
      {/* <MDivLeft> */}
       <Combobox
          data={vncServers}
          datakey="id"
          textField="host"
          onChange={value => setVncName(value)}
          placeholder="Select the interactive node"
      />
      {vncValue ?
      <div>
      <MButton onClick={(connectVNC)}>
      <MContainer>
        <MLabel>
          <MIcon><TbPlugConnected /></MIcon>
            Open/Close interactive window
        </MLabel>
      </MContainer>
      </MButton>
      <MButton>
      <MContainer>
        <MLabel>
          <MIcon><TbArrowUpRightCircle /></MIcon>
        <Ma href={`http://${vncValue}`} target="_blank" rel="noreferrer">
          Open external window
        </Ma>     
        </MLabel>
      </MContainer>
      </MButton>
      </div>
      : null}
      {/* </MDivLeft> */}
      <MDivRight>
      </MDivRight>
      </MDivHead>
      </div>
      {connected ? 
     <VncScreen
      //using novnc to generate the link. Connecting though this link:
      //https://novnc.com/noVNC/#browser-requirements
      url={`ws://${vncValue}`}
      scaleViewport
      background="#f5f5f5"
      style={{
        width: '75vw',
        height: '75vh',
      }}
      ref={vncScreenRef}
    /> 
      : null}
    </>
  )
}

export default Interactive