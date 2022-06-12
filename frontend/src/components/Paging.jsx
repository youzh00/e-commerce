import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { v4 as uuidv4 } from 'uuid';

export default function Paging({pages,page,isAdmin=false,keyword=''}) {
    
   
  return pages> 1 && (
      <Pagination>
          {[...Array(pages).keys()].map((x)=>(
              
              <LinkContainer key={uuidv4()} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`:`/admin/productslist/${x+1}`}>
                  <Pagination.Item active={x+1===page}>{x+1}</Pagination.Item>
              </LinkContainer>
          ))}
      </Pagination>
  )
}
