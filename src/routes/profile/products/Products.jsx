import DashboardContent from "../../../components/dashboard-content/DashboardContent"
import { useFetch } from "../../../hooks/useFetch"

const Products = () => {
  const [products, loading] = useFetch("/products");  

  return (
    <>
      <DashboardContent title={"Products"}  data={products} loading={loading}/>
    </>

  )
}

export default Products