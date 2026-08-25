export default function ProductCard({ product, addToCart }) {
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => !isOutOfStock && addToCart(product)}
      style={{
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '8px',
        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
        backgroundColor: isOutOfStock ? '#f8d7da' : '#fff',
        transition: 'transform 0.1s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', color: isOutOfStock ? '#721c24' : '#000' }}>
        {product.name}
      </h3>
      <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
        ราคา: {product.price} บาท
      </p>
      <p style={{ margin: '5px 0', color: isOutOfStock ? 'red' : 'green' }}>
        {isOutOfStock ? 'สินค้าหมด' : `คงเหลือ: ${product.stock}`}
      </p>
    </div>
  );
}