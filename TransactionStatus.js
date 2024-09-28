import { useState } from 'react';

function TransactionStatus({ alchemy }) {
  const [txHash, setTxHash] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Fungsi untuk cek status transaksi
  async function checkTransactionStatus() {
    try {
      const receipt = await alchemy.core.getTransactionReceipt(txHash);

      if (receipt) {
        setStatusMessage('Transaction mined! 🎉');
      } else {
        setStatusMessage('Transaction is still pending ⏳');
      }
    } catch (error) {
      setStatusMessage('Error fetching transaction status. Please check the transaction hash.');
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Check Transaction Status</h2>
      <input
        type="text"
        placeholder="Enter Transaction Hash"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
      />
      <button onClick={checkTransactionStatus}>Check Status</button>

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default TransactionStatus;
