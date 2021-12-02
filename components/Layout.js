import { cloneElement, useEffect, useState } from 'react'
import Web3 from 'web3'
import Head from 'next/head'
import LeftMenu from './Header/LeftMenu'
import Header from './Header/Header'

export const Layout = ({children}) => {  
  const [menu, setMenu] = useState()
  const [mmNetwork, setMMNetwork] = useState({})
  const [user, setUser] = useState()
  const [loader, setLoader] = useState(true)
  const [ethereumAvailability, setEthereumAvailability] = useState(false)

  let networks = {
    '0x1': {name: 'Ethereum Main Network', theme: '#29b6af'},
    '0x3': {name: 'Ropsten Test Network', theme: '#ff4a8d'},
    '0x4': {name: 'Rinkeby Test Network', theme: '#f6c343'},
    '0x5': {name: 'Goerli Test Network', theme: '#3099f2'},
    '0x2a': {name: 'Kovan Test Network', theme: '#9064ff'},
    '0x38': {name: 'Binance Smart Chain', theme: '#f6c343'}
  }

  const getUser = async() => {
    let web3
    if(window.ethereum) {
      web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    }

    const accounts = await web3.eth.getAccounts()
    accounts.length > 0 && await connectMetamask()
  }

  const connectMetamask = async() => {
    let accounts
    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
      const network = await ethereum.request({ method: 'eth_chainId' })

      setMMNetwork({
        name: networks[network].name,
        theme: networks[network].theme,
      })
      setUser({address: accounts[0]})
      setEthereumAvailability(true)
    } catch (error) {
      setEthereumAvailability(false)
      console.log(error)
    }
  }

  useEffect(async() => {
    if (typeof window.ethereum !== 'undefined') {
      await getUser()
    } else setEthereumAvailability(false)

    setMenu(window.innerWidth > 650 ? true : false)
    setLoader(false)
  }, [])

  return (
    <div>
      <Head>
        <link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet" />
        <link rel='icon' type='image/png' href={'/images/logos/logo.png?' + new Date().getTime()} />
        <link rel="apple-touch-icon" href={'/images/logos/logo.png?' + new Date().getTime()} />
        <title>Belair DEX</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      {!loader &&
        <div className='layout'>
          <LeftMenu 
            network={mmNetwork}
            ethereumAvailability={ethereumAvailability}
            menu={menu} />

          <main>
            <Header 
              connect={connectMetamask}
              user={user}
              ethereumAvailability={ethereumAvailability}
              menu={menu} 
              setMenu={setMenu} />

            {cloneElement(children, {user, ethereumAvailability})}
          </main>
        </div>}
    </div>
  )
}