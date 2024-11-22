import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/api";
import logovanburger from "../assets/logovanburger.jpeg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaArrowLeft } from "react-icons/fa";
import { Product } from "../types/Product";
import { toast, ToastContainer } from "react-toastify"; // Importando Toastify
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  console.log(product);
  const { id } = useParams<{ id?: string }>(); // id pode ser string ou undefined
  const history = useNavigate();

  const backmenu = () => {
    return history("/"); // Redireciona de volta ao menu
  };

  useEffect(() => {
    const loadProductDetails = async () => {
      if (id) {
        try {
          const data = await fetchProductById(id); // Tenta buscar o produto
          setProduct(data);
          toast.success("Produto carregado com sucesso!"); // Exibe toast de sucesso
        } catch (error) {
          console.error("Erro ao carregar o produto:", error);
          toast.error("Erro ao carregar o produto. Tente novamente!"); // Exibe toast de erro
        }
      } else {
        toast.error("ID do produto não fornecido."); // Exibe toast de erro caso o id seja undefined
      }
    };
    loadProductDetails();
  }, [id]); // Recarrega o produto se o ID mudar

  if (!product) return <div>Loading...</div>; // Exibe "Loading..." até o produto ser carregado

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logovanburger}
        alt=""
        width={76}
        style={{
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.3)", // Use camelCase para boxShadow
        }}
      />
      <h2>Detalhes do Produto</h2>
      <div
        className="product-details"
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "25px",
        }}
      >
        <h1>{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          width="80%"
          style={{
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.3)", // Use camelCase para boxShadow
          }}
        />
        <p>{product.description}</p>
        <h3>R${product.price}</h3>
        <h3>{product.category}</h3>
        <button
          onClick={backmenu}
          style={{
            borderRadius: "25px",
            height: "35px",
            width: "130px",
            backgroundColor: "#f8ae30",
            border: "none",
            color: "black",
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.3)", // Use camelCase para boxShadow
          }}
        >
          <FaArrowLeft size={15} /> voltar ao menu
        </button>
      </div>
      <footer
        className="footer"
        style={{
          marginTop: "15px",
          color: "#f8ae30",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
        }}
      >
        <p>
          &copy; 2024 Van Burger Pizzaria e Lanchonete. Todos os direitos
          reservados.
        </p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default ProductDetailsPage;
