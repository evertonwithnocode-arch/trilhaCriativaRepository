import React, { useState } from "react";
import { Users } from "lucide-react";
import { FormButton } from "./FormButton";
import { PhotoUpload } from "./PhotoUpload";
import { SelectField } from "./SelectField";
import { FormField } from "./FormField";

interface TeamMember {
    name: string;
    role: string;
}

interface MemberFormData {
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    gender: string;
    professionalRegistry: string;
    permissions: string;
    photo: File | null;
}

const TeamPage: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([
        { name: "Nome Sobrenome", role: "Especialidade" },
        { name: "Nome Sobrenome", role: "Especialidade" },
        { name: "Nome Sobrenome", role: "Especialidade" },
        { name: "Nome Sobrenome", role: "Especialidade" },
        { name: "Nome Sobrenome", role: "Especialidade" },
    ]);

    const genderOptions = [
        { value: 'feminino', label: 'Feminino' },
        { value: 'masculino', label: 'Masculino' },
        { value: 'outro', label: 'Outro' },
        { value: 'nao-informar', label: 'Prefiro não informar' }
    ];
    const permissionOptions = [
        { value: 'admin', label: 'Administrador' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Visualizador' },
        { value: 'contributor', label: 'Colaborador' }
    ];

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<MemberFormData>({
        fullName: 'Maria Santos Domingues',
        email: 'dra.mariasantos@gmail.com',
        phone: '(84) 9 9123.4567',
        birthDate: '12/10/2017',
        gender: 'feminino',
        professionalRegistry: 'CRP 01/23456',
        permissions: '',
        photo: null
    });

    const handleInputChange = (field: keyof MemberFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePhotoSelect = (file: File | null) => {
        setFormData(prev => ({
            ...prev,
            photo: file
        }));

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your backend
    };

    const handleClose = () => {
        setShowForm(false);
        // Here you would typically navigate back or close the modal
    };



    return (
        <div className="min-h-screen bg-[#FEF2CC] h-[700px] relative">
            {/* Conteúdo da página */}
            <div className="bg-[#FEF2CC] w-full px-10 py-8">
                <div className="flex justify-between items-center">
                    <p className="text-gray-800 text-sm">
                        Confira abaixo a lista de membros da sua equipe.
                    </p>
                    <button
                        className="bg-[#FCE699] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#fbbf24] transition"
                        onClick={() => setShowForm(true)}
                    >
                        Cadastrar novo membro
                    </button>
                </div>

                {/* Lista de membros */}
                <div className="mt-6 flex flex-col gap-4">
                    {members.map((m, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-[#FCE699] rounded-lg p-3">
                                    <Users className="text-yellow-600" size={24} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-800">{m.name}</span>
                                    <span className="bg-[#FFF7DC] text-xs text-gray-700 px-2 py-0.5 rounded-full border border-[#E5D8A6]">
                                        {m.role}
                                    </span>
                                </div>
                            </div>
                            <button className="bg-[#FCE699] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#fbbf24] transition">
                                Editar
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Formulário de cadastro (modal) */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Fundo escuro */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={handleClose} // fecha ao clicar no fundo
                    ></div>

                    {/* Conteúdo do modal */}
                    <div className="relative z-10 max-w-[801px] w-full mx-4">
                        <div className="shadow-[0_3px_0_0_#FFE0B2] flex w-full flex-col items-stretch bg-white pt-6 pb-10 rounded-3xl border-2 border-solid border-[#FBDEB1]">
                            <header className="self-center flex w-full max-w-[753px] items-stretch gap-5 text-lg text-[#2C2623] font-extrabold tracking-[0.18px] leading-none flex-wrap justify-between">
                                <h1 className="text-[#2C2623]">
                                    Adicionar membro
                                </h1>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="aspect-[1] object-contain w-6 shrink-0 hover:opacity-70 transition-opacity"
                                    aria-label="Fechar formulário"
                                >
                                    <img
                                        src="https://api.builder.io/api/v1/image/assets/7866627671144d8d8b91ecf861203027/a4e688aa6e475f69b18c31a86a8562839b5e585f?placeholderIfAbsent=true"
                                        className="w-full h-full"
                                        alt=""
                                    />
                                </button>
                            </header>

                            <div className="min-h-0.5 w-full bg-[#FEF2CC] mt-[22px] border-[rgba(254,242,204,1)] border-solid border-2" />

                            <form
                                onSubmit={handleSubmit}
                                className="flex w-full flex-col items-stretch mt-10 px-10 max-md:px-5"
                            >
                                <div>
                                    <div className="gap-5 flex max-md:flex-col">
                                        <div className="w-[76%] max-md:w-full">
                                            <fieldset className="grow font-medium">
                                                <legend className="sr-only">Informações do membro</legend>

                                                <FormField
                                                    label="Nome completo"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange('fullName')}
                                                    placeholder="Digite o nome completo"
                                                />

                                                <FormField
                                                    label="E-mail"
                                                    value={formData.email}
                                                    onChange={handleInputChange('email')}
                                                    type="email"
                                                    placeholder="Digite o e-mail"
                                                    className="whitespace-nowrap"
                                                />

                                                <FormField
                                                    label="Telefone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange('phone')}
                                                    type="tel"
                                                    placeholder="Digite o telefone"
                                                />

                                                <FormField
                                                    label="Data de nascimento"
                                                    value={formData.birthDate}
                                                    onChange={handleInputChange('birthDate')}
                                                    type="date"
                                                    placeholder="DD/MM/AAAA"
                                                />

                                                <SelectField
                                                    label="Gênero"
                                                    value={formData.gender}
                                                    onChange={handleInputChange('gender')}
                                                    options={genderOptions}
                                                />

                                                <FormField
                                                    label="Registro Profissional"
                                                    value={formData.professionalRegistry}
                                                    onChange={handleInputChange('professionalRegistry')}
                                                    placeholder="Digite o registro profissional"
                                                />

                                                <SelectField
                                                    label="Permissões"
                                                    value={formData.permissions}
                                                    onChange={handleInputChange('permissions')}
                                                    options={permissionOptions}
                                                />
                                            </fieldset>
                                        </div>

                                        <div className="w-[24%] max-md:w-full">
                                            <PhotoUpload
                                                onPhotoSelect={handlePhotoSelect}
                                                currentPhoto={photoPreview}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <FormButton type="submit" variant="primary">
                                    Concluir cadastro
                                </FormButton>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamPage;
