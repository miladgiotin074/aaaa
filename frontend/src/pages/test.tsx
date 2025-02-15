import React, { type BaseSyntheticEvent, useState } from 'react'

import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'

interface IInitialState {
    phoneNumber: string
    password: string
    phoneCode: string
}

const SESSION = new StringSession('') //create a new StringSession, also you can use StoreSession
const API_ID = 23255351 // put your API id here
const API_HASH = '2ccddcf9a1c8bcd1f24da4e2c507830f' // put your API hash here

const client = new TelegramClient(SESSION, API_ID, API_HASH, { connectionRetries: 5 }) // Immediately create a client using your application data

const initialState: IInitialState = { phoneNumber: '', password: '', phoneCode: '' } // Initialize component initial state

function test() {
    const [{ phoneNumber, password, phoneCode }, setAuthInfo] = useState<IInitialState>(initialState)

    async function sendCodeHandler(): Promise<void> {
        await client.connect() // Connecting to the server
        await client.sendCode(
            {
                apiId: API_ID,
                apiHash: API_HASH
            },
            phoneNumber
        )
    }

    async function clientStartHandler(): Promise<void> {
        await client.start({ phoneNumber, password: userAuthParamCallback(password), phoneCode: userAuthParamCallback(phoneCode), onError: () => { } })
        await client.sendMessage('me', { message: "You're successfully logged in!" })
    }

    function inputChangeHandler({ target: { name, value } }: BaseSyntheticEvent): void {
        setAuthInfo((authInfo) => ({ ...authInfo, [name]: value }))
    }

    function userAuthParamCallback<T>(param: T): () => Promise<T> {
        return async function () {
            return await new Promise<T>(resolve => {
                resolve(param)
            })
        }
    }

    return (
        <div className='flex flex-col gap-4 bg-black'>
            <input
                className='bg-white text-black'
                type="text"
                name="phoneNumber"
                placeholder='phoneNumber'
                value={phoneNumber}
                onChange={inputChangeHandler}
            />

            <input
                className='bg-white text-black'
                type="text"
                name="password"
                placeholder='password'
                value={password}
                onChange={inputChangeHandler}
            />

            <input
                className='bg-white text-black'
                type="button"
                value="start client"
                onClick={sendCodeHandler}
            />

            <input
                className='bg-white text-black'
                type="text"
                name="phoneCode"
                placeholder='phoneCode'
                value={phoneCode}
                onChange={inputChangeHandler}
            />

            <input
                className='bg-red-500 text-white'
                type="button"
                value="insert code"
                onClick={clientStartHandler}
            />
        </div>
    )
}

export default test;