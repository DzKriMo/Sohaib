import React from "react";
import { Stack } from "@mui/material";

export default function Order({product}) {
    return (
        <div>
            <div
                style={{ width: "100%", height: "1px", background: "#4C6665" }}
            ></div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingBlock: "3vh",
                    paddingInline: "2%",
                }}
            >
                <img
                    src={product.image}
                    alt="product image"
                    style={{
                        width: "20%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: "5%",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        width: "20%",
                    }}
                >
                    <h5
                        style={{
                            fontSize: "16px",
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: "600",
                        }}
                    >
                        {product.name}
                    </h5>
                    <p>Color : {product.color}</p>
                    <p>Size : {product.size}</p>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        width: "20%",
                    }}
                >
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "22px",
                            fontWeight: "600",
                        }}
                    >
                        {product.quantity}
                    </p>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        width: "20%",
                    }}
                >
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "22px",
                            fontWeight: "600",
                        }}
                    >
                        {product.price}DA
                    </p>
                </div>
            </div>
        </div>
    );
}
