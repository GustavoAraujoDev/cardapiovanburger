import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/api"; // Importando o tipo Product e a função fetchProducts
import logovanburger from "../assets/logovanburger.jpeg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa";
import { Product } from "../types/Product";
const HomePage: React.FC = () => {
  // Estado para armazenar produtos e categoria selecionada
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const navigate = useNavigate();

  // Rola para a categoria específica
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Carrega os produtos da API
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Agrupar produtos por categoria
  const groupByCategory = (products: Product[]): Record<string, Product[]> => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };

  const groupedProducts = groupByCategory(products);

  // Filtrar produtos por categoria
  const filteredProducts = selectedCategory
    ? groupedProducts[selectedCategory] || []
    : products;
  if (!products) return <div>Loading...</div>;
  return (
    <div>
      {/* Header */}
      <header
        className="header"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img src={logovanburger} alt="Logo VanBurger" width={83} />
        <h3 style={{ color: "#f8ae30" }}>VanBurger Pizzaria e Lanchonete</h3>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Bem-vindo à Vanburger Pizzaria e Lanchonete!</h1>
        <p>
          Explore nossas categorias e descubra uma seleção de lanches e pizzas
          deliciosos, preparados com todo o cuidado e sabor especialmente para
          você.
        </p>
      </section>

      {/* Menu de Categorias */}
      <nav
        className="category-menu"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          overflowX: "auto",
          height: "35px",
          margin: "15px",
          padding: "20px",
          border: "none",
        }}
      >
        {Object.keys(groupedProducts).map((category) => (
          <button
            key={category}
            style={{
              borderRadius: "25px",
              height: "35px",
              width: "130px",
              backgroundColor: "#f8ae30",
              border: "none",
              margin: "15px",
              color: "black",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.3)", // Use camelCase para boxShadow
            }}
            onClick={() => scrollToCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Lista de Produtos */}
      <section className="products">
        {Object.keys(groupedProducts).map((category) => (
          <div key={category} id={category}>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {category}
            </h2>
            <div
              className="product-list"
              style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
            >
              {groupedProducts[category].map((product) => (
                <ProductCard key={product._id.toString()} product={product} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        className="footer"
        style={{
          marginTop: "15px",
          backgroundColor: "black",
          color: "#f8ae30",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
        }}
      >
        <img src={logovanburger} alt="Logo VanBurger" width={77} />
        <p>Endereço: Rua Padre Zé Moura, 125, Caucaia, Ceará, Brasil</p>
        <p>
          Contato: <FaWhatsapp size={15} /> (85) 98519-2579 |{" "}
          <FaPhone size={15} /> (85) 3256-2177
        </p>
        <a
          href="https://wa.me/5585985192579?text=Quero%20fazer%20meu%20pedido%20na%20Vanburger%20Pizzaria%20e%20Lanchonete"
          style={{ textDecoration: "none", color: "#f8ae30" }}
        >
          <FaWhatsapp size={15} />
          Whatsapp
        </a>
        <a
          href="https://www.instagram.com/vanbunguerlanches?igsh=MWh6amd0YndpMnZ5"
          style={{ textDecoration: "none", color: "#f8ae30" }}
        >
          <FaInstagram size={15} /> Instagram
        </a>
        <p>
          &copy; 2024 VanBurger Pizzaria e Lanchonete. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
