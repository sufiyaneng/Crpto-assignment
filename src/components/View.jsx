/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react'
import { Container, Table } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";


function View() {
  const {savedData}=useContext(AppContext);
  let navigate  = useNavigate(null);

 
  return (
  <>
   <Container
        fluid
        className="d-flex justify-content-left align-items-center"
        style={{ height: "150px", backgroundColor: "#35496B" }}
      >
        <h1 style={{color: '#03A5E5'}}>Quikie </h1>
        <h3
          className="text-dark"
          style={{ marginTop: "53px", marginLeft: "-40px" }}
        >
          {" "}
          App
        </h3>
      </Container>
      <Container>
        
      </Container>

      <Container>
       
       

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>COMPANY NAME</th>
              <th>LOGO</th>
              <th>SYMBOL</th>
              <th> RANK</th>
              <th>CURRENT PRICE</th>
            </tr>
          </thead>
          <tbody>
            {savedData &&
              savedData
               
                .map((item, ind) => {
                  return (
                    <>
                      <tr key={ind}>
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={item.image.large}
                            alt="no image"
                            style={{
                              width: "36px",
                              height: "36px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{item.symbol}</td>
                        <td>{item.market_data.market_cap_rank}</td>
                        <td>{item.market_data.current_price.usd}</td>
                        <td>
                          {/* <button onClick={()=>handleClicked(item)}>Save Data</button> */}
                        </td>
                      </tr>
                    </>
                  );
                })}
          </tbody>
        </Table>
        <button onClick={()=>navigate(-1)}>Back</button>
      </Container>
       
   </>
  )
}

export default View;