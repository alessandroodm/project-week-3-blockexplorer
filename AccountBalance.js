import { useState } from 'react';

function AccountBalance({ alchemy }) {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  // Fungsi untuk mendapatkan saldo dari Alchemy SDK
  async function fetchBalance() {
    try {
      const balanceInWei = await alchemy.core.getBalance(address);
      const balanceInEth = balanceInWei / 10 ** 18; // Konversi Wei ke ETH
      setBalance(balanceInEth);
      setError('');
    } catch (error) {
      setError('Invalid address or unable to fetch balance.');
      setBalance(null);
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Check Account Balance</h2>
      <input
        type="text"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={fetchBalance}>Get Balance</button>

      {balance !== null && <p>Balance: {balance} ETH</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AccountBalance;
