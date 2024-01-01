import React, {useState} from 'react'

import Pagination from 'react-bootstrap/Pagination'

const Footer = ({search, textSearch, pageNumbers}) => {
    const [page, setPage] = useState(0)
    const [activePage, setActivePage] = useState(1)
    
    console.log(activePage)
    let paginationItems = [];
    if (pageNumbers) {
      for (let number = 1; number <= pageNumbers; number++) 
        paginationItems.push(
         <Pagination.Item key={number} active={number === activePage} onClick={() => handleShowNewPage(number)}>
          {number}
        </Pagination.Item>
      );
    }

    console.log(paginationItems)

    const handleShowNewPage = async (page) => {
      await search(textSearch, page)
      setActivePage(page)
    }

    const showPaginationNumbers = () => {
  
      if (pageNumbers) {
          let showMax = 10;
          let endPage;
          let startPage;
  
          if (pageNumbers <= showMax) {
              startPage = 0;
              endPage = pageNumbers;
          }
          else {
              startPage = page;
              if (startPage + 10  > pageNumbers) {
                  startPage = pageNumbers - 10
                  endPage = pageNumbers
              }
              else {
                  endPage = page + showMax
              }
          }
          
          return paginationItems.slice(startPage, endPage) 
      }
  }
  

   const handleFirst = () => {
      setPage(0)
      
    }

    const handlePrev = () => {
      if (page - 1 >= 0)
        setPage(page - 1)    

    }

    const handleNext = () => {
      if (page + 1 < paginationItems.length)
        setPage(page + 1)
      }

    const handleLast = () => {
      setPage(paginationItems.length - 1)
    }
    
    return (
      <div>
        <Pagination>
          <Pagination.First onClick={() => handleFirst()} />
          <Pagination.Prev onClick={() => handlePrev()} /> 
          {showPaginationNumbers()}
          <Pagination.Next  onClick={() => handleNext()} />
          <Pagination.Last  onClick={() => handleLast()} />
        </Pagination>    
        <br />
      </div>
    )
    
}

export default Footer