import {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


//!------------ Component part --------------------//


export const Search = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
        navigate(`/search/${keyword}`)
      } else {
        navigate.push('/')
      }
    }
  
    return (
    <>
      <Form onSubmit={submitHandler} className='d-flex me-5 gap-1'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Rechereche de Produits'
          className='mr-sm-2 ml-sm-5'
          ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2 rounded' >
          Rechercher
        </Button>
      </Form>
    </>  
    )
  }
