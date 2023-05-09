import styled from 'styled-components'
import { v, theme } from './variables'

export const MDiv = styled.div`
    padding: ${v.lgSpacing};
    position: relative;
`
export const MDivT = styled.div`
    padding: 0;
    margin-top: 50px;
`

export const MDivInline = styled.div`
    display: inline-block;
    width: 30%;
    margin-right: 20px;
`
export const MDivInline2 = styled.div`
    display: inline-block;
    width: 15%;
    margin-right: 10px;
`
export const MDivRight = styled.div`
    float: right;
    position: relative;
`

export const MDivLeft = styled.div`
    float: left;
    width: 250px;
    margin-right: 20px;
`
export const MDivHead = styled.div`
    width: 100%;
`

export const MDivRow = styled.div`
    width: 100%;
    position: flex;
    
    :child {
        display: inline-block
    }
`

export const MTable = styled.table`
    //border-collapse: collapse;
    margin: 25px 0;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`

export const MHead = styled.thead`
    background: ${theme.bg3};
    color: #000000;
    text-align: left;
`

export const MTh = styled.th`
    padding: 12px 15px;
`

export const MTd = styled.td`
    padding: 12px 15px;

    :first-child {
        width: 40%;
    }
`
export const MTd2 = styled.td`
    padding: 12px 15px;


`
export const MBody = styled.tbody`
    border-bottom: thin solid #dddddd;
`

export const MButtonRed = styled.button`
    all: unset;
    color: #900000;
    cursor: pointer;
`

export const MButtonBlue = styled.button`
    all: unset;
    color: #0000FF;
    cursor: pointer;
`

export const MButton = styled.button`
    all: unset;
    margin:8px 8px 0;
    height: 30px;

    :disabled  {
        color:#777B7E;
    }
`

export const MButtonBucket = styled.button`
    all: unset;
    background: ${theme.bg3};
    border-radius: ${v.borderRadius};
    margin: 8px 8px 0;
    width: 70px;
    height: 30px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;    
`

export const MIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;
    cursor: pointer;
    svg {
        font-size: 25px;
    }
`

export const MContainer = styled.div`
    background: ${theme.bg3};
    border-radius: ${v.borderRadius};
    margin: 8px 0;
    width: 250px;
 
    :hover {
        box-shadow: inset 0 0 0 1px ${theme.bg3};
    }
`
export const MLabel = styled.label`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    cursor: pointer;
    padding: calc(${v.smSpacing} -2px) 0;   
`

export const MInput = styled.input`
  border: 3px solid ${theme.bg3};
  font-size: 16px;
  height: 38px;
`

export const MInputFile = styled.input`
 // border: 3px solid ${theme.bg3};
  font-size: 16px;
`

export const Ma = styled.a`
    all: unset;
`

export const MText = styled.textarea`
  border: 3px solid ${theme.bg3};
  font-size: 16px;
  width: 250px;
  height: 200px;
`