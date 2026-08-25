const [cart, setCart] = useState([]); 
const [receivedAmount, setReceivedAmount] = useState(0); 

const handleCheckout = async () => {
  try {
    const payload = {
      items: cart, // ส่งรายการในตะกร้าไป
      received_amount: Number(receivedAmount),
      payment_type: 'cash'
    };

    const res = await API.post('/orders/checkout', payload);

    alert(`ชำระเงินสำเร็จ!\nเงินทอน: ${res.data.change_amount} บาท`);
    setCart([]); 
    setReceivedAmount(0);
  } catch (err) {
    alert(err.response?.data?.message || 'ชำระเงินไม่สำเร็จ');
  }
};