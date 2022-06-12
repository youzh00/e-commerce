import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Carousel,Image} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Spinner from './Spinner'
import Message from './Message'
import {listTopProducts} from '../actions/productActions'

export const ProductCarousel = () => {
    const dispatch = useDispatch()

    const topProducts=useSelector(state=>state.productTopRated)
    const {products, loading, error } = topProducts

    useEffect(()=>{
            dispatch(listTopProducts())
    },[dispatch])


  return loading  ? <Spinner /> : error ? <Message variant="danger">{error}</Message>:(
      <Carousel pause='hover' className='bg-dark'>
          {products.map(product =>(
              <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} ({product.price})</h2>
                        </Carousel.Caption>
                    </Link>
              </Carousel.Item>
          ))}
      </Carousel>
  )
}
