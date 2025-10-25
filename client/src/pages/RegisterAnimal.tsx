import KField from "../components/form/KField.tsx";
import {useState} from "react";
import '../styles/registerAnimal.css'
import '../styles/form.css'
import KSelect from "../components/form/KSelect.tsx";
import KButton from "../components/form/KButton.tsx";
import {LostAnimal} from "../types/lostAnimals.ts";
import {getCurrentDate, getCurrentTime} from "../utils/utils.ts";

const RegisterAnimal = () => {

    const [animal, setAnimal] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [address, setAddress] = useState<string | number[]>('');
    const [gender, setGender] = useState<string>('');
    const [distinctiveMarkings, setDistinctiveMarkings] = useState<string>('');

    const isAddressValid =
        Array.isArray(address) &&
        address.length === 2 &&
        address.every((item) => typeof item === 'number');
    const enableSubmit = animal.length && color.length && isAddressValid && gender.length;

    async function getCityFromCoordinates(lat, lng) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;

        const response = await fetch(url);
        const data = await response.json();

        return data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.municipality ||
            data.address.hamlet ||
            data.address.county ||
            data.address.state_district ||
            data.address.state
    }

    const saveAnimal = async() => {
        getCityFromCoordinates(address[0], address[1])
            .then(async (city) => {
                const newLostAnimal: LostAnimal = {
                    species: animal,
                    location: city,
                    color: color,
                    imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
                    gender: gender,
                    distinctiveMarkings: distinctiveMarkings,
                    lat: address[0],
                    lng: address[1],
                    date: getCurrentDate(),
                    hour: getCurrentTime(),
                };

                const response = await fetch('http://localhost:5000/lost-animals/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newLostAnimal)
                });
            })
            .catch((error) => {
                alert(error);
            })
    }

    return (
        <div className="form-container">
            <div className="form-body">
                <h2>Register an animal</h2>
                <div
                    className="field-form"
                >
                    <KSelect
                        label="Animal"
                        placeholder="Animal"
                        option={animal}
                        setOption={setAnimal}
                        options={['Chien', 'Chat', 'Lapin']}
                    />
                </div>
                <div
                    className="field-form"
                >
                    <KSelect
                        label="Sexe"
                        placeholder="Sélectionner le genre"
                        option={gender}
                        setOption={setGender}
                        options={['Male', 'Female', 'Inconnu']}
                    />
                </div>
                <div
                    className="field-form"
                >
                    <KField
                        label="Couleur"
                        placeholder="Entrer la couleur de l'animal"
                        inputValue={color}
                        setInputValue={setColor}
                    />
                </div>
                <div
                    className="field-form"
                >
                    <KField
                        label="Adresse"
                        placeholder="Entrer l'addresse où l'animal a été vu"
                        inputValue={address}
                        setInputValue={setAddress}
                        autocompleteLocation={true}
                    />
                </div>
                <div
                    className="field-form"
                >
                    <KField
                        label="Signes distinctifs"
                        placeholder="Lister les signes distinctifs"
                        inputValue={distinctiveMarkings}
                        setInputValue={setDistinctiveMarkings}
                    />
                </div>
            </div>
            <div className="form-footer">
                <KButton
                    label="Enregistrer"
                    handleClick={saveAnimal}
                    disabled={!enableSubmit}
                />
            </div>
        </div>
    );
};

export default RegisterAnimal;
