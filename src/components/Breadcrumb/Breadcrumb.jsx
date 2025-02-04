import { Icon } from '@/elements/Icon'

const Breadcrumb = (props) => {
  const { className, items } = props
  return (
    <ol
      itemscope
      itemtype='https://schema.org/BreadcrumbList'
      className={`breadcrumb trail ${className || ''}`.trim()}
    >
      {
    items &&
      items.map((item, i) => {
        return (
          <li
            key={i}
            itemprop='itemListElement'
            itemscope
            itemtype='https://schema.org/ListItem'
          >
            <a
              itemprop='item'
              className='crumb'
              href={
                ['#', ''].includes(item.link)
                  ? undefined
                  : item.link
              }
              data-is-last={items.length === i}
            >
              <span itemprop='name'>{item.name}</span>
            </a>
            {i < items.length - 1 && (
              <Icon size='md' variant='chevron-right' />
            )}

            <meta itemprop='position' content={`${i + 1}`} />
          </li>
        )
      })
  }
    </ol>

  )
}

export { Breadcrumb }
