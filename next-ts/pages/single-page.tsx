import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Default from '../components/Default'
import { Product } from '../models/Product'
import styles from '../styles/Home.module.css'
import urls from '../config/urls'
const Home: NextPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const getProducts = async () => {
        const data = await axios.get<Product[]>(urls.API_URL + "products").then(res => res.data)
        setProducts(data)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <Default>

            <div className="row">
                {
                    products.length ? products.map(product => (
                        <div key={product.id} className="col-md-4">
                            <div className="card mb-3">
                                <img src={product.image} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">
                                        {product.description}
                                    </p>
                                    <button className="btn addToCartBtn btn-sm btn-primary">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    )) : <p>No product found</p>
                }

            </div>
        </Default>
    )
}
export default Home
