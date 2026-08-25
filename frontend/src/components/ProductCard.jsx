import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatBaht, roastLabel, formatRoastDate } from "../utils/format";

export default function ProductCard({ product, index = 0 }) {
  const { addItem, justAdded } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    setAdding(true);
    try {
      await addItem(product, 1);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="product-card"
        style={styles.card}
      >
        <div style={styles.imageWrap}>
          <img
            src={product.image_url}
            alt={product.name}
            style={styles.image}
            loading="lazy"
          />
          <span style={styles.roastPill}>
            {roastLabel[product.roast_level]}
          </span>
        </div>

        <div style={styles.body}>
          <div className="eyebrow">
            {product.origin_country} · {product.origin_region}
          </div>
          <h3 style={styles.name}>{product.name}</h3>
          <p style={styles.notes}>
            {Array.isArray(product.tasting_notes)
              ? product.tasting_notes.join(" · ")
              : typeof product.tasting_notes === "string"
                ? product.tasting_notes.replace(/,/g, " ·")
                : product.tasting_notes}
          </p>

          <div style={styles.bottomRow}>
            <div className="lot-ticket">
              <div className="row">
                <span className="label">LOT</span>
                <span>{product.lot_number}</span>
              </div>
              <div className="row">
                <span className="label">ROAST</span>
                <span>{formatRoastDate(product.roast_date)}</span>
              </div>
            </div>

            <div style={styles.priceCol}>
              <span style={styles.price}>
                {formatBaht(product.price_cents)}
              </span>
              <button
                onClick={handleAdd}
                disabled={adding}
                className="btn btn-primary"
                style={styles.addBtn}
              >
                {justAdded === product.id ? "✓ เพิ่มแล้ว" : "เพิ่มลงตะกร้า"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    background: "#f6f1e6",
    border: "1px solid rgba(27,23,18,0.08)",
    borderRadius: 14,
    overflow: "hidden",
    height: "100%",
    transition:
      "transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s cubic-bezier(.16,1,.3,1)",
  },
  imageWrap: {
    position: "relative",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    background: "#ddd3bc",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
    display: "block",
  },
  roastPill: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "rgba(27,23,18,0.82)",
    color: "#f4eee0",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    padding: "4px 10px",
    borderRadius: 20,
  },
  body: {
    padding: "18px 18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  name: { fontSize: 19, marginTop: 2 },
  notes: { fontSize: 13, opacity: 0.7, margin: "2px 0 12px", flex: 1 },
  bottomRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },
  priceCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8,
  },
  price: { fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 15 },
  addBtn: { padding: "9px 16px", fontSize: 12.5, whiteSpace: "nowrap" },
};
