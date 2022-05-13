import CoinbaseWalletCard from '../components/connectorCards/CoinbaseWalletCard'
import GnosisSafeCard from '../components/connectorCards/GnosisSafeCard'
import MetaMaskCard from '../components/connectorCards/MetaMaskCard'
import NetworkCard from '../components/connectorCards/NetworkCard'
import WalletConnectCard from '../components/connectorCards/WalletConnectCard'
import ProviderExample from '../components/ProviderExample'
import { hooks, metaMask } from '../connectors/metaMask'
import { useState, useEffect } from 'react';
import Web3 from "web3";

export default function Home() {
  const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks
  const accounts = useAccounts()
  const SIG = 'sig';

  const signMessage = async (message) => {
    const web3 = new Web3(window?.web3.currentProvider);
    const accounts = await web3.eth.getAccounts()
    const signature = await web3.eth.personal.sign(message, accounts[0])
    return signature
  }
  useEffect(() => {
    if (accounts && !localStorage.getItem(SIG)) {
      (async () => {
        var signature = await signMessage("Test message");
        localStorage.setItem(SIG, signature)
        console.log(signature)
      })()
    }
  }, [accounts])
  return (
    <>
      <ProviderExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
        {/* <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
        <GnosisSafeCard /> */}
      </div>
    </>
  )
}
