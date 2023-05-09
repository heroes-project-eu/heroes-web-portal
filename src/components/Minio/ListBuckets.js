import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { MTable, MHead, MTh, MTd, MBody, MDiv} from './styles'
//import format from "date-fns/format"


const ListBuckets = () => {
    const [ buckets, setBuckets ] = useState("")
    const [ isAnyBucket, setIsAnyBucket ] = useState(false)
    const [ bucketError, setBucketError ] = useState(true)
    const [ isLoading, setIsLoading ] = useState(true)
    
    const ENDPOINT = 'https://api.heroes-project.eu'
    const jwt = window.sessionStorage.getItem("jwt")

    const getBuckets = async () => {
        fetch(`${ENDPOINT}/organization/data/list`, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "token": `${jwt}`,
        },
        }).then((response) => response.json())
        .then((buckets) => {
          if (buckets !== "") {
            setBuckets(buckets)
            setIsAnyBucket(true)
            setBucketError(false)
            setIsLoading(false)
            console.log("buckets", buckets)
        }
        })
    }

    useEffect(() => {
      getBuckets()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
    
    <MDiv>
    <h1>My buckets</h1>
    { isLoading ?
    <p> Loading ...</p> :
    <div>
    { isAnyBucket ?
    <MTable>
      <MHead>
        <tr>
          <MTh>Bucket name</MTh>
          <MTh>Creation date</MTh>
        </tr>
      </MHead>
      <MBody>
        {buckets.map((bucket) => {
          return (
          <tr key={bucket.bucket_name}>
            <MTd>
              <Link to={`/data/list-objects/${bucket.bucket_name}`}>{bucket.bucket_name}</Link>
            </MTd>
            {/* <MTd>{format(bucket.creation_date, "dd MMM yyyy   hh:mm a")}</MTd> */}
            <MTd>{bucket.creation_date}</MTd>
          </tr>
          )
        })}
      </MBody>
    </MTable>
    :  <p>No buckets...</p>  }
    { bucketError ? <p>due to connection issues</p> : null} </div>}
    </MDiv>
    )
}

export default ListBuckets