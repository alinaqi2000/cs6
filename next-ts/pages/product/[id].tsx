import React from 'react'
import Default from '../../components/Default'
import { Product } from '../../models/Product'
import Link from 'next/link';
import axios from 'axios';
import urls from '../../config/urls';

export default function SingleProduct({ product }: { product: Product }) {
    return (
        <Default>
            <div className="row">
                <Link href="/static-site-generation"><h6>
                    <i className="fa fa-angle-left"></i>  Go Back
                </h6></Link>


                <div className="col-md-4">
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
            </div>
        </Default>
    )
}
export const getStaticProps = async ({ params }: { params: any }) => {

    const product = await axios.get<Product[]>(urls.API_URL + "products/" + params.id).then(res => res.data)
    return {
        props: { product }
    }
}
export const getStaticPaths = async () => {
    const products = await axios.get<Product[]>(urls.API_URL + "products").then(res => res.data)
    const paths = products.map((p) => ({
        params: { id: p.id },
    }))
    return {
        paths,
        fallback: false
    };
}