import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  
  const welcome = user ? `Welcome ${user}` : 'welcome'
  const tokenAbbre = `${token.slice(0,9)}...`

  return (
    <div>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbre}</p>
      <p><Link to='/home'>go to home</Link></p>

    </div>
  )
}

export default Welcome
