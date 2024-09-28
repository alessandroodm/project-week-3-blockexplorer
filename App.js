import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionStatus from './TransactionStatus';
import AccountBalance from './AccountBalance';
import TransferHistory from './TransferHistory';
import NFTMetadata from './NFTMetadata';  // Import NFT Metadata
import NFTExplorer from './NFTExplorer';  // Import NFT Explorer

import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails, setBlockDetails] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [blockWithTransactions, setBlockWithTransactions] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(latestBlockNumber);
    }
    fetchData();
  }, []);

  async function fetchBlockDetails(blockNumber) {
    const details = await alchemy.core.getBlock(blockNumber);
    setBlockDetails(details);
    const blockWithTx = await alchemy.core.getBlockWithTransactions(blockNumber);
    setBlockWithTransactions(blockWithTx);
    setSelectedBlock(blockNumber);
  }

  return (
    <div className="App">
      <h1>Block Explorer</h1>

      <p>
        Block Number: 
        <button onClick={() => fetchBlockDetails(blockNumber)}>
          {blockNumber}
        </button>
      </p>

      {selectedBlock && (
        <div>
          <h2>Block {selectedBlock} Details</h2>
          {blockDetails && <pre>{JSON.stringify(blockDetails, null, 2)}</pre>}
          {blockWithTransactions && (
            <div>
              <h3>Transactions</h3>
              {blockWithTransactions.transactions.map((tx, index) => (
                <button key={index} onClick={() => alert(`Transaction: ${tx.hash}`)}>
                  {tx.hash}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tambahkan komponen tambahan */}
      <TransactionStatus alchemy={alchemy} />
      <AccountBalance alchemy={alchemy} />
      <TransferHistory alchemy={alchemy} />
      <NFTMetadata alchemy={alchemy} />   {/* Tambahkan NFT Metadata */}
      <NFTExplorer alchemy={alchemy} />   {/* Tambahkan NFT Explorer */}
    </div>
  );
}

export default App;
