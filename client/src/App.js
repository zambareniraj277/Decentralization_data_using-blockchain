import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []); // Request account access

          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);

          // Handle account change
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          // Handle chain change
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error loading provider:", error);
        }
      } else {
        console.error("MetaMask is not installed!");
      }
    };

    loadProvider();
  }, []);
  return (
    <div className="App">
      {/* Background overlay for modal */}
      {modalOpen && <div className="modal-overlay"></div>}

      <div className="glassmorphism-container">
        {/* Share Button */}
        {!modalOpen && (
          <button className="share" onClick={() => setModalOpen(true)}>
            Share
          </button>
        )}

        {/* Modal */}
        {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

        <h1 className="title">Decentralized Data Transfer</h1>

        <p className="account-text">
          Account: <span>{account ? account : "Not connected"}</span>
        </p>

        <FileUpload account={account} provider={provider} contract={contract} />
        <Display contract={contract} account={account} />
      </div>
    </div>
  );
}

export default App;
