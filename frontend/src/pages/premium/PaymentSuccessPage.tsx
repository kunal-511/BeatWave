import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, X, Loader, Home, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | 'pending'>('pending');

  const paymentId = searchParams.get('razorpay_payment_id');
  const orderId = searchParams.get('razorpay_order_id');
  const signature = searchParams.get('razorpay_signature');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId || !orderId || !signature) {
        setVerificationStatus('failed');
        setIsVerifying(false);
        return;
      }

      try {
        const token = await getToken();
        if (token) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        const response = await axiosInstance.post('/payments/verify-payment', {
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        });

        if (response.data.status === 'success') {
          setVerificationStatus('success');
          toast.success('Payment verified successfully! Welcome to BeatWave Premium! 🎉');
        } else {
          setVerificationStatus('failed');
          toast.error('Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('failed');
        toast.error('Payment verification failed');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [paymentId, orderId, signature, getToken]);

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleGoToMusic = () => {
    navigate('/home');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-zinc-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="size-12 text-green-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Verifying Payment</h2>
          <p className="text-zinc-400">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-zinc-900 to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-zinc-800/50 backdrop-blur-md rounded-2xl border border-zinc-700/50 p-8 text-center">
            
            {verificationStatus === 'success' ? (
              <>
                <div className="mb-6">
                  <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Payment Successful!
                  </h1>
                  <p className="text-zinc-400">
                    Welcome to BeatWave Premium! 🎉
                  </p>
                </div>

                <div className="bg-zinc-700/30 border border-zinc-600 rounded-lg p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Payment ID:</span>
                      <span className="text-white font-mono text-xs">
                        {paymentId?.slice(0, 20)}...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Amount:</span>
                      <span className="text-green-400 font-semibold">₹200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Status:</span>
                      <span className="text-green-400 font-semibold">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleGoToMusic}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3"
                  >
                    <Music className="size-4 mr-2" />
                    Start Listening to Premium Music
                  </Button>
                  
                  <Button 
                    onClick={handleGoHome}
                    variant="outline"
                    className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  >
                    <Home className="size-4 mr-2" />
                    Go to Home
                  </Button>
                </div>

                <div className="mt-6 text-xs text-zinc-500">
                  <p>Premium features are now active on your account</p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <X className="size-16 text-red-500 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Payment Verification Failed
                  </h1>
                  <p className="text-zinc-400">
                    We couldn't verify your payment. Please try again.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">
                    If your payment was deducted, it will be refunded within 5-7 business days.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/premium')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3"
                  >
                    Try Again
                  </Button>
                  
                  <Button 
                    onClick={handleGoHome}
                    variant="outline"
                    className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  >
                    <Home className="size-4 mr-2" />
                    Go to Home
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;