import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";
import NavigationBar from "@/Components/NavigationBar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Footer from "@/Components/Footer";
import { Link } from "@inertiajs/inertia-react";
import Pagination from "@mui/material/Pagination";
import ProductCard from "@/Components/HomeComponents/ProductCard";
import { Snackbar, Alert } from "@mui/material";

let PRODUCTS_PER_PAGE = 3;

const StyledRadio = styled(Radio)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        borderRadius: "4px",
        border: "0",
        backgroundColor: "#FFFCFC",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    "&.Mui-checked .MuiSvgIcon-root": {
        backgroundColor: "#9AB5AE",
        borderColor: "#9AB5AE",
        color: "#FFFFFF",
    },
    "& .MuiSvgIcon-root path": {
        display: "none",
    },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: theme.spacing(0.1),
    "& .MuiTypography-root": {
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    "& .MuiFormControlLabel-label": {
        fontSize: "1rem",
        margin: 0,
        textAlign: "center",
    },
}));

export default function ProductDetails() {
    const urlPath = window.location.pathname;
    const id = urlPath.split("/").pop();
    const [counter, setCounter] = useState(1);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
     const [open, setOpen] = useState(false);
     const [snackbarSeverity, setSnackbarSeverity] = useState("success");
     const [snackbarMessage, setSnackbarMessage] = useState("Added To Cart");

     const handleClose = (event, reason) => {
         if (reason === "clickaway") {
             return;
         }
         setOpen(false);
     };

    const transformProduct = (product) => {
        return {
            id: product.id,
            imageUrl: product.image,
            title: product.name,
            category: product.category,
            price: product.price,
            discountPrice: product.discount_price || null,
            inStock: Object.values(product.stock).some((count) => count > 0),
            colors: product.available_colors,
        };
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const transformedProducts = data
                    .map(transformProduct)
                    .filter((product) => product.id !== id);
                setProducts(transformedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const removeProductById = (idToRemove) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== idToRemove)
        );
    };

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [otherImages, setOtherImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [size, setSize] = useState("M");
    const [color, setColor] = useState("");

const addToCart = () => {
    if (counter > 0) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = cart.findIndex(
            (item) =>
                item.productId === id &&
                item.color === color &&
                item.size === size
        );

        if (productIndex !== -1) {
            
            if (cart[productIndex].quantity < 10) {
                cart[productIndex].quantity = Math.min(
                    cart[productIndex].quantity + counter,
                    10
                );

                
                    setSnackbarMessage("Quantity updated in the cart");
                    setSnackbarSeverity("success");
                
            } else{
                setSnackbarMessage("Maximum quantity reached");
                setSnackbarSeverity("error");
            }
        } else {
            
            cart.push({
                productId: id,
                name: product.name,
                image: product.image,
                category: product.category,
                price: product.price,
                color,
                size,
                quantity: counter,
            });
            setSnackbarMessage("Added To Cart");
            setSnackbarSeverity("success");
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setOpen(true);
    } else {
        setSnackbarMessage("Product Not Available");
        setSnackbarSeverity("error");
        setOpen(true);
    }
};



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                const productData = response.data;
                setProduct(productData);

                if (productData.images && productData.images.length > 0) {
                    setMainImage(productData.image);
                    setOtherImages(productData.images.slice(0, 3));
                } else if (productData.image) {
                    setMainImage(productData.image);
                    setOtherImages([]);
                } else {
                    setMainImage("");
                    setOtherImages([]);
                }

               
                setColor(
                    productData.available_colors
                        ? productData.available_colors[0]
                        : ""
                );

               
                if (productData.stock) {
                    let maxStock = Object.values(productData.stock).reduce(
                        (total, value) => total + value,
                        0
                    );
                    if (maxStock > 10) {
                        maxStock = 10;
                    }
                    setMax(maxStock);
                    if (maxStock === 0) {
                        setCounter(0);
                    }
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    
    const [max, setMax] = useState(0);

    let min;
    if (max == 0) {
        min = 0;
    } else {
        min = 1;
    }

    const incrementCounter = () => {
        setCounter((prevCounter) => Math.min(prevCounter + 1, max));
    };

    const decrementCounter = () => {
        setCounter((prevCounter) => Math.max(prevCounter - 1, min));
    };

    const handleImageClick = (clickedImage) => {
        const clickedIndex = otherImages.indexOf(clickedImage);
        const newOtherImages = [...otherImages];
        newOtherImages[clickedIndex] = mainImage;
        setMainImage(clickedImage);
        setOtherImages(newOtherImages);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor);
    };

    if (loading)
        return (
            <div>
                <NavigationBar name={"store"} />
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
                    Product Details
                </h1>
                <h1 className="authTitles" style={{ marginTop: "10vh" }}>
                    Loading...
                </h1>
            </div>
        );
    if (error) return <div>Error fetching product data.</div>;

    const placeholderImage =
        "https://via.placeholder.com/600x400?text=No+Image+Available";

    return (
        <>
            <NavigationBar name={"store"} />
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
                Product Details
            </h1>
            <div style={{ paddingInline: "10vw", paddingBlock: "10vh" }}>
                <Grid item container spacing={2}>
                    <Grid item sm={12} md={2} style={{ paddingBlock: "3.5vh" }}>
                        <Stack
                            direction={{ xs: "row", sm: "row", md: "column" }}
                            spacing={2}
                            style={{ margin: "auto" }}
                        >
                            {otherImages.length > 0 ? (
                                otherImages.map((image, index) => (
                                    <div
                                        className="productDetailsImagesContainer"
                                        key={index}
                                    >
                                        <img
                                            src={image}
                                            alt={`product thumbnail ${
                                                index + 1
                                            }`}
                                            className="productDetailsImages"
                                            onClick={() =>
                                                handleImageClick(image)
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="productDetailsImagesContainer">
                                    <img
                                        src={placeholderImage}
                                        alt="placeholder"
                                        className="productDetailsImages"
                                    />
                                </div>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item sm={12} md={10}>
                        <div className="productDetailsContainer">
                            <Stack
                                direction="row"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    padding: "1%",
                                }}
                            >
                                <div className="productDetailsImageContainer">
                                    {mainImage ? (
                                        <img
                                            src={mainImage}
                                            alt="product main"
                                            className="productDetailsImage"
                                        />
                                    ) : (
                                        <div className="productDetailsImagePlaceholder">
                                            <p>
                                                {product?.name ||
                                                    "Product Name"}
                                            </p>
                                            <img
                                                src={placeholderImage}
                                                alt="placeholder"
                                                className="productDetailsImage"
                                            />
                                        </div>
                                    )}
                                </div>
                                <Stack
                                    spacing={2}
                                    className="productDetailsDetailsContainer"
                                >
                                    <h5
                                        className="authTitles"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            fontSize: "20px",
                                            margin: 0,
                                        }}
                                    >
                                        {product.name}
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Oxygen', sans-serif",
                                                color: "#A26D5D",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                            }}
                                        >
                                            {product.category}
                                        </span>
                                    </h5>

                                    <div
                                        style={{
                                            width: "95%",
                                            marginBlock: "1vh",
                                            height: "1px",
                                            background: "#00000060",
                                            marginLeft: "2.5%",
                                        }}
                                    ></div>

                                    <p style={{ fontSize: "18px" }}>Price:</p>

                                    {product.discount_price ? (
                                        <h1
                                            className="productDetailsPrice"
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                fontSize: "20px",
                                                margin: 0,
                                                paddingInline: "25%",
                                                fontWeight: "700",
                                                color: "#00192F",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "#9AB5AE",
                                                    textDecoration:
                                                        "line-through",
                                                    paddingRight: "2%",
                                                }}
                                            >
                                                {product.price}DA
                                            </span>
                                            {product.discount_price}DA
                                        </h1>
                                    ) : (
                                        <h1
                                            style={{
                                                textAlign: "center",
                                                fontSize: "22px",
                                                fontWeight: "700",
                                                color: "#00192F",
                                            }}
                                        >
                                            {product.price}DA
                                        </h1>
                                    )}

                                    <div
                                        style={{
                                            width: "95%",
                                            height: "1px",
                                            marginBlock: "1vh",
                                            background: "#00000060",
                                            marginLeft: "2.5%",
                                        }}
                                    ></div>

                                    <p style={{ fontSize: "18px" }}>Size:</p>
                                    <FormControl
                                        component="fieldset"
                                        style={{ marginInline: "auto" }}
                                    >
                                        <RadioGroup
                                            row
                                            aria-label="size"
                                            name="size"
                                            value={size}
                                            onChange={handleSizeChange}
                                        >
                                            {product.available_sizes?.map(
                                                (availableSize) => (
                                                    <StyledFormControlLabel
                                                        key={availableSize}
                                                        value={availableSize}
                                                        control={
                                                            <StyledRadio />
                                                        }
                                                        label={availableSize}
                                                    />
                                                )
                                            )}
                                        </RadioGroup>
                                    </FormControl>

                                    <div
                                        style={{
                                            width: "95%",
                                            marginBlock: "1vh",
                                            height: "1px",
                                            background: "#00000060",
                                            marginLeft: "2.5%",
                                        }}
                                    ></div>

                                    <p style={{ fontSize: "18px" }}>Color:</p>
                                    <FormControl
                                        component="fieldset"
                                        style={{
                                            marginInline: "auto",
                                        }}
                                    >
                                        <Stack direction="row" spacing={1}>
                                            {product.available_colors?.map(
                                                (availableColor) => (
                                                    <div
                                                        key={availableColor}
                                                        onClick={() =>
                                                            handleColorChange(
                                                                availableColor
                                                            )
                                                        }
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "4px",
                                                            backgroundColor:
                                                                availableColor,

                                                            position:
                                                                "relative",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            boxShadow:
                                                                "2px 2px 8px rgba(0, 0, 0, 0.4)",
                                                        }}
                                                    >
                                                        {color ===
                                                            availableColor && (
                                                            <i
                                                                className="fas fa-check"
                                                                style={{
                                                                    color: "#FFFCFC",
                                                                    fontSize:
                                                                        "20px",
                                                                    textShadow:
                                                                        "2px 2px 10px #00000090",
                                                                }}
                                                            ></i>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </Stack>
                                    </FormControl>

                                    <div
                                        style={{
                                            width: "95%",
                                            marginBlock: "1vh",
                                            height: "1px",
                                            background: "#00000060",
                                            marginLeft: "2.5%",
                                        }}
                                    ></div>

                                    <p style={{ fontSize: "18px" }}>
                                        Quantity :{" "}
                                        {counter === 0 ? (
                                            <span style={{ color: "#fa0a0e" }}>
                                                Out of Stock
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </p>

                                    <Stack
                                        direction="row"
                                        style={{
                                            marginInline: "auto",
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
                                                boxShadow:
                                                    "2px 2px 8px rgba(0, 0, 0, 0.4)",
                                                display: "flex",
                                            }}
                                        >
                                            <p style={{ margin: "auto" }}>
                                                {counter}
                                            </p>
                                        </div>
                                        &nbsp;
                                        <button onClick={incrementCounter}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </Stack>

                                    <div
                                        style={{
                                            width: "95%",
                                            marginBlock: "1vh",
                                            height: "1px",
                                            background: "#00000060",
                                            marginLeft: "2.5%",
                                        }}
                                    ></div>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-evenly"
                                    >
                                        <Link href="/cart">
                                            <button
                                                style={{
                                                    background: "#9AB5AE",
                                                    paddingBlock: "10px",
                                                    paddingInline: "20px",
                                                    borderRadius: "8px",
                                                    boxShadow:
                                                        "2px 2px 8px rgba(0, 0, 0, 0.4)",
                                                }}
                                                onClick={addToCart}
                                            >
                                                Buy now
                                            </button>
                                        </Link>

                                        <button
                                            style={{
                                                background: "#4C6665",
                                                paddingBlock: "10px",
                                                paddingInline: "20px",
                                                borderRadius: "8px",
                                                boxShadow:
                                                    "2px 2px 8px rgba(0, 0, 0, 0.4)",
                                                color: "#FCFCFC",
                                            }}
                                            onClick={addToCart}
                                        >
                                            Add to My Cart
                                        </button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Grid
                container
                spacing={5}
                style={{
                    marginTop: "2vh",
                    marginInline: "10vw",
                    marginBottom: "2vh",
                }}
            >
                {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={4} md={4} key={product.id}>
                        <ProductCard article={product} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "#00192F",
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#9AB5AE !important",
                        color: "#00192F",
                        boxShadow: "2px 2px 12px 0px #00000060",
                    },
                    "& .MuiPaginationItem-ellipsis": {
                        color: "#00192F",
                    },
                    marginBottom: "2vh",
                }}
                shape="rounded"
                count={Math.ceil(products.length / PRODUCTS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2%",
                }}
            />

            <Footer />
        </>
    );
}
