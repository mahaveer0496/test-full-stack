import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import constants from './constants'

const CreateArtist = () => {
  const history = useHistory()
  const [error, setError] = useState('')

  const createArtistMutation = useMutation(
    name => {
        return fetch(constants.API_URL, {
          headers:{
            'content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ name }),
        });
    },
    {
      onError: () => setError('There was an error'),
      onSuccess: () => history.go(-1),
    },
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    const { name } = e.target
    createArtistMutation.mutateAsync(name.value)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h1 className='text-2xl font-bold text-gray-600'>Create Artist</h1>
      <label className='flex'>
        <span className='px-4 py-2 text-sm whitespace-no-wrap bg-gray-300 border border-2 rounded-l'>
          Enter Name of artist
        </span>{' '}
        <input
          type='text'
          name='name'
          required
          className='w-ful px-4 py-2 border border-2 rounded-r'
        />
      </label>
      {error && <p className='text-red text-lg font-bold'>{error}</p>}
      <button
        type='submit'
        className='active:bg-pink-600 hover:shadow-md focus:outline-none px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-blue-500 rounded shadow outline-none'
      >
        Submit
      </button>
    </form>
  )
}

export default CreateArtist
