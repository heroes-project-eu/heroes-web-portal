import styled from 'styled-components'

import { theme } from '../../styles/variables'

export const LILogin = styled.main`
/*   display: flex;
  align-items: top;
  justify-content: center;
  gap: 200px;
  height: 40vh; */
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
  background: #2c348c;
`

export const LIForm = styled.form`
/*     background-color: white;
    padding: 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
 position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: left;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  font-family: "Roboto";
  font-size: 17px;
  //font-weight: bold;

`

export const LIDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 10px;
`

export const LIButton = styled.button`
  display: flex;
  width: 100%;
  padding: 11px 13px;
  color: #000000;
  font-weight: 600;
  justify-content: center;
  /* text-transform: uppercase; */
  background: ${theme.bg2};
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  :hover {
    background: #2c348c;
    color: #FFFFFF;
  }
`

export const LIError = styled.div`
  color: red;
  font-size: 12px;
`

export const LIInput = styled.input`
    cursor: pointer;
    font-size: 15px;
    background: ${theme.bg3};
    border: 1px solid #000000;
    color: black;
    padding: 10px 20px;
`

export const LITitle = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`