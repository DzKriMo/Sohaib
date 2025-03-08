import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ProductCard from "./HomeComponents/ProductCard";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import TextField from "@mui/material/TextField";
import Wave from "react-wavify";

let PRODUCTS_PER_PAGE = 9;

export default function Store() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [cat, setCat] = useState("All Categories");

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
                const transformedProducts = data.map(transformProduct);
                setProducts(transformedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setCat(category);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return (
        <>
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
                Discover Our Store
            </h1>

            <div style={{ paddingBlock: "5vh", paddingInline: "10vw" }}>
                <div
                    id="cat"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button
                                    className="cat"
                                    variant="text"
                                    {...bindTrigger(popupState)}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        color: "#4C6665",
                                        borderBottom: "1px solid black",
                                        textTransform: "none",
                                        width: "25%",
                                        borderRadius: "0",
                                    }}
                                >
                                    {cat}
                                    <span style={{ marginLeft: "auto" }}>
                                        &#9776;
                                    </span>
                                </Button>
                                <Menu
                                    {...bindMenu(popupState)}
                                    PaperProps={{
                                        className: "catt",
                                        style: {
                                            backgroundColor: "#9AB5AEBB",
                                            color: "#00192F",
                                            width: "20%",
                                            textTransform: "none",
                                            fontSize: "10px",
                                        },
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("");
                                            setCat("All Categories");
                                        }}
                                    >
                                        All Categories
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange(
                                                "Men's Clothing"
                                            );
                                        }}
                                    >
                                        Men's Clothing
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange(
                                                "Women's Clothing"
                                            );
                                        }}
                                    >
                                        Women's Clothing
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange(
                                                "Kids' Clothing"
                                            );
                                        }}
                                    >
                                        Kids' Clothing
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Accessories");
                                        }}
                                    >
                                        Accessories
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Footwear");
                                        }}
                                    >
                                        Footwear
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Outerwear");
                                        }}
                                    >
                                        Outerwear
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Activewear");
                                        }}
                                    >
                                        Activewear
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Formal Wear");
                                        }}
                                    >
                                        Formal Wear
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Casual Wear");
                                        }}
                                    >
                                        Casual Wear
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Swimwear");
                                        }}
                                    >
                                        Swimwear
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Loungewear");
                                        }}
                                    >
                                        Loungewear
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            popupState.close();
                                            handleCategoryChange("Underwear");
                                        }}
                                    >
                                        Underwear
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>

                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <Grid container spacing={4} style={{ marginTop: "2vh" }}>
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
                    }}
                    shape="rounded"
                    count={Math.ceil(
                        filteredProducts.length / PRODUCTS_PER_PAGE
                    )}
                    page={currentPage}
                    onChange={handlePageChange}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2%",
                    }}
                />
            </div>
        </>
    );
}
