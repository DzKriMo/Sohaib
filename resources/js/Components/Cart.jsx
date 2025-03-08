import React, { useState, useEffect } from "react";
import NavigationBar from "@/Components/NavigationBar";
import Footer from "@/Components/Footer";
import CartProduct from "./CartComponents/CartProduct";
import Grid from "@mui/material/Unstable_Grid2";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    };

    const handleCheckout = () => {
       
        window.location.href = "/checkout";
    };

    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    fontFamily: "'Playfair Display', serif",
                    background: "#9AB5AE",
                    fontSize: "30px",
                    fontWeight: "600",
                    paddingBottom: "10px",
                    marginTop: "-5px",
                }}
            >
                My Cart
            </h1>
            {cart.length > 0 ? (
                <>
                    <div style={{ paddingInline: "10vw", paddingBlock: "5vh" ,minHeight:"70vh"}}>
                        <Grid
                            item
                            container
                            spacing={2}
                            style={{
                                paddingInline: "5vw",
                            }}
                        >
                            <Grid xs={6} sm={8}>
                                <p
                                    className="CartTitles"
                                    style={{
                                        textAlign: "start",
                                        marginLeft: "3vw",
                                    }}
                                >
                                    Product
                                </p>
                            </Grid>

                            <Grid xs={3} sm={2}>
                                <p className="CartTitles">Quantity</p>
                            </Grid>
                            <Grid xs={3} sm={2}>
                                <p className="CartTitles">Price</p>
                            </Grid>
                        </Grid>
                        <ul>
                            {cart.map((item, index) => (
                                <>
                                    <CartProduct key={index} product={item} index={index}/>
                                </>
                            ))}
                        </ul>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                paddingRight: "5vw",
                                gap: "1vw",
                                paddingTop:"5vh"
                            }}
                        >
                            <button
                                onClick={handleCheckout}
                                style={{
                                    background: "#9AB5AE",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    marginLeft: "1rem",
                                    boxShadow: "2px 2px 15px 0px #00000060",
                                }}
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={clearCart}
                                style={{
                                    background: "#4C6665",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    color: "#FCFCFC",
                                    boxShadow: "2px 2px 15px 0px #00000060",
                                }}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ height: "80vh", display: "flex" }}>
                    <div style={{ margin: "auto" }}>
                        <h1 className="authTitles">Your cart is empty</h1>
                        <p
                            style={{
                                marginTop: "5vh",
                                textAlign: "center",
                                fontWeight: "600",
                                color: "#00192F",
                            }}
                        >
                            Your future purchases will appear here
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
