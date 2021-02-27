import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import './styles.css'

export default function Register(){

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        //TODO: fill the other values with default values
        const data = {
            name,
            email,
            password,
            phone
        };

        try{
            //TODO: make request to create user
            await api.post('', {});
            alert(`Usuário cadastrado com sucesso`);
            history.push('/');         
        }

        catch(err){
            alert(`Erro no cadastro ${err}, tente mais tarde.`)
        }
    }
    
    return (
       <div className="register-container">
           <div className="content">
               <section>
                   <img src={logoImg} alt="Be The Hero"/>
                  
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude animais a encontrarem seu lar</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16}  color="#e02041"/>
                        Voltar para o logon                   
                    </Link>
               </section>

               <form onSubmit={handleRegister}>
                <input 
                    placeholder="Nome da ONG"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input 
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                />
                <input 
                    placeholder="Telefone"
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <button className="button" type="submit">Cadastrar</button>
                
               </form>
           </div>

       </div>
    )
}