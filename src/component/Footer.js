import React, {useState} from 'react'

import Pagination from 'react-bootstrap/Pagination';

const Footer = ({search, textSearch, pages}) => {
    const [page, setPage] = useState(1)

const handleNewPage = async (pag) => {
    await search(textSearch, pag)
    setPage(pag)
}

    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page} onClick={() => handleNewPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    
    return (
      <div>    
        <Pagination size="lg">{items}</Pagination>
        <br />
      </div>
    );
    
}

export default Footer