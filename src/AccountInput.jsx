import React, {useState} from "react";

function AccountInput({onFetchBalances}) {
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState('');
    const [balances, setBalances] = useState({});
    

    //Agregamos la direccion actual a la lista de direcciones y limpiamos el input
    const addAddress = () => {
        if(currentAddress) {
            setAddresses([...addresses,currentAddress]);
            setCurrentAddress(''); // Limpiamos el input despues de agregar una direccion

        }
    };

    //Enviamos las direcciones al componente padre
    const handleFetchBalances = () => {
       onFetchBalances(addresses);
    };

    //funcion para restar la aplicacion
    const resetApp = () => {
        setAddresses([]);//limpiamos las direccones
        setBalances({}); //Limpiamos los balances
        setCurrentAddress(''); //limpiamos el input de las direcciones
    }

    return(
       <div style={{padding:'20px'}}>
        <h2>Ingrese una direccion para consultar el saldo</h2>
        <input
           type="text"
           placeholder="Ingrese una direccion 0X1f23gl566..."
           value={currentAddress}
           onChange={(e) => setCurrentAddress(e.target.value)}
        />
        <button onClick={addAddress}>Agregar Direccion</button>

        <h2>Direcciones a consultar</h2>
        <ul>
            {addresses.map((address,index) => (
                <li key={index}>{address}</li>
            ))}
        </ul>
        <button onClick={handleFetchBalances}>Consultar Saldo</button>
        <button onClick={resetApp}>Resetear App</button>

       </div>

    );
   
    
}

export default AccountInput;