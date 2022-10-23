/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { AppContext } from "../context/AppContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [keyword, setKeyword] = useState("");
  const [exchangeData, setExchangeData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageItems, setPageItems] = useState([]);
  const [dragItem, setDragItem] = useState([]);

  const { savedData, setSavedData, status, setStatus } = useContext(AppContext);

  //================    Get Exchange Api Data   ===================//

  const url = `https://api.coingecko.com/api/v3/coins`;
  const getApiData = async () => {
    const resp = await axios.get(url);

    setExchangeData(resp.data);
    // for(let elem in exchangeData){
    //    if(exchangeData[elem] in savedData){
    //       setStatus([...status, exchangeData[elem].name]);
    //    }
    // }
    setPageCount(Math.ceil(resp.data?.length / 5));
    updatePageItems(1);
  };

  useEffect(() => {
    getApiData();
  }, []);

  // ======================================= pagination starts ======================
  const updatePageItems = (pageNo) => {
    const end = pageNo * 5;
    const start = end - 5;
    const items = exchangeData?.slice(start, end);
    setPageItems(items);
  };
  useEffect(() => {
    const items = exchangeData?.slice(0, 5);
    setPageItems(items);
  }, [exchangeData]);

  // handle page change
  const handlePageChange = (data) => {
    updatePageItems(data.selected + 1);
  };

  // ======================================= PAGINATION ENDS ========================

  //------------------------------ Clicked Handle ------------------------//
  let navigate = useNavigate(null);
  const handleClicked = (e, item, ind) => {
    if (e.target.innerHTML === "Save Data") {
      setSavedData([...savedData, item]);
      setStatus([...status, item.name]);
    } else {
      navigate("/view");
    }
  };

  //====================== Handle Drag ==============================//

  useEffect(() => {
    setDragItem(exchangeData);
  }, [exchangeData]);

  const handleDragEnd = (result) => {
    console.log("result", result);
    if (!result.destination) return;
    const items = Array.from(dragItem);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    setDragItem(items);
  };

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-left align-items-center"
        style={{ height: "150px", backgroundColor: "#35496B" }}
      >
        <h1 style={{ color: "#03A5E5" }}>Quikie </h1>
        <h3
          className="text-dark"
          style={{ marginTop: "53px", marginLeft: "-40px" }}
        >
          {" "}
          App
        </h3>
      </Container>

      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={dragItem}>
            {(provided) => (
              <Container>
 <div
                className="row gy-2 d-flex justify-content-between mt-4 mb-4"
                // style={{columnGap: '10px'}}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dragItem &&
                  dragItem
                    .slice(0, 3)
                    .map(({ id, name, symbol, image: { large }, market_data:{current_price} }, index) => (
                      <Draggable key={id} draggableId={`${id}`} index={index}>
                        {(provided) => (
                          <div
                            className="col-12 col-md-6 col-lg-3 border border-dash bg-light  "
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="">
                              <img
                                className="m-3"
                                src={large}
                                alt="thumb"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                }}
                              />
                              <div className="col-2 d-flex justify-content-right align-items-center"><h3>{name}</h3></div>
                              <div className="col-2 text-danger "><h5>{symbol}</h5></div>
                              <div className="col-4 text-primary "><h5>{current_price.usd}&nbsp;USD</h5></div>

                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </div>
              </Container>
             
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Container>
        <div>
          <Form.Control
            type="search"
            placeholder="Search"
            className="m-3 ms-0"
            aria-label="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
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
            {pageItems &&
              pageItems
                ?.filter((elem) => {
                  if (keyword == "") {
                    return elem;
                  } else if (
                    elem.name.toUpperCase().includes(keyword.toUpperCase())
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                })
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
                        <td>${item.market_data.current_price.usd}</td>
                        <td>
                          <button className="btn-primary btn" onClick={(e) => handleClicked(e, item, ind)}>
                            {status.includes(item.name) ? "View" : "Save Data"}
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
          </tbody>
        </Table>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          previousLabel={"<"}
          nextLabel={">"}
          pageRangeDisplayed={5}
          containerClassName={"pagination justify-content-end"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Container>
    </>
  );
}
export default Home;
//------//