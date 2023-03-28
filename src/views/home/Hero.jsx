import Link from 'next/link'

import { Button } from '@/components/Button/Button'
import { Icon } from '@/elements/Icon'

const Hero = () => {
  return (
    <div className='home hero container'>
      <div className='titles container'>
        <h1 className='title'>Discover Neptune Mutual NFTs</h1>
        <p className='intro'>
          Participate in our cover ecosystem and mint NFTs for free. Select your
          persona and keep unlocking new levels of NFTs.
        </p>

        <div className='buttons container'>
          <Link href='/marketplace/minting-levels'>
            <button className='view'>View Minting Levels</button>
          </Link>
          <Link href='/marketplace'>
            <Button>
              <div className='access'>
                <Icon variant='image-indent-left' size='md' />
                Access Marketplace
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <div className='image container'>
        <img
          className='light only'
          src='/assets/images/hero/nft-light.webp'
          alt='hero image light'
        />
        <img
          className='dark only'
          src='/assets/images/hero/nft-dark.webp'
          alt='hero image dark'
        />
      </div>
    </div>
  )
}

export { Hero }
