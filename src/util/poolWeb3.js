import Web3 from 'web3'

let pollWeb3 = function (store) {
  let state = store.state
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)
  // console.log(store)

  setInterval(() => {
    if (web3 && state.web3.web3Instance) {
      if (web3.eth.coinbase !== state.account.address) {
        let newAddress = undefined

        web3.eth.getCoinbase(function (err, coinbase) {
          if (err) {
            console.log('Unable to retrieve coinbase')
          } else {
            newAddress = coinbase
            console.log("1 " + newAddress)

            web3.eth.getBalance(newAddress, function (err, newBalance) {
              if (err) {
                console.log(err)
              } else {
                store.dispatch('updateAccount', {
                  coinbase: newAddress,
                  balance: parseInt(newBalance, 10)
                })
              }
            })
          }
        })
      } else {
        // web3.eth.getBalance(state.account.address, (err, polledBalance) => {
        //   if (err) {
        //     console.log(err)
        //   } else if (parseInt(polledBalance, 10) !== state.account.balance) {
        //     store.dispatch('newAddress', {
        //       address: newCoinbase,
        //       balance: parseInt(newBalance, 10)
        //     })
        //   }
        // })
      }
    }
  }, 500)
}

export default pollWeb3
