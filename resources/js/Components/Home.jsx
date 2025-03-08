import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FashionComponent from './HomeComponents/FashionComponent';
import ProductCard from './HomeComponents/ProductCard';
import MostSelled from './HomeComponents/MostSelled';
import ProductsDiscount from './HomeComponents/ProductsDiscount';
import AboutComponents from './HomeComponents/AboutComponents';






export default function Home() {
const [products, setProducts] = useState([]);
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

const articles = products
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) 
    .slice(0, 3);
const exampleProducts = products.filter(
    (product) => product.discountPrice !== null
);
console.log(exampleProducts)
const mostSelledProduct = {
    title: "Stylish Jacket",
    category: "Men",
    originalPrice: "4500DA",
    discountPrice: "2500DA",
    imageUrl:
        "https://ideogram.ai/assets/image/lossless/response/d8NnEIFtTCm9eWQaCs1P9w",
};

  return (
    <>
   
    <h1 style={{textAlign:"center",fontFamily:"'Playfair Display', serif",background:"#9AB5AE",fontSize:"30px",fontWeight:"600",paddingBottom:"10px",marginTop:"-5px"}}>Welcome to Clothing Store ! </h1>
    
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff',paddingBottom:"5vh" }}>
    
      <Box sx={{ width: '100%' ,paddingTop:{xs:"10vh", sm:"0"}}}> 
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ height: { xs: '150vh', sm: '100vh' }, width: '100%' }}>
          <Box sx={{  width: { xs: '100%', sm: '50%' }, height: "100%", display: "flex", flexDirection: "column", paddingTop: "5%" }}>
            <FashionComponent sx={{ margin: "auto" }} />
          </Box>
          <Box id="mostSelledContainer" sx={{ background: "#ffffff", width: { xs: '100%', sm: '50%' }, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",paddingTop: "5%" }}>
           <MostSelled product={mostSelledProduct}/>
          </Box>
        </Stack>
      </Box>
    </Box>

    <h1 style={{textAlign:"center",fontFamily:"'Playfair Display', serif",fontSize:"30px",fontWeight:"600",marginBlock:"5vh"}}>Our Newest Products</h1>
    
  <div style={{display:"flex",paddingBottom:"15vh"}}>
  <Stack direction={{ xs: 'column', sm: 'row' }} style={{margin:"auto"}} spacing={5}>
  {articles.map(article => (
    <ProductCard key={article.id} article={article} />
  ))}
  </Stack>
  </div>
  


  <ProductsDiscount products={exampleProducts}/>


  <h1 style={{textAlign:"center",fontFamily:"'Playfair Display', serif",fontSize:"30px",fontWeight:"600",marginBlock:"5vh"}}>About the store</h1>



  
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} justifyContent="center" style={{paddingBlock:"10vh"}} >
  <AboutComponents title="Shipping 58 Wilayas" infos="We offer shipping to all 58 wilayas of Algeria! No matter where you are, you can enjoy our products delivered right to your doorstep. Shop with us and experience convenient, nationwide delivery."/>
  <AboutComponents title="Hand to Hand Payement" infos="Take advantage of our convenient payment on delivery option! Shop with confidence knowing you can pay for your order upon arrival. Experience a seamless and secure shopping journey with us."/>
  <AboutComponents title="We Are On Social Media" infos="Stay connected with us on social media for the latest updates, exclusive offers, and behind-the-scenes content. Join our community and be the first to know about new arrivals, special promotions, and more."/>
  </Stack>
  



    </>


  );
}
