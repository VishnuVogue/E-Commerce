import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import Title from '../Components/Title';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const { navigate,backendUrl,token , cartItems,setCartItems,getCartAmount,delivery_fee,products } = useContext(ShopContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data,[name]:value}))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description:'Order Desc payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          // Extract the razorpay_order_id from the response object
          const razorpay_order_id = response.razorpay_order_id;
  
          // Send only the necessary data to the backend
          const { data } = await axios.post(
              backendUrl + '/api/order/verifyRazorpay',
              { razorpay_order_id },  // Send only the required field
              { headers: { token } }
          );
  
          if (data.success) {
              navigate('/Orders');
              setCartItems({});
          } else {
              console.error('Payment failed:', data.message);
              // Handle failure case (e.g., show an error message to the user)
          }
      } 
        catch (error) {
          console.log(error)
          toast.error(error)
        }

      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item]>0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (paymentMethod) {
        // Api calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          console.log(response.data.success)
          if (response.data.success) {
            setCartItems({})
            navigate('/Orders')
          }else{
            toast.error(response.data.message)
          }
          
          break;

          case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
            if (responseStripe.data.success) {
              const {session_url} = responseStripe.data;
              window.location.replace(session_url);
            }else{
              toast.error(responseStripe.data.message)
            }

          break;

          case 'razorpay':

          const responseRazorpay = await axios.post(backendUrl+"/api/order/razorpay",orderData,{headers:{token}})
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* --------------- Left Side ----------------------- */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex flex-col sm:flex-row  gap-3">
          <input
          required
            type="text"
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            placeholder="First Name"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
          required
            type="text"
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            placeholder="Last Name"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
        required
          type="email"
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          placeholder="Email Address"
          className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
        required
          type="text"
          placeholder="Street"
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex flex-col sm:flex-row  gap-3">
          <input
          required
            type="text"
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            placeholder="City"
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
          required
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row  gap-3">
          <input
          required
            type="text"
            placeholder="Zipcode"
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
          required
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
        required
          type="number"
          placeholder="Phone "
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* --------------- Right Side ----------------------- */}

      <div className="mt-8">
        <div className="mt8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* -------------- Payment method selection -------------- */}

          <div className="flex flex-col lg:flex-row gap-4">
            <div
              onClick={() => {
                setPaymentMethod('stripe');
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={` min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'stripe' ? 'bg-green-400' : ''
                }`}
              ></p>
              <img className="h5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => {
                setPaymentMethod('razorpay');
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={` min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'razorpay' ? 'bg-green-400' : ''
                }`}
              ></p>
              <img className="h5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => {
                setPaymentMethod('cod');
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={` min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'cod' ? 'bg-green-400' : ''
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                {' '}
                CASH ON DELIVARY
              </p>
            </div>
          </div>

          {/* -------------- Payment method selection -------------- */}

          <div className="w-full text-end mt-8">
            <button
              type='submit'
              // onClick={() => navigate('/orders')}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;