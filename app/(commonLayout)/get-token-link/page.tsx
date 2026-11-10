
import { getAllTokens } from '@/action/token.action'
import CreateToken from '@/components/get-token/CreateToken'
import TokensView from '@/components/view-token/TokenView'


export default async function GetToken() {

    const allTokens = await getAllTokens()
    console.log("all token",allTokens)

  return (
    <div>
        
        
        <CreateToken/>
        <TokensView/>
        
        </div>
  )
}
