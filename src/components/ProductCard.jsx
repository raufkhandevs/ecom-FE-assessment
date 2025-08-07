    import React, { useState } from "react";
    import { useDispatch } from "react-redux";
    import { addCart } from "../redux/action";
    import { Link } from "react-router-dom";
    import toast from "react-hot-toast";
    import "./ProductCard.css";

    const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [selectedVariant, setSelectedVariant] = useState("default");

    const variantOptions = product?.variants || [
        { value: "default", label: "Default" },
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
    ];

    const stockCount = product?.stock || Math.floor(Math.random() * 51); 
    const isInStock = product?.stock !== undefined ? product.stock > 0 : stockCount > 0;

    const addProduct = (product) => {
        const productWithVariant = {
        ...product,
        selectedVariant,
        };
        dispatch(addCart(productWithVariant));
        toast.success("Added to cart");
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        }).format(price);
    };

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    return (
        <div className="product-card">
        <div className="product-card__image-container">
            <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
            />
            {!isInStock && (
            <div className="product-card__out-of-stock">
                <span>Out of Stock</span>
            </div>
            )}
            {product.rating && (
            <div className="product-card__rating">
                <span className="product-card__rating-stars">
                {"★".repeat(Math.floor(product.rating.rate))}
                {"☆".repeat(5 - Math.floor(product.rating.rate))}
                </span>
                <span className="product-card__rating-count">
                ({product.rating.count})
                </span>
            </div>
            )}
        </div>

        <div className="product-card__content">
            <h3 className="product-card__title">
            {truncateText(product.title, 50)}
            </h3>
            
            <p className="product-card__description">
            {truncateText(product.description, 80)}
            </p>

            <div className="product-card__price">
            <span className="product-card__price-current">
                {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
                <span className="product-card__price-original">
                {formatPrice(product.originalPrice)}
                </span>
            )}
            </div>

            <div className="product-card__variants">
            <label htmlFor={`variant-${product.id}`} className="product-card__variant-label">
                {product?.variants ? "Options:" : "Size:"}
            </label>
            <select
                id={`variant-${product.id}`}
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="product-card__variant-select"
                disabled={!isInStock}
            >
                {variantOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            </div>

            <div className="product-card__stock">
            {isInStock ? (
                <span className="product-card__stock-in">
                In Stock ({stockCount} available)
                </span>
            ) : (
                <span className="product-card__stock-out">Out of Stock</span>
            )}
            </div>

            <div className="product-card__actions">
            <Link
                to={`/product/${product.id}`}
                className="product-card__btn product-card__btn--view"
            >
                View Details
            </Link>
            
            {isInStock ? (
                <button
                className="product-card__btn product-card__btn--add"
                onClick={() => addProduct(product)}
                disabled={!isInStock}
                >
                Add to Cart
                </button>
            ) : (
                <button
                className="product-card__btn product-card__btn--disabled"
                disabled
                >
                Out of Stock
                </button>
            )}
            </div>
        </div>
        </div>
    );
    };

    export default ProductCard; 