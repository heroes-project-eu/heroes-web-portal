import { Link } from "react-router-dom"
import styled from 'styled-components'
import { v,theme, btnReset } from '../../styles/variables'

export const SSidebar = styled.div`
    width: ${({isOpen}) => (!isOpen ? `auto` : v.sidebarWidth)};
    background: ${theme.bg};
   // background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
    height: 100vh;
    padding: ${v.lgSpacing};
    position: relative;
`

export const SSidebarButton = styled.button`
    ${btnReset};
    position: absolute;
    top: ${v.xxlSpacing};
    right: ${({isOpen}) => (isOpen ? `-16px` : `-20px`)};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${theme.bg};
    box-shadow: 0 0 4px ${theme.bg3}, 0 0 7px ${theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
`

export const SLogo = styled.div`
    width: 52px;
    
    img {
        max-width: 100%;
        height: auto;
    }

    cursor: pointer;

    margin-bottom: ${v.lgSpacing};
`

export const SDivider = styled.div`
    height: 1px;
    width:  100%;
    background: ${theme.bg3};
    margin: ${v.lgSpacing} 0;
`

export const SLinkContainer = styled.div`
    background: ${({isActive}) => !isActive ? `transparent` : theme.bg3};
    border-radius: ${v.borderRadius};
    margin: 8px 0;

    :hover {
        box-shadow: inset 0 0 0 1px ${theme.bg3};
    }
`

export const SLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    padding: calc(${v.smSpacing} -2px) 0;   
`

export const SLinkIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;

    svg {
        font-size: 20px;
    }
`

export const SLinkLabel = styled.span`
    display: block;
    flex: 1;
    margin-left: ${v.smSpacing};
`