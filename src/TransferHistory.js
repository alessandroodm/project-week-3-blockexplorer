import { useState } from 'react';

function TransferHistory({ alchemy }) {
  const [address, setAddress] = useState('');
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState('');

  // Fungsi untuk mendapatkan transfer yang diterima tahun ini
  async function fetchTransfers() {
    try {
      const currentBlock = await alchemy.core.getBlockNumber();

      // Dapatkan riwayat transfer dari blok awal tahun hingga blok terbaru
      const transfers = await alchemy.core.getAssetTransfers({
        fromBlock: '0x0', // Block awal tahun bisa dimodifikasi untuk rentang yang lebih spesifik
        toBlock: currentBlock,
        toAddress: address, // Alamat target untuk mengecek transfer yang diterima
        category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'], // Kategori transfer
      });

      setTransfers(transfers.transfers);
      setError('');
    } catch (error) {
      setError('Error fetching transfer history or invalid address.');
      setTransfers([]);
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Check Transfer History</h2>
      <input
        type="text"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={fetchTransfers}>Get Transfer History</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {transfers.length > 0 ? (
        <ul>
          {transfers.map((transfer, index) => (
            <li key={index}>
              <p><strong>Transaction Hash:</strong> {transfer.hash}</p>
              <p><strong>From:</strong> {transfer.from}</p>
              <p><strong>To:</strong> {transfer.to}</p>
              <p><strong>Value:</strong> {transfer.value} ETH</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transfers found for this address.</p>
      )}
    </div>
  );
}

export default TransferHistory;
