import React , {ChangeEvent, ChangeEventHandler, SyntheticEvent, useState, useRef, MutableRefObject} from 'react';
import logo from './logo.svg';
import './App.css';
import { transpileModule } from 'typescript';
import { ETIME } from 'node:constants';
 

interface IProduct { 

  price:number,
  category:string,
  id:number,
  deleteP ( id:number ) : void
  update ( id:number ) : void 

}

type TProduct = {

  price:number,
  category:string,
  id:number,
  
}

let Products : Array<TProduct> = [

  {id:1,price:100,category:"car"},
  {id:2,price:150,category:"home"},
  {id:3,price:200,category:"bed"},
  {id:4,price:100,category:"door"},

]

function App() : JSX.Element {

  const [ currentProducts  , setCurrentProducts ] = useState(Products)


  const onSearchChange = ( event : ChangeEvent<HTMLInputElement> ) : void => {
  
      const updatedArray : Array<TProduct> = Products.filter((item,i)=>{

         if(event.target.value) {

           return item.category.includes(event.target.value)

         } else { return true; }
         
      })
      
      setCurrentProducts(updatedArray);

  }

  const onAddProduct = () : void => {

      const addProductInput : HTMLInputElement = document.querySelector(".addProductInput") as HTMLInputElement;

      const updatedArray : Array<TProduct> = currentProducts.concat({ 
          id:Math.random(), 
          category:addProductInput.value.split(" ")[0],
          price:parseInt( addProductInput.value.split(" ")[1] )
      });

      Products = updatedArray;
      setCurrentProducts(updatedArray);

  }

  const onDelete = ( id:number ) : void => {

      const updatedArray : Array<TProduct> = currentProducts.filter((item,i)=>{

        return id != item.id

      })

      Products = updatedArray;
      setCurrentProducts(updatedArray);

  }

  const onUpdate = ( id:number ) : void => {

      const updateInput : HTMLInputElement = document.querySelector(".updateInput" + id) as HTMLInputElement;

      const updatedArray : Array<TProduct> = currentProducts.map((item,i)=>{

        if(item.id == id) {
          return {...item,category:updateInput.value}
        } else {
          return item
        }

        
      })

      Products = updatedArray;
      setCurrentProducts(updatedArray);

  }


  return (
    <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

      <div style={{width:"600px",display:"flex",justifyContent:"space-around"}} >
            <input onChange = {onSearchChange} /> SEARCH
            <input 
               
               className="addProductInput"
               onKeyDown ={ (e)=> { 

                  if (e.key == "Enter" ) {

                      onAddProduct();

                  }

               }}/> ADD
      </div>

      <ul style={{width:"400px"}}>
        {
          currentProducts.map((item,index)=>{

            return  <Product  
            price = {item.price} 
            category = {item.category} 
            id={item.id}  
            deleteP = {onDelete}
            update = {onUpdate} />

          })
        }
      </ul>

    </div>
  );
}

const Product : React.FC<IProduct> = ( { price , category , id , update , deleteP } ) : JSX.Element =>{

    return <li style={{width:"100%",display:"flex",justifyContent:"space-between"}} >

        <div>
            <span>{price}$  </span>
            <span>{category} </span>
        </div>
     

        <div>
            <button onClick={ () => { deleteP(id) }  }> delete </button>
            <button onClick={ () => { update(id) }  }> update </button>
            <input  className = { "updateInput" + id }/>
        </div>
       

    </li> 

} 

export default App;
