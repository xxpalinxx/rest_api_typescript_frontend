import { ActionFunctionArgs, Form, Link, useActionData, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
    }
    if(error.length){
        return error
    }
    
    await addProduct(data)
    console.log('Producto agregado correctamente', data)
    
    return redirect('/')
}


export default function NewProduct() {
    
    const error = useActionData() as string


    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Producto</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"      
                method="POST"
            >

                <ProductForm />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
