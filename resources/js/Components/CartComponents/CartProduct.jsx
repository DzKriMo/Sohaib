import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";

const removeFromCart = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (index > -1 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    } else {
        console.error("Invalid index");
    }
};

export default function CartProduct({ product, index }) {
    const [counter, setCounter] = useState(product.quantity);

    const incrementCounter = () => {
        setCounter((prevCounter) => Math.min(prevCounter + 1, 10));
    };

    const decrementCounter = () => {
        setCounter((prevCounter) => Math.max(prevCounter - 1, 1));
    };

    const handleRemove = () => {
        removeFromCart(index);
    };

    return (
        <>
            <div
                style={{
                    height: "1px",
                    background: "#000000A0",
                    marginInline: "5vw",
                    marginBlock: "2vh",
                }}
            ></div>
            <Grid
                item
                container
                spacing={2}
                style={{
                    paddingInline: "5vw",
                }}
            >
                <Grid item xs={3} sm={4}>
                    <div className="cartProductImageContainer">
                        <img
                            src={product.image}
                            alt=""
                            className="cartProductImage"
                        />
                    </div>
                </Grid>

                <Grid item xs={3} sm={4}>
                    <Stack
                        direction="column"
                        spacing={1}
                        justifyContent="space-evenly"
                        style={{
                            height: "100%",
                        }}
                    >
                        <h1
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#00192F",
                            }}
                        >
                            {product.name}
                        </h1>
                        <p
                            style={{
                                color: "#4C6665",
                                fontSize: "14px",
                            }}
                        >
                            {product.category}
                        </p>

                        <p>Color : {product.color}</p>
                        <p>Size : {product.size}</p>
                        <button onClick={handleRemove}>
                            <p
                                className="cartProductRemove"
                                style={{
                                    cursor: "pointer",
                                    background: "#4C6665",
                                    marginRight: "45%",
                                    paddingBlock: "8px",
                                    textAlign: "center",
                                    color: "#fff",
                                    borderRadius: "4px",
                                    boxShadow: "2px 2px 15px 0px #00000060",
                                }}
                            >
                                Remove
                            </p>
                        </button>
                    </Stack>
                </Grid>

                <Grid item sm={2} xs={3}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <Stack
                            direction="row"
                            style={{
                                margin: "auto",
                            }}
                        >
                            <button onClick={decrementCounter}>
                                <i className="fas fa-minus"></i>
                            </button>
                            &nbsp;
                            <div
                                style={{
                                    fontSize: "1rem",
                                    width: "3vw",
                                    aspectRatio: "1/1",
                                    textAlign: "center",
                                    marginInline: "1vw",
                                    cursor: "pointer",
                                    background: "#9AB5AE",
                                    borderRadius: "4px",
                                    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
                                    display: "flex",
                                }}
                            >
                                <p style={{ margin: "auto" }}>{counter}</p>
                            </div>
                            &nbsp;
                            <button onClick={incrementCounter}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </Stack>
                    </div>
                </Grid>

                <Grid item sm={2} xs={3}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <h1
                            className="cartPrice"
                            style={{
                                margin: "auto",
                                textAlign: "center",
                                fontSize: "24px",
                                fontWeight: "700",
                            }}
                        >
                            {product.price}DA
                        </h1>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
