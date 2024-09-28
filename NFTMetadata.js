import { useState } from 'react';

function NFTMetadata({ alchemy }) {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [nftData, setNftData] = useState(null);
  const [error, setError] = useState('');

  // Fungsi untuk mengambil metadata NFT
  async function fetchNFTMetadata() {
    try {
      const nftMetadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
      setNftData(nftMetadata);
      setError('');
    } catch (error) {
      setError('Error fetching NFT metadata or invalid contract address/token ID.');
      setNftData(null);
      console.error(error);
    }
  }

  return (
    <div>
      <h2>NFT Metadata</h2>
      <input
        type="text"
        placeholder="Enter NFT Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={fetchNFTMetadata}>Get NFT Metadata</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {nftData && (
        <div>
          <h3>NFT Details</h3>
          <p><strong>Name:</strong> {nftData.title}</p>
          <p><strong>Description:</strong> {nftData.description}</p>
          {nftData.media && nftData.media.length > 0 && (
            <img src={nftData.media[0].gateway} alt="NFT" style={{ width: '300px' }} />
          )}
        </div>
      )}
    </div>
  );
}

export default NFTMetadata;
