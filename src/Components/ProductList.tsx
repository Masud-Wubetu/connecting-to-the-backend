import React, { useEffect, useState } from 'react'

const ProductList = ({ category }:{category: string}) => {
    const [products, setproducts] = useState<string[]>([]);

    useEffect(() => {
        console.log("Fetching Products in", category);
        setproducts(['Clothing', 'Household'])
    }, [category]);


  return (
    <div>ProductList</div>
  )
}

export default ProductList