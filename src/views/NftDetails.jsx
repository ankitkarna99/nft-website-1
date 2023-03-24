
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import NftCardWithBlurEffect from '@/components/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { NftSiblingsAndStage } from '@/components/NftSiblingsAndStage'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { Icon } from '@/elements/Icon'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

const NftDetails = ({ nftDetails, premiumNfts }) => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '/marketplace/',
      name: 'NFT Marketplace'
    },
    {
      link: '#',
      name: nftDetails.family
    }
  ]

  const { active } = useWeb3React()

  const router = useRouter()

  return (

    <div className='nft details page'>
      <section className='hero'>
        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        <div className='content grid'>
          <NftImageWithExpand nft={nftDetails} />
          <div>
            <div className='mint'>
              {nftDetails.level && (
                <Tags
                  tags={[
                    {
                      id: '1',
                      slug: '1',
                      text: `Level ${nftDetails.level}`,
                      color: 'level' + nftDetails.level
                    }
                  ]}
                />
              )}
              <NftNickname nft={nftDetails} />
              <div className='character name'>{nftDetails.name}</div>
              <NftSiblingsAndStage nft={nftDetails} />
              <div className='minting btn'>
                <CustomTooltip text='Connect Your Wallet' disabled={active}>
                  <div>
                    <Button
                      type='button' size='xl' disabled={!active} onClick={() => {
                        router.push('/marketplace/mint/' + nftDetails.tokenId)
                      }}
                    >I Want This for Free
                    </Button>
                  </div>
                </CustomTooltip>
                <div className='supporting text'>
                  {nftDetails.wantToMint} people want to mint this.
                </div>
              </div>

              <div className='like and share'>
                <div className='like btn'>
                  <Icon variant='heart' size='lg' />
                  1,024
                </div>
                <div className='share btn'>
                  <Icon variant='share-01' size='lg' />
                  Share
                </div>
              </div>
            </div>
          </div>
          <div className='more details'>
            <div className='description'>
              <h3>Description</h3>
              <div className='text'>{nftDetails.description}</div>
            </div>

            <div className='properties'>
              <h3>Properties</h3>
              <div className='table'>
                <div className='row'>
                  <div>Property</div>
                  <div>Value</div>
                </div>
                {
              nftDetails.attributes.map((attr) => (
                <div className='row' key={attr.traitType}>
                  <div>{attr.traitType}</div>
                  <div className='value'>{attr.value}</div>
                </div>
              ))
            }
              </div>
            </div>

          </div>
        </div>

        <div className='nfts you may like'>
          <h3>NFTs You May Like</h3>
          <div className='nft characters'>
            {premiumNfts.slice(0, 6).map(nft => <NftCardWithBlurEffect key={nft.name} nft={nft} />)}
          </div>
        </div>
      </section>
    </div>

  )
}

export { NftDetails }