import { useEffect, useState } from 'react'

const useNetwork = () => {
  const [networkInfo, setNetworkInfo] = useState({
    downlink: null,
    effectiveType: null,
    rtt: null,
  })

  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    const updateNetworkInfo = () => {
      if (connection) {
        setNetworkInfo({
          downlink: connection.downlink,
          effectiveType: connection.effectiveType,
          rtt: connection.rtt,
        })
      }
    }

    updateNetworkInfo()

    if (connection) {
      connection.addEventListener('change', updateNetworkInfo)
    }

    return () => {
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo)
      }
    }
  }, [])

  return networkInfo
}

export default useNetwork
