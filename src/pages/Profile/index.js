import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiCheckCircle, FiPower, FiTrash2 } from 'react-icons/fi'
import jwt_decode from 'jwt-decode';

import logoImg from '../../assets/logo.svg';
import './styles.css'
import api from '../../services/api';

export default function Profile(){
    const token = localStorage.getItem('token');
    const [animals, setAnimals] = useState([]);
    const history = useHistory();

    function isAdmin(){
        const decoded = jwt_decode(token);
        return decoded.role === 'ADMIN';
    }

    useEffect(() => {
        //TODO: retrieve animals

        //if isAdmin() === true, return all animals
        //otherwise, filter animals by status = available 
        
            api.get('animals').then(response =>{
                setAnimals(response.data);
            });
        
    });

    async function handleDeleteAnimal(id) {
        try{
            //TODO : delete animal
            await api.delete('', {
                headers: {
                    Authorization: '',
                }
            });

            setAnimals(animals.filter(incident => incident.id !== id));
            
        }
        catch(err){
            alert(`Erro ao deletar animal: ${err}`);
        }
    }

    async function handleAdoptAnimal(id) {
        try{
            //TODO : adopt animal
            const response = await api.post('', {}, {
                
            });

            setAnimals(animals.filter(incident => incident.id !== id));
            alert(`Itimalia! Você adotou ${response.data.name}. Cuide com todo o amor e carinho :)`)
        }
        catch(err){
            alert(`Erro ao adotar animal: ${err}`);
        }
    }
    
    function handleLogoff(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda</span>

                {isAdmin() && 
                <Link className="button" to="/animals/new">
                    Cadastrar novo animal
                </Link>}
                <button type="button" onClick={handleLogoff}>
                    <FiPower size={18} color="#e02041" />
                </button>
            
            </header>

            <h1>Animais Cadastrados</h1>

            <ul>
                {animals.map(animal => (
                    <li key={animal.id}>
                    <strong>Nome:</strong>
                    <p>{animal.name}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{animal.description}</p>

                    {/* TODO: fill with specie, status, and sex info (plus: put size and age too)*/}

                    {isAdmin() && <button type="button" onClick={() => handleDeleteAnimal(animal.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>}

                    {!isAdmin() && <button type="button" onClick={() => handleAdoptAnimal(animal.id)}>
                        <FiCheckCircle size={20} color="#00e600" />
                    </button>}
                </li>
                ))}
            </ul>
        </div>
    )
}