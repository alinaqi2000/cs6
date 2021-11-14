import React from 'react'

export default function Default({ children }: { children: JSX.Element | JSX.Element[] | string }) {
    return (
        <>
            <div className="container mt-5">
                {children}
            </div>
            <div className="cart">
                <div className="cart-title">
                    <h4>Cart</h4>
                    <div className="options">
                        <span className="items">6</span>
                        <span className="action" id="cartToggle"><i className="fa fa-angle-down"></i
                        ></span>
                    </div>
                </div>
                <div className="cart-body show">
                    <ul className="list-group" id="cartList"></ul>
                </div>
            </div>
        </>
    )
}
