import {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


//!------------ Component part --------------------//


export const Search = () => {
    const [keyword,setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }

    }


  return (
    <>
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
            type="text" 
            placeholder="Recherche de produits" 
            name='q'
            value={keyword} 
            onChange={(e)=>setKeyword(e.target.value)}
            className="mr-sm-2 ml-sm-5">
                <Button type="submit" variant="outline-success" className="p-2">Rechercher</Button>

            </Form.Control>
        </Form>
    </>
  )
}
