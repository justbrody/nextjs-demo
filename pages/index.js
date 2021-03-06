import Link from 'next/link'

const NOS = 'http://www.nos.nl'

export default () => (
  <div>
    <h1>Welkom bij Avinty POC-app</h1>
    <ul>
      <li><Link href='/home'><a>Home</a></Link></li>
      <li><Link href='/caseload'><a>Caseload</a></Link></li>
      <li><Link href='/redux'><a>redux</a></Link></li>
      <li><Link href='/dashboard?v=876sadf987safkhsdf7af8'><a>dashboard</a></Link></li>
      <li><Link as={`u/nos`} href={`/url-loader?url=${NOS}`}><a>NOS</a></Link></li>
      <li><Link as={`u/nu`} href={`/url-loader?url=${'http://www.nu.nl'}`}><a>NU</a></Link></li>
    </ul>
  </div>
)
