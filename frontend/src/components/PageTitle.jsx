import React from 'react'
import { Helmet } from "react-helmet";



export default function PageTitle({title}) {
  return (
    <>
        <Helmet>
          <title>{title}</title>
          <meta name='description' content='We sell the best products for cheap' />
      <meta name='keyword' content='electronics, buy electronics, cheap electroincs' />
        </Helmet>
    </>
  )
}
