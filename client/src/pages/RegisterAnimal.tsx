import KButton from "../components/form/KButton.tsx";
import KField from "../components/form/KField.tsx";
import KSelect from "../components/form/KSelect.tsx";
import KUpload from "../components/form/KUpload.tsx";
import { useState } from "react";
import '../styles/registerAnimal.css'
import '../styles/form.css'
import { getCurrentDate, getCurrentTime } from "../utils/utils.ts";

const RegisterAnimal = () => {
    const [animal, setAnimal] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [address, setAddress] = useState<string | number[]>('');
    const [gender, setGender] = useState<string>('');
    const [distinctiveMarkings, setDistinctiveMarkings] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const isAddressValid =
        Array.isArray(address) &&
        address.length === 2 &&
        address.every((item) => typeof item === 'number');
    const enableSubmit = animal.length && color.length && isAddressValid && gender.length && !!file;

    async function getCityFromCoordinates(lat: number, lng: number) {
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
            data.address.state;
    }

    const saveAnimal = async () => {
        if (!file) {
            alert('Veuillez sélectionner une image');
            return;
        }

        setLoading(true);
        try {
            const city = await getCityFromCoordinates(address[0], address[1]);
            const formData = new FormData();
            formData.append('species', animal);
            formData.append('location', city);
            formData.append('color', color);
            formData.append('gender', gender);
            formData.append('distinctiveMarkings', distinctiveMarkings);
            formData.append('lat', address[0].toString());
            formData.append('lng', address[1].toString());
            formData.append('date', getCurrentDate());
            formData.append('hour', getCurrentTime());
            formData.append('image', file);

            const response = await fetch('http://localhost:5000/lost-animals/', {
                method: 'POST',
                body: formData,
            });

            if (response.status !== 201) {
                throw new Error('Erreur lors de l\'enregistrement');
            }

            const data = await response.json();
            console.log('Animal saved:', data);
            alert('Animal enregistré avec succès !');
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'envoi : ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-body">
                <h2>Register an animal</h2>
                <div className="field-form">
                    <KSelect
                        label="Animal"
                        placeholder="Animal"
                        option={animal}
                        setOption={setAnimal}
                        options={['Chien', 'Chat', 'Lapin']}
                    />
                </div>
                <div className="field-form">
                    <KSelect
                        label="Sexe"
                        placeholder="Sélectionner le genre"
                        option={gender}
                        setOption={setGender}
                        options={['Male', 'Femelle', 'Inconnu']}
                    />
                </div>
                <div className="field-form">
                    <KField
                        label="Couleur"
                        placeholder="Entrer la couleur de l'animal"
                        inputValue={color}
                        setInputValue={setColor}
                    />
                </div>
                <div className="field-form">
                    <KField
                        label="Adresse"
                        placeholder="Entrer l'addresse où l'animal a été vu"
                        inputValue={address}
                        setInputValue={setAddress}
                        autocompleteLocation={true}
                    />
                </div>
                <div className="field-form">
                    <KField
                        label="Signes distinctifs"
                        placeholder="Lister les signes distinctifs"
                        inputValue={distinctiveMarkings}
                        setInputValue={setDistinctiveMarkings}
                    />
                </div>
                <div className="field-form">
                    <KUpload
                        label="Uploader une image"
                        inputFile={file}
                        setInputFile={setFile}
                    />
                </div>
            </div>

            <div className="form-footer">
                <KButton
                    label={loading ? "Enregistrement..." : "Enregistrer"}
                    handleClick={saveAnimal}
                    disabled={!enableSubmit || loading}
                />
            </div>
        </div>
    );
};

export default RegisterAnimal;
