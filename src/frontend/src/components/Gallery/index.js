import { v4 as uuidv4 } from 'uuid'

const files = [
  {
    source:
      'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    current: true,
  },
  {
    source:
      'https://images.unsplash.com/photo-1497888329096-51c27beff665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    current: false,
  },
  {
    source:
      'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    current: false,
  },
  {
    source:
      'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    current: false,
  },
]

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Gallery () {
  return (
    <section className='mt-8 pb-16' aria-labelledby='gallery-heading'>
      <ul
        role='list'
        className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'
      >
        {files.map((file) => (
          <li key={uuidv4()} className='relative'>
            <div
              className={classNames(
                file.current
                  ? 'ring-2 ring-offset-2 ring-indigo-500'
                  : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden',
              )}
            >
              <img
                src={file.source}
                alt=''
                className={classNames(
                  file.current ? '' : 'group-hover:opacity-75',
                  'object-cover pointer-events-none',
                )}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}