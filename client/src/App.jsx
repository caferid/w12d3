import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css'

function App() {
  const baseUrl = 'http://localhost:5000/users'
  const [products, setProducts] = useState([])
  async function fetchData() {
    const response = await axios(baseUrl);
    console.log("data",response);
    setProducts(response.data)

  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
      <>
      <h1>my products</h1>
      <div className="">
        {products && products.map((product) => (
          <div className='box' key={product.id}>
            <img src={product.image} alt="" />
            <div className="">
              <h2>{product.name}</h2>
              <p>{product.info}</p>
              <q>{product.price}</q>
            </div>
          </div>))}
          </div>
      </>
      )
  }

      export default App
