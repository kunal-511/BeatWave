import { Button } from "@/components/ui/button";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader, MoveLeftIcon } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const premiumPrice = 200;


  if (isLoaded && !isSignedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-zinc-900 to-black flex items-center justify-center">
        <Loader className="size-8 text-green-500 animate-spin" />
      </div>
    );
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to make a payment');
      return;
    }

    setIsLoading(true);
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setIsLoading(false);
      return;
    }

    try {

      const token = await getToken();

      if (!token) {
        toast.error('Authentication failed. Please sign in again.');
        setIsLoading(false);
        return;
      }


      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axiosInstance.post('/payments/create-order', {
        amount: premiumPrice,
        currency: 'INR',
      });

      const orderData = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_zOhpl2KPINrq20',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'BeatWave Premium',
        description: `Premium Subscription - ₹${premiumPrice}`,
        order_id: orderData.id,
        handler: function (response: any) {
          console.log('Payment success:', response);
          const successUrl = `/payment-success?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}&razorpay_signature=${response.razorpay_signature}`;
          navigate(successUrl);
        },
        prefill: {
          name: user?.fullName || user?.firstName || 'User',
          email: user?.primaryEmailAddress?.emailAddress || '',
          contact: user?.primaryPhoneNumber?.phoneNumber || ''
        },
        theme: {
          color: '#22c55e'
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            toast('Payment cancelled');
          }
        },
        notes: {
          purpose: 'BeatWave Premium Subscription'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error: any) {
      console.error('Payment initiation error:', error);
      toast.error(error.response?.data?.error || 'Failed to initiate payment');
      setIsLoading(false);
    }
  };
   const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-zinc-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <Button className="text-white text-xl p-4" onClick={handleBack} ><MoveLeftIcon /></Button>
        <div className="max-w-md mx-auto">
          <div className="bg-zinc-800/50 backdrop-blur-md rounded-2xl border border-zinc-700/50 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                BeatWave Premium
              </h1>
              <p className="text-zinc-400">
                Upgrade to unlock unlimited music streaming
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-700/30 border border-zinc-600 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">BeatWave Premium</span>
                  <span className="text-2xl font-bold text-green-400">₹{premiumPrice}</span>
                </div>
                <p className="text-sm text-zinc-400 mt-2">
                  Unlimited access to all premium features
                </p>
              </div>

              <Button
                type="button"
                onClick={payNow}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : `Pay ₹${premiumPrice}`}
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-zinc-400">
              <p>Secure payment powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage;