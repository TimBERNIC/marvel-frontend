import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ skip, setSkip, homeData, comicsData }) => {
  const [pageButton, setPageButton] = useState(1);
  const location = useLocation();

  return (
    <div className="pagination-box">
      {pageButton > 1 && (
        <div
          className="pagination-button reset-pagination"
          onClick={() => {
            setSkip(0);
            setPageButton(1);
          }}>
          Retour page 1
        </div>
      )}

      {location.pathname === "/home" && (
        <>
          {pageButton > 1 ? (
            <div
              className="pagination-button pagination-left-button"
              onClick={() => {
                setSkip(skip - 100);
                setPageButton(pageButton - 1);
              }}>
              {"<<"}
            </div>
          ) : (
            <div className="pagination-left-button"></div>
          )}

          <div className="page-number-box">{pageButton}</div>

          {homeData.length === 100 ? (
            <div
              className="pagination-button pagination-rigth-button"
              onClick={() => {
                setSkip(skip + 100);
                setPageButton(pageButton + 1);
              }}>
              {">>"}
            </div>
          ) : (
            <div className="pagination-rigth-button"></div>
          )}
        </>
      )}

      {location.pathname === "/comics" && (
        <>
          {pageButton > 1 ? (
            <div
              className="pagination-button pagination-left-button"
              onClick={() => {
                setSkip(skip - 10);
                setPageButton(pageButton - 1);
              }}>
              {"<<"}
            </div>
          ) : (
            <div className="pagination-left-button"></div>
          )}

          <div className="page-number-box">{pageButton}</div>

          {comicsData.length === 10 ? (
            <div
              className="pagination-button pagination-rigth-button"
              onClick={() => {
                setSkip(skip + 10);
                setPageButton(pageButton + 1);
              }}>
              {">>"}
            </div>
          ) : (
            <div className="pagination-rigth-button"></div>
          )}
        </>
      )}
    </div>
  );
};

export default Pagination;
