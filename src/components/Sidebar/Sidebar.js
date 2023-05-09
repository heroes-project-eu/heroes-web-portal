import React, { useState } from 'react'
import { SSidebar, SLogo, SDivider, SLinkContainer, 
    SLink, SLinkIcon, SLinkLabel, SSidebarButton} from './styles'
import { logoSVG } from "../../assets"
import { AiOutlineLeft, AiOutlineHome, AiOutlineNodeIndex,
        AiOutlineSave, AiOutlineRightSquare, AiOutlineLogout } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import useUser from "../../hooks/useUser"


const Sidebar = () => {
    
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { pathname } = useLocation()
    const { isLogged, logout } = useUser()

    const handleClick = e => {
        e.preventDefault()
        logout()        
    }

    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft  />
                </SSidebarButton>
            </>
            <SLogo>
            <img src={logoSVG} alt="logo" />
            </SLogo>
            <SDivider />
            {linksArray.map(({icon, label, to}) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content`} : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
                    <SLink to='#' onClick={handleClick} style={!sidebarOpen ? { width: `fit-content`} : {}}>
                        <SLinkIcon>{<AiOutlineLogout/>}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>Logout</SLinkLabel>
                            </>
                        )}
                    </SLink>
        {/* {isLogged ? <label>Logged</label> : <label>Not Logged</label>} */}
        </SSidebar>
    )
}

export default Sidebar

const linksArray = [
    {
        label: "Home",
        icon: <AiOutlineHome />,
        to: "/home",
    },
    {
        label: "Jobs",
        icon: <AiOutlineNodeIndex />,
        to: "/workflows",
    },
    {
        label: "Data",
        icon: <AiOutlineSave />,
        to: "/data",
    },
    {
        label: "Visualization",
        icon: <AiOutlineRightSquare />,
        to: "/visualization",
    }
]