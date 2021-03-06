import { Fragment } from 'react'
import { ChatAltIcon, TagIcon, UserCircleIcon } from '@heroicons/react/solid'
import { Link, useHistory } from 'react-router-dom'

const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Nguyen Tien Dat', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 1,
    type: 'comment',
    person: { name: 'Nguyen Tien Dat', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
]

const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    description: 'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    description:
      'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
  },
  {
    title: 'Writing effective landing page copy',
    href: '#',
    description:
      'Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.',
    date: 'Jan 29, 2020',
    datetime: '2020-01-29',
  },
]

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Blog () {
  const history = useHistory()
  const store_id = history.location.pathname.split('/')[2]
  return (
    <div className='mt-8 max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8'>
      <div className='flow-root'>
        <div className='relative pb-16 bg-white overflow-hidden'>
          <div className='bg-white pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8'>
            <div className='relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl'>
              <div>
                <div className='mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center'>
                  <p className='text-xl text-gray-500'>Get blogs about this store.</p>
                  <form className='mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end'>
                    <div>
                      <label htmlFor='email-address' className='sr-only'>
                        Email address
                      </label>
                      <input
                        id='email-address'
                        name='email-address'
                        type='email'
                        autoComplete='email'
                        required
                        className='appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 lg:max-w-xs'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div
                      className='mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex'>
                      <button
                        type='button'
                        className='w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex'
                      >
                        Notify me
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12'>
                {posts.map((post) => (
                  <div key={post.title}>
                    <p className='text-sm text-gray-500'>
                      <time dateTime={post.datetime}>{post.date}</time>
                    </p>
                    <a href='#' className='mt-2 block'>
                      <p className='text-xl font-semibold text-gray-900'>{post.title}</p>
                      <p className='mt-3 text-base text-gray-500'>{post.description}</p>
                    </a>
                    <div className='mt-3'>
                      <Link to={`/store/${store_id}/blog`} className='text-base font-semibold text-indigo-600 hover:text-indigo-500'>
                        Read full story
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}