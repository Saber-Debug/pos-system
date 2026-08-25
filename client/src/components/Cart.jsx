export default function Cart({
  cart,
  updateQuantity,
  removeFromCart,
  receivedAmount,
  setReceivedAmount,
  totalAmount,
  handleCheckout
}) {
  return (
    <div style={{ flex: 1, borderLeft: '2px solid #eee', paddingLeft: '20px' }}>
      <h2>ตะกร้าสินค้า</h2>
      {cart.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <strong>{item.name}</strong>
                <div>{item.price} x {item.quantity} = {item.price * item.quantity} บาท</div>
              </div>
              <div>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button onClick={() => updateQuantity(item.id, 1)} style={{ marginLeft: '5px' }}>+</button>
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '5px', color: 'red' }}>x</button>
              </div>
            </div>
          ))}
          <hr />
          <h3>ราคารวมทั้งสิ้น: {totalAmount} บาท</h3>
          <div style={{ marginBottom: '10px' }}>
            <label>รับเงินมา: </label>
            <input
              type="number"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              placeholder="0.00"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          {Number(receivedAmount) >= totalAmount && (
            <p style={{ color: 'blue' }}>เงินทอน: {Number(receivedAmount) - totalAmount} บาท</p>
          )}
          <button
            onClick={handleCheckout}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#22c55e',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ชำระเงิน
          </button>
        </div>
      )}
    </div>
  );
}