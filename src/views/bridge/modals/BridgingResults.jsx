import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { IconButton } from '@/components/IconButton/IconButton'
import { Modal } from '@/components/Modal/Modal'
import { Icon } from '@/elements/Icon'
import { chains } from '@/lib/connect-wallet/utils/switch-network'
import { imageOrigin } from '@/services/marketplace-api'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { getDateInFormat } from '@/utils/date'
import {
  getExplorerAddressURL,
  getExplorerTransactionURL
} from '@/utils/get-explorer-url'
import { useWeb3React } from '@web3-react/core'

const KeyVal = ({ keyText, value, isAddress = false, isHash = false, chainId }) => {
  const link = isAddress
    ? getExplorerAddressURL(value, chainId)
    : isHash
      ? getExplorerTransactionURL(value, chainId)
      : ''

  return (
    <div className='key value'>
      <p className='key'>{keyText}</p>
      <div className='value'>
        {isAddress || isHash
          ? (
            <div className='address'>
              <span>{value}</span>
              <IconButton
                noWrapper
                showFeedback
                size='sm'
                variant='copy-01' onClick={() => {
                  copyToClipboard(link)
                }}
              />
              <a href={link} target='_blank'><Icon variant='link-external-01' size='sm' /></a>
            </div>
            )
          : value}
      </div>
    </div>
  )
}

const BridgingResults = ({ open, close, departureChainId, destinationChainId, transaction, nfts }) => {
  const departureChain = chains[departureChainId]
  const destinationChain = chains[destinationChainId]

  const { account } = useWeb3React()

  return (
    <Modal
      className='bridging results modal'
      visible={open}
      setVisible={close}
    >
      <button className='close' onClick={close}>
        <Icon variant='x-close' size='xl' />
      </button>

      <h3>
        Bridging Results
      </h3>

      <div className='details container'>
        <div className='details'>
          <KeyVal keyText='Date' value={getDateInFormat(Date.now())} />

          <KeyVal
            keyText='Departure Chain' value={(
              <div className='chain'>
                <img src={`/assets/images/chains/${departureChainId}.png`} alt={departureChain.chainName} />
                <span>{departureChain.chainName}</span>
              </div>
          )}
          />

          <KeyVal
            keyText='Departure Address' value={account} isAddress chainId={departureChainId}
          />

          <KeyVal
            keyText='Destination Chain' value={(
              <div className='chain'>
                <img src={`/assets/images/chains/${destinationChainId}.png`} alt={destinationChain.chainName} />
                <span>{destinationChain.chainName}</span>
              </div>
          )}
          />

          <KeyVal
            keyText='Destination Address' value={account} isAddress chainId={destinationChainId}
          />
        </div>

        <div className='nft'>
          <p className='card title'>Send NFT</p>
          <hr />

          {nfts.map(nft => {
            return (
              <div className='info' key={nft.tokenId}>
                <img src={`${imageOrigin}/thumbnails/${nft.tokenId}.webp`} alt={nft.name + ' thumbnail image'} />
                <div>
                  <p>Name</p>
                  <p className='name'>{nft?.name}</p>
                </div>
              </div>
            )
          })}

          <div className='details'>
            <KeyVal keyText='Departure Hash' value={transaction?.hash} isHash chainId={departureChainId} />
            {/* <KeyVal keyText='Destination Hash' value={mock.destHash} isAddress /> */}
          </div>
        </div>

        <a target='_blank' href={`/my-collection/bridge/receipt/${transaction?.hash}`}>
          <PrimaryButton>
            View Receipt
          </PrimaryButton>
        </a>
      </div>

    </Modal>
  )
}

export { BridgingResults }
