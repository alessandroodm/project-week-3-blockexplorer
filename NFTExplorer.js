import { useState } from 'react';

function NFTExplorer({ alchemy }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [nftList, setNftList] = useState([]);
  const [error, setError] = useState('');

  // Fungsi untuk mengeksplorasi NFT berdasarkan alamat dompet
  async function fetchNFTs() {
    try {
      const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
      setNftList(nfts.ownedNfts);
      setError('');
    } catch (error) {
      setError('Error fetching NFTs or invalid wallet address.');
      setNftList([]);
      console.error(error);
    }
  }

  return (
    <div>
      <h2>NFT Explorer</h2>
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button onClick={fetchNFTs}>Explore NFTs</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {nftList.length > 0 && (
        <div>
          <h3>Owned NFTs</h3>
          <ul>
            {nftList.map((nft, index) => (
              <li key={index}>
                <p><strong>{nft.title}</strong></p>
                {nft.media && nft.media.length > 0 && (
                  <img src={nft.media[0].gateway} alt="NFT" style={{ width: '200px' }} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NFTExplorer;
