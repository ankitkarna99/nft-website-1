import { AppConstants } from '@/constants/AppConstants'

export const rpcUrls = {
  84531: ['https://goerli.base.org'],
}

export const chains = {
  84531: {
    chainId: `0x${(84531).toString(16)}`,
    chainName: 'Base Goerli',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: rpcUrls[84531],
    blockExplorerUrls: ['https://goerli.basescan.org']
  }
}


export const addChain = async (provider) => {
  const networkId = AppConstants.NETWORK;

  if (!provider) {
    console.error("Can't setup network - injected provider not found")
    return false
  }

  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [chains[networkId]]
    })
    return true
  } catch (addError) {
    // handle "add" error
    console.error(addError)
  }
  return false
}

export const setupNetwork = async (provider) => {

  const networkId = AppConstants.NETWORK;

  if (!provider) {
    console.error("Can't setup network - injected provider not found")
    return false
  }

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${networkId.toString(16)}`}]
    })
    return true
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      return addChain(provider)
    }
    // handle other "switch" errors
    console.error(switchError)
  }

  return false
}