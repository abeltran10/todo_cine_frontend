import React, {useState} from 'react'

import Pagination from 'react-bootstrap/Pagination'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'


const Paginator = ({functionSearch, param, pageNumbers}) => {
    const [page, setPage] = useState(0)
    const [activePage, setActivePage] = useState(1)
    
    let paginationItems = [];
    if (pageNumbers) {
      for (let number = 1; number <= pageNumbers; number++) 
        paginationItems.push(
         <Pagination.Item key={number} active={number === activePage} onClick={() => handleShowNewPage(number)}>
          {number}
        </Pagination.Item>
      );
    }


    const handleShowNewPage = async (page) => {
      await functionSearch(param, page)
      setPage(page - 1)
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
      handleShowNewPage(1)
      
    }

    const handlePrev = () => {
      if (page - 1 >= 0) {        
        setPage(page - 1)
      
        handleShowNewPage(activePage - 1)
      }

    }

    const handleNext = () => {
      if (page + 1 < paginationItems.length) {
        setPage(page + 1)

        handleShowNewPage(activePage + 1)
      }
        
      }

    const handleLast = () => {
      setPage(paginationItems.length - 1)
      handleShowNewPage(paginationItems.length)
    }
    
    return (
      <Container className='p-3 mb-2' fluid="md">
        <Row className="justify-content-md-center">
          <Col>
            <Pagination>
              <Pagination.First onClick={() => handleFirst()} />
              <Pagination.Prev onClick={() => handlePrev()} /> 
              {showPaginationNumbers()}
              <Pagination.Next  onClick={() => handleNext()} />
              <Pagination.Last  onClick={() => handleLast()} />
            </Pagination>
          </Col>    
        </Row>         
        <br />
      </Container>
    )
    
}

export default Paginator