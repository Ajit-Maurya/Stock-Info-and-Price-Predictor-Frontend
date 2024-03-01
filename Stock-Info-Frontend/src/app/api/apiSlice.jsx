import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials,logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000',
  credentials: 'include',
  prepareHeaders:(headers,{ getState }) => {
    const token = getState().auth.token
    if (token) {
        headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  } 
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
     let results = await baseQuery(args, api, extraOptions)

     if (results?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data){
            const user = api.getState().auth.user
            //store the new access token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            //retry with original query with new access token
            results =await baseQuery(args, api, extraOptions)
        }
        else {
            api.dispatch(logOut())
        }
     }
     return results
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})