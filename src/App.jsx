import React, {useState, useEffect} from "react";
import {ethers} from 'ethers'
import AccountBalances from "./AccountBalances";
import AccountInput from "./AccountInput";
import ColorSwitcher from "./ColorSwitcher";
import './App.css';

function App() {
    const [theme, setTheme] = useState('dark-mode');
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(false);
    const [ganacheConnected, setGanacheConnected] = useState(true);


    const toggleTheme = () => {
        setTheme((prevTheme)=> prevTheme === 'dark-mode' ? 'light-mode' : 'dark-mode' );
    };

    //Intentar conectar a Ganache cuando se carga la app
    useEffect(()=> {
        const checkGanacheConnection = async () => {
            try {
                const provider = new ethers.providers.JsonRpcBatchProvider('http://127.0.0.1:7545');
                await provider.getBlockNumber(); //obtener el numero de bloque actual para verificar conexion
                setGanacheConnected(true);
            }catch(error) {
                console.error('Error de conexion con Ganache: ', error);
                setGanacheConnected(false);
            }
        };
        checkGanacheConnection();
    },[]);

    const fetchBalances = async (addresses) => {
        setLoading(true);
        setBalances({}); // restablecer balances antes de una nueva consulta
        try {
            const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
            const balancesData = {};
            for(const address of addresses) {
                if(ethers.utils.isAddress(address)) {
                    const balance = await provider.getBalance(address);
                    balancesData[address] = ethers.utils.formatEther(balance);
                } else {
                    balancesData[address] = 'Direccion no valida.'
                }
            }
            setBalances(balancesData);
        }catch(error){
            console.error("Error al obtener los balances",error);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className={theme}>
           <h1>Consultar Saldos de Ganache</h1>
           {/**Alerta de conexion de Ganache */}
           {!ganacheConnected && (
            <div>
                <p>Error: Ganache no esta conectado.
                    Por favor abra Ganache y recargue la pagina.
                </p>
            </div>
           )}

           {ganacheConnected && (
            <>
            <AccountInput onFetchBalances={fetchBalances} />
            {loading ? <p>Cargando balances...</p> : <AccountBalances balances={balances} />}
            </>
           )}
           
           <ColorSwitcher toggleTheme={toggleTheme}/>
        </div>
    );
}

export default App;