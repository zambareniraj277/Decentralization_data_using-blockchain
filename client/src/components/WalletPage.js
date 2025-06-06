import { useParams } from "react-router-dom";

const WalletPage = () => {
  const { walletAddress } = useParams();
  return (
    <div>
      <h2>Wallet Address: {walletAddress}</h2>
      {/* Display wallet-specific data here */}
    </div>
  );
};

export default WalletPage;
