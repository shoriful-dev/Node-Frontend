import { useParams } from "react-router";
import { usegetsingleproduct } from "../../../hooks/api";
const SingleProductView = () => {
  let {slug} = useParams();
  const {data} =  usegetsingleproduct(slug)
  console.log(data);
  
    
  return (
    <div>SingleProductView</div>
  )
}

export default SingleProductView