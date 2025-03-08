import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { Link } from "@inertiajs/inertia-react";

const OuterBox = styled(Box)({
    position: "relative",
    width: "75%",
    margin: "auto",
    aspectRatio: "1200 / 650",
});

const InnerBox = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "1px solid #4C6665",
    borderRadius: "10px",
    zIndex: 1,
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    pointerEvents: "none",
});

const ContentBox = styled(Box)({
    position: "relative",
    backgroundColor: "#BCD7D0",
    borderRadius: "10px",
    padding: "20px 40px",
    zIndex: 2,
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
});

const StyledLink = styled(Link)({
    display: "inline-block",
    padding: "10px 25px",
    backgroundColor: "#4C6665",
    color: "#ffffff",
    borderRadius: "12px",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "100",
    boxShadow: "5px 5px 13px 1px #00000040",
    transition: "color 0.3s, box-shadow 0.3s",
    "&:hover": {
        color: "#00192F",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    },
});

export default function ProductsDiscount({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!products || products.length === 0) {
        return <Typography>No products available.</Typography>;
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    };

    const product = products[currentIndex];

    return (
        <div style={{ paddingBottom: "20vh" }}>
            <OuterBox id="discount">
                <InnerBox
                    style={{
                        backgroundColor: "#e9e9e900",
                        top: "-20px",
                        left: "-10px",
                        border: "1px solid #00192F",
                        zIndex: "20",
                    }}
                />
                <InnerBox
                    style={{
                        backgroundColor: "#e9e9e900",
                        top: "20px",
                        left: "10px",
                        border: "1px solid #00192F",
                        zIndex: "20",
                    }}
                />
                <InnerBox
                    style={{
                        backgroundColor: "#9AB5AE",
                        top: "55px",
                        left: "40px",
                        boxShadow: "5px 5px 13px 1px #00000060",
                    }}
                />

                <ContentBox
                    style={{
                        width: "100%",
                        height: "100%",
                        boxShadow: "5px 5px 13px 1px #00000060",
                    }}
                >
                    <Grid container style={{ width: "100%", height: "100%" }}>
                        <Grid item xs={12} sm={6}>
                            <Stack
                                direction="row"
                                spacing={2}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "15%",
                                    }}
                                >
                                    <i
                                        className="fas fa-chevron-left"
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                            scale: "2",
                                            alignSelf: "flex-start",
                                        }}
                                        onClick={handlePrev}
                                    ></i>
                                </div>
                                <Stack
                                    style={{
                                        height: "100%",
                                        marginTop: "5%",
                                        width: "70%",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "10px",
                                            background: "#4C6665",
                                            borderRadius: "2vh",
                                            borderTopRightRadius: "10vh",
                                            width: "100%",
                                            aspectRatio: "4/5",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center center",
                                            }}
                                        />
                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item sm={8} xs={12}>
                                            <p
                                                style={{
                                                    fontFamily:
                                                        "'Playfair Display', serif",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {product.title}
                                            </p>
                                        </Grid>
                                        <Grid item sm={4} xs={12}>
                                            <p
                                                style={{
                                                    color: "#4C6665",
                                                    fontSize: "18px",
                                                    textAlign: "end",
                                                }}
                                            >
                                                {product.category}
                                            </p>
                                        </Grid>
                                        <Grid item sm={4} xs={12}>
                                            <p style={{ fontWeight: "600" }}>
                                                <span
                                                    style={{
                                                        color: "#4C6665",
                                                        textDecoration:
                                                            "line-through",
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    {
                                                        product.price}
                                                </span>
                                                &nbsp;
                                                {product.discountPrice}DA
                                            </p>
                                        </Grid>
                                        <Grid
                                            item
                                            sm={8}
                                            xs={12}
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                            }}
                                        >
                                            <StyledLink>
                                                See more details
                                            </StyledLink>
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        width: "15%",
                                    }}
                                >
                                    <i
                                        className="fas fa-chevron-right"
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                            alignSelf: "flex-end",
                                            scale: "2",
                                        }}
                                        onClick={handleNext}
                                    ></i>
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Stack
                                    style={{ margin: "auto", width: "100%" }}
                                    spacing={4}
                                >
                                    <h1
                                        style={{
                                            textAlign: "start",
                                            fontFamily:
                                                "'Playfair Display', serif",
                                            fontWeight: "600",
                                            fontSize: "24px",
                                        }}
                                    >
                                        Check Our Products <br /> On Discount
                                    </h1>
                                    <p>
                                        Enjoy up to 50% off on selected items.
                                        Limited-time offers at unbeatable
                                        prices. Hurry, while stocks last! Shop
                                        now to take advantage of our spectacular
                                        discounts!
                                    </p>
                                    <StyledLink
                                        style={{
                                            marginInline: "15%",
                                            fontSize: "16px",
                                            paddingBlock: "10px",
                                        }}
                                        href="/store"
                                    >
                                        See more Products
                                    </StyledLink>
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                </ContentBox>
            </OuterBox>
        </div>
    );
}
