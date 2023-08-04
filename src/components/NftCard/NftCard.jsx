import Link from 'next/link'

import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { Icon } from '@/elements/Icon'

const NftCard = ({ name, views, count, nftId, image, soulbound, minted }) => {
  return (
    <Link className='nft card container' href={`/marketplace/${nftId}`}>
      <div className='image container'>
        <img src={image} loading='lazy' aria-labelledby={nftId} alt='' />

        <div className='badges'>
          {minted && (
            <div className='badge text'>Minted</div>
          )}
          {soulbound && (
            <CustomTooltip text='Soulbound NFT'>
              <div className='badge'>
                <Icon variant='star-04' size='sm' />
              </div>
            </CustomTooltip>
          )}
        </div>
      </div>

      <div className='contents'>
        <div className='title container'>
          <h3 id={nftId}>{name}</h3>
        </div>

        <div className='info container'>
          <div className='nft id'>
            #{nftId}
          </div>
          <div className='insights'>
            <div className='nft insight'>
              <span className='sr-only'>Views</span>
              <Icon variant='eye' size='sm' />
              <span>{views}</span>
            </div>
            <div className='nft insight'>
              <span className='sr-only'>Count</span>
              <Icon variant='users-01' size='sm' />
              <span>{count}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export { NftCard }
