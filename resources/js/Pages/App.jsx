import React , { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import NavigationBar from '../Components/NavigationBar';
import Home from '../Components/Home';
import Store from '../Components/Store';
import Cart from '../Components/Cart';
import Contact from '../Components/Contact';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Footer from '../Components/Footer';
import ProductDetails from './ProductDetails';
import Checkout from '@/Components/Checkout';
import Dash from "@/Components/Dash";

function App() {
  const { url,props } = usePage();
  const noNavAndFooter = ['/loginn', '/signupp'].includes(url);

  useEffect(() => {
    document.title = 'Clothing Store';
  }, []);

  const isProductDetailsPage = url.startsWith('/productdetails');
  
  return (
      <div className="App">
          {!noNavAndFooter && <NavigationBar />}
          <div>
              {url === "/" && <Home />}
              {url === "/store" && <Store />}
              {url === "/cart" && <Cart />}
              {url === "/contact" && <Contact />}
              {url === "/loginn" && <Login />}
              {url === "/signupp" && <Signup />}
              {url === "/checkout" && <Checkout />}
              {url === "/dash" && <Dash/>}
              {isProductDetailsPage && <ProductDetails {...props} />}
          </div>
          {!noNavAndFooter && <Footer />}
      </div>
  );
}

export default App;
