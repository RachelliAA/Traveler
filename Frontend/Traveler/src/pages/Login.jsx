import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <>
      here will be login meanwhile just links to other pages
      <button onClick={()=>navigate('/home')}>Home page</button>
      <button onClick={()=>navigate('/newtrip')}>New trip</button>
      <button onClick={()=>navigate('/details')}>trip details</button>
    </>
  );
}

export default Login;
