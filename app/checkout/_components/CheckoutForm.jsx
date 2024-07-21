import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import cartApis from "../../_utils/cartApis";
import OrderApi from "../../_utils/OrderApi";
import { useUser } from "@clerk/nextjs";
import { useContext, useState } from "react";
import { CartContext } from "../../_context/CartContext";

const CheckoutForm = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  console.log(user?.primaryEmailAddress.emailAddress);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const handleError = (error) => {
      setLoading(false);
      const messageContainer = document.querySelector("#error-message");
      messageContainer.textContent = error.message;
      submitBtn.disabled = false;
    };

    // Create New Order
    createOrder();
    // Send an Email
    sendEmail();
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });
    if (result.error) {
    } else {
    }
    setLoading(false);
  };
  const createOrder = () => {
    let productIds = [];
    cart.forEach((el) => {
      productIds.push(el?.product?.id);
    });
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds,
      },
    };
    OrderApi.createOrder(data).then((res) => {
      if (res) {
        cart.forEach((el) => {
          cartApis.DeleteCartsItems(el?.id).then((result) => {});
        });
      }
    });
  };
  const productImages = cart.map(
    (item) => item.product?.attributes?.image?.data?.attributes?.url
  );
  const productTitles = cart.map((item) => item.product?.attributes?.title);

  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        email: user.primaryEmailAddress.emailAddress,
        fullName: user.fullName,
        productImg: productImages,
        productTitle: productTitles,
      }),
    });
  };
  return (
    <section className="mt-28">
      <div className="container lg:w-[40%]">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          {loading && (
            <div className="bg-black/60 flex justify-center items-center  fixed w-screen h-screen left-0 top-0">
              <div className=" flex  justify-center  items-center ">
                <div
                  className="inline-block  text-white size-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] "
                  role="status"
                ></div>
              </div>
            </div>
          )}
          <button className="block w-full tr-4 mt-6 rounded bg-primary px-12 py-3 text-sm font-[400] text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
