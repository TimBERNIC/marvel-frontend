import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({
  skipComic,
  setSkipComic,
  homeData,
  comicsData,
  pageButton,
  setPageButton,
  skipCharacters,
  setSkipCharacters,
}) => {
  const location = useLocation();

  return (
    <div className="pagination-box">
      <div className="pagination-central-button-box">
        {location.pathname === "/home" && (
          <>
            {pageButton > 1 ? (
              <div
                className="pagination-button pagination-left-button"
                onClick={() => {
                  setSkipCharacters(skipCharacters - 100);
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
                  setSkipCharacters(skipCharacters + 100);
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
                  setSkipComic(skipComic - 12);
                  setPageButton(pageButton - 1);
                }}>
                {"<<"}
              </div>
            ) : (
              <div className="pagination-left-button"></div>
            )}

            <div className="page-number-box">{pageButton}</div>

            {comicsData.length === 12 ? (
              <div
                className="pagination-button pagination-rigth-button"
                onClick={() => {
                  setSkipComic(skipComic + 12);
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
      {pageButton > 1 && (
        <div
          className="pagination-button reset-pagination"
          onClick={() => {
            setSkipComic(0);
            setSkipCharacters(0);
            setPageButton(1);
          }}>
          Retour page 1
        </div>
      )}
    </div>
  );
};

export default Pagination;
