import React from 'react'
import WalletCard from '@/components/provider/wallet/WalletCardComponent'
import QRCodeCard from '@/components/provider/QRcodeComponent'
import TippingHistory from '@/components/provider/TippingHistoryComponent'

//fetch for the username
const page = () => {
  return (
    <div>
      
      <div>
        <WalletCard/>
      </div>
      <div>
        <QRCodeCard username='waynelagat379'/>
      </div>
      <div>
        <TippingHistory/>
      </div>
      </div>
  )
}

export default page