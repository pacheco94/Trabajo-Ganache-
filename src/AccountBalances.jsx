import React from "react";

function AccountBalances({balances}) {
    return(
         <div>
            <h2>Balance de cuentas</h2>
            <ul>
                {Object.keys(balances).map((address,index) => (
                    <li key={index}>
                        Direccion: {address} -Balance: {balances[address]} ETH

                    </li>
                 ))}
            </ul>
         </div>
    );
}

export default AccountBalances;