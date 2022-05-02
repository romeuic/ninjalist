import { endpoints } from '../../utils/endpoints'

// this runs in build time server side
export const getStaticPaths = async () => {
  const res = await fetch(endpoints.jph.users)
  const data = await res.json()

  const paths = data.map(ninja => ({
    params: { id: ninja.id.toString() }
  }))

  return { paths, fallback: false }
}
// this runs in build time server side
export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch(`${endpoints.jph.users}/${id}`)
  const data = await res.json()

  return { props: { ninja: data } }
}

const Details = ({ ninja }) => {
  return (
    <div>
      <h1>{ninja.name}</h1>
      <p>{ninja.email}</p>
      <p>{ninja.website}</p>
      <p>{ninja.address.city}</p>
    </div>
  )
}

export default Details

/*
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
*/
