import React, { Fragment } from 'react'
import { ChatAltIcon, TagIcon, UserCircleIcon } from '@heroicons/react/solid'

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
function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const Content = () => {
  return (
    <div className={"mt-8 max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8"}>
      <div className='relative px-4 sm:px-6 lg:px-8'>
        <div className='text-lg max-w-prose mx-auto'>
          <h1>
            <span className='block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase'>
              22/12/2022
            </span>
            <span
              className='mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Hello Title
            </span>
          </h1>
        </div>
        <div className='mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto'>
          <p>
            Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit viverra aliquam
            porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet, mattis.
            Nunc
            purus, diam commodo tincidunt turpis. Amet, duis sed elit interdum dignissim.
          </p>
          <h2>From beginner to expert in 30 days</h2>
          <p>
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
            Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
            tellus
            mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
            ipsum eu a sed convallis diam.
          </p>
          <blockquote>
            <p>
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque
              tristique
              pellentesque. Blandit amet, sed aenean erat arcu morbi.
            </p>
          </blockquote>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
            vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat
            velit.
          </p>
          <figure>
            <img
              className='w-full rounded-lg'
              src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt=''
              width={1310}
              height={873}
            />
            <figcaption>Sagittis scelerisque nulla cursus in enim consectetur quam.</figcaption>
          </figure>
          <h2>Everything you need to get up and running</h2>
          <p>
            Purus morbi dignissim senectus mattis <a href='#'>adipiscing</a>. Amet, massa quam varius orci dapibus
            volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra
            ridiculus
            non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius
            nunc,
            congue erat ac. Cras fermentum convallis quam.
          </p>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
            vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat
            velit.
          </p>
        </div>
      </div>
      <ul role='list' className='border-t-2 pt-10 -mb-8'>
        {activity.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className='relative pb-8'>
              {activityItemIdx !== activity.length - 1 ? (
                <span className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200' aria-hidden='true' />
              ) : null}
              <div className='relative flex items-start space-x-3'>
                {activityItem.type === 'comment' ? (
                  <>
                    <div className='relative'>
                      <img
                        className='h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'
                        src={activityItem.imageUrl}
                        alt=''
                      />

                      <span className='absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px'>
                        <ChatAltIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      </span>
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div>
                        <div className='text-sm'>
                          <a href={activityItem.person.href} className='font-medium text-gray-900'>
                            {activityItem.person.name}
                          </a>
                        </div>
                        <p className='mt-0.5 text-sm text-gray-500'>Commented {activityItem.date}</p>
                      </div>
                      <div className='mt-2 text-sm text-gray-700'>
                        <p>{activityItem.comment}</p>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'assignment' ? (
                  <>
                    <div>
                      <div className='relative px-1'>
                        <div
                          className='h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center'>
                          <UserCircleIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
                        </div>
                      </div>
                    </div>
                    <div className='min-w-0 flex-1 py-1.5'>
                      <div className='text-sm text-gray-500'>
                        <a href={activityItem.person.href} className='font-medium text-gray-900'>
                          {activityItem.person.name}
                        </a>{' '}
                        assigned{' '}
                        <a href={activityItem.assigned.href} className='font-medium text-gray-900'>
                          {activityItem.assigned.name}
                        </a>{' '}
                        <span className='whitespace-nowrap'>{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'tags' ? (
                  <>
                    <div>
                      <div className='relative px-1'>
                        <div
                          className='h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center'>
                          <TagIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
                        </div>
                      </div>
                    </div>
                    <div className='min-w-0 flex-1 py-0'>
                      <div className='text-sm leading-8 text-gray-500'>
                        <span className='mr-0.5'>
                          <a href={activityItem.person.href} className='font-medium text-gray-900'>
                            {activityItem.person.name}
                          </a>{' '}
                          added tags
                        </span>{' '}
                        <span className='mr-0.5'>
                          {activityItem.tags.map((tag) => (
                            <Fragment key={tag.name}>
                              <a
                                href={tag.href}
                                className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm'
                              >
                                <span className='absolute flex-shrink-0 flex items-center justify-center'>
                                  <span
                                    className={classNames(tag.color, 'h-1.5 w-1.5 rounded-full')}
                                    aria-hidden='true'
                                  />
                                </span>
                                <span className='ml-3.5 font-medium text-gray-900'>{tag.name}</span>
                              </a>{' '}
                            </Fragment>
                          ))}
                        </span>
                        <span className='whitespace-nowrap'>{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='flex justify-center shadow-lg my-4 '>
        <form className='w-full  bg-white rounded-lg px-4 pt-2'>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <h2 className='px-4 pt-3 pb-2 text-gray-800 text-lg'>Add a new comment</h2>
            <div className='w-full md:w-full px-3 mb-2 mt-2'>
                        <textarea
                          className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
                          name='body' placeholder='Type Your Comment' required />
            </div>
            <div className='w-full md:w-full flex items-start md:w-full px-3'>
              <div className='flex items-start w-1/2 text-gray-700 px-2 mr-auto'>
                <svg fill='none' className='w-5 h-5 text-gray-600 mr-1' viewBox='0 0 24 24'
                     stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <p className='text-xs md:text-sm pt-px'>Some HTML is okay.</p>
              </div>
              <div className='-mr-1'>
                <input type='submit'
                       className='bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100'
                       value='Comment' />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Content