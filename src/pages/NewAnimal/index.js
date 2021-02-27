import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewAnimal(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');

    //remove token
    const history = useHistory();

    async function handleNewAnimal(e){
        e.preventDefault();

        const data ={
            name,
            description,
            age
        }

        try {
            //TODO: create animal.
            //tip: fill other data values with default values.
            const response = await api.post('', {}, {
                headers: {
                    Authorization: ''
                }
            });

            history.push('/profile');
        }
        catch(err){
            alert(`Ocorreu um erro: ${err}`);
        }
    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                
                    <h1>Cadastrar novo animal</h1>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16}  color="#e02041"/>
                        Voltar para home                  
                    </Link>
                </section>

                <form>
                <input 
                    placeholder="Nome do animal" type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}    
                />
                <textarea 
                    placeholder="Descrição" type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}    
                />
                <input 
                    placeholder="Idade" 
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}    
                />
                <button className="button" type="submit" onClick={handleNewAnimal}>Cadastrar</button>
                
                </form>
            </div>

        </div>
    )
}
