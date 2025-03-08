import { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([
        { id: 101, customer: "John Doe", total: 2000, status: "Pending" },
        { id: 102, customer: "Jane Smith", total: 1500, status: "Completed" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
        available_colors: "",
        available_sizes: "",
        stock: "",
        category: "",
        gender: "",
        age_group: "",
    });

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleAddProduct = async () => {
        try {
            const formattedProduct = {
                ...newProduct,
                price: parseFloat(newProduct.price),
                available_colors: newProduct.available_colors.split(","),
                available_sizes: newProduct.available_sizes.split(","),
                stock: JSON.parse(newProduct.stock),
            };

            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setIsModalOpen(false);
            setNewProduct({
                name: "",
                price: "",
                image: "",
                available_colors: "",
                available_sizes: "",
                stock: "",
                category: "",
                gender: "",
                age_group: "",
            });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Products Management */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Manage Products</h2>
                <button
                    className="mb-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircle size={16} /> Add Product
                </button>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border p-2">{product.name}</td>
                                <td className="border p-2">${product.price}</td>
                                <td className="border p-2">
                                    {JSON.stringify(product.stock)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold">Add Product</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        {Object.keys(newProduct).map((field) => (
                            <input
                                key={field}
                                type="text"
                                placeholder={field
                                    .replace("_", " ")
                                    .toUpperCase()}
                                className="border p-2 w-full mb-2"
                                value={newProduct[field]}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        [field]: e.target.value,
                                    })
                                }
                            />
                        ))}
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            onClick={handleAddProduct}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
