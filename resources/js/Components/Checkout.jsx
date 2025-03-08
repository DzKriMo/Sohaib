import React, { useEffect, useState } from "react";
import {
    Grid,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import FormLabel from "@mui/joy/FormLabel";
import wilayas from "./data/Wilaya_Of_Algeria.json";
import communes from "./data/Commune_Of_Algeria.json";
import Order from "./CheckoutComponents/Order";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedWilaya, setSelectedWilaya] = useState("");
    const [filteredCommunes, setFilteredCommunes] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState("");

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        const calculatedSubtotal = storedCart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        setSubtotal(calculatedSubtotal);
        setTotal(calculatedSubtotal + shipping);
    }, [shipping]);

    const handleWilayaChange = (event) => {
        const selectedWilayaId = event.target.value;
        setSelectedWilaya(selectedWilayaId);

        const filtered = communes.filter(
            (commune) => commune.wilaya_id === selectedWilayaId
        );
        setFilteredCommunes(filtered);
        setSelectedCommune("");
    };

    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };

    return (
        <>
            <Grid container style={{ minHeight: "60vh", padding: "5%" }}>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={5}>
                        <h1
                            style={{
                                fontSize: "1.5rem",
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: "600",
                            }}
                        >
                            Ordering Details
                        </h1>
                        <FormControl
                            sx={{
                                width: {
                                    xs: "90%",
                                    sm: "45%",
                                },
                            }}
                        >
                            <FormLabel>First Name</FormLabel>
                            <input className="authInput" />
                        </FormControl>

                        <FormControl
                            sx={{
                                width: {
                                    xs: "90%",
                                    sm: "45%",
                                },
                            }}
                        >
                            <FormLabel>Family Name</FormLabel>
                            <input className="authInput" />
                        </FormControl>
                    </Stack>

                    <FormControl
                        style={{ marginTop: "5vh" }}
                        sx={{
                            width: {
                                xs: "90%",
                                sm: "55%",
                            },
                        }}
                    >
                        <FormLabel>Phone Number</FormLabel>
                        <input className="authInput" />
                    </FormControl>

                    <FormControl
                        style={{ marginTop: "5vh" }}
                        sx={{
                            width: {
                                xs: "90%",
                                sm: "65%",
                            },
                        }}
                    >
                        <FormLabel>Email (Optional)</FormLabel>
                        <input className="authInput" />
                    </FormControl>

                    <Stack
                        style={{
                            width: "65%",
                            marginTop: "5vh",
                        }}
                        direction="row"
                        justifyContent="space-between"
                    >
                        <FormControl
                            sx={{
                                width: {
                                    xs: "90%",
                                    sm: "45%",
                                },
                            }}
                        >
                            <InputLabel>Wilaya</InputLabel>
                            <Select
                                value={selectedWilaya}
                                onChange={handleWilayaChange}
                                className="authInput"
                            >
                                {wilayas.map((wilaya) => (
                                    <MenuItem key={wilaya.id} value={wilaya.id}>
                                        {wilaya.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            sx={{
                                width: {
                                    xs: "90%",
                                    sm: "45%",
                                },
                            }}
                        >
                            <InputLabel>Commune</InputLabel>
                            <Select
                                value={selectedCommune}
                                onChange={handleCommuneChange}
                                disabled={!selectedWilaya}
                                className="authInput"
                            >
                                {filteredCommunes.map((commune) => (
                                    <MenuItem
                                        key={commune.id}
                                        value={commune.id}
                                    >
                                        {commune.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <FormControl
                        style={{ marginTop: "5vh" }}
                        sx={{
                            width: {
                                xs: "90%",
                                sm: "65%",
                            },
                        }}
                    >
                        <FormLabel>Street Adress</FormLabel>
                        <input className="authInput" />
                    </FormControl>

                    <FormControl style={{ marginTop: "5vh" }}>
                        <FormLabel id="shipping-mode">
                            Shipping Method
                        </FormLabel>
                        <RadioGroup
                            row
                            name="shipping-mode"
                            style={{ width: "50vw" }}
                        >
                            <FormControlLabel
                                value="Home"
                                control={<Radio />}
                                label="Home"
                            />
                            <FormControlLabel
                                value="DeliveryOffice"
                                control={<Radio />}
                                label="Delivery Office"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl
                        style={{ marginTop: "5vh" }}
                        sx={{
                            width: {
                                xs: "90%",
                                sm: "65%",
                            },
                        }}
                    >
                        <FormLabel>Anything to Add ?</FormLabel>
                        <input
                            className="authInput"
                            style={{ height: "20vh" }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={5}>
                        <h1
                            style={{
                                fontSize: "1.5rem",
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: "600",
                            }}
                        >
                            Order Summary
                        </h1>
                        <div
                            style={{
                                width: "100%",
                                boxShadow: "2px 2px 15px 0px #00000060",
                                borderRadius: "10px",
                                padding: "2%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    paddingBlock: "3vh",
                                    paddingInline: "5%",
                                }}
                            >
                                <p
                                    className="checkoutTitles"
                                    style={{
                                        width: "40%",
                                    }}
                                >
                                    Product
                                </p>
                                <p
                                    className="checkoutTitles"
                                    style={{
                                        width: "20%",
                                        textAlign: "center",
                                    }}
                                >
                                    Quantity
                                </p>
                                <p
                                    className="checkoutTitles"
                                    style={{
                                        width: "20%",
                                        textAlign: "center",
                                    }}
                                >
                                    Price
                                </p>
                            </div>

                            <ul
                                className="checkoutList"
                                style={{
                                    maxHeight: "70vh",
                                    overflowY: "scroll",
                                }}
                            >
                                {cart.map((item, index) => (
                                    <>
                                        <Order key={index} product={item} />
                                    </>
                                ))}
                            </ul>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                boxShadow: "2px 2px 15px 0px #00000060",
                                borderRadius: "10px",
                            }}
                        >
                            <p className="priceDetailsCheckout">
                                Subtotal Price:{" "}
                                <span className="priceDetailsCheckoutDA">
                                    {subtotal}DA
                                </span>
                            </p>
                            <div
                                style={{
                                    width: "100%",
                                    height: "1px",
                                    background: "#4C6665",
                                }}
                            ></div>
                            <p className="priceDetailsCheckout">
                                Shipping Price:{" "}
                                <span className="priceDetailsCheckoutDA">
                                    {shipping}DA
                                </span>
                            </p>
                            <div
                                style={{
                                    width: "100%",
                                    height: "1px",
                                    background: "#4C6665",
                                }}
                            ></div>
                            <p className="priceDetailsCheckout">
                                Shipping Price:{" "}
                                <span className="priceDetailsCheckoutDA">
                                    {total}DA
                                </span>
                            </p>
                        </div>
                        <button
                            style={{
                                background: "#4C6665",
                                marginInline: "30%",
                                padding: "2%",
                                borderRadius: "10px",
                                color: "#DBDAD5",
                                boxShadow: "2px 2px 15px 0px #00000060",
                                marginTop:"10vh"
                            }}
                        >
                            Validate Order
                        </button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
