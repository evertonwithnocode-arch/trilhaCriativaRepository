import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export default function Index() {
    const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
    const [selectedPeriod, setSelectedPeriod] = useState("annual");

    return (
        <div className="min-h-screen bg-[#FFFCF2] overflow-hidden">
            {/* Background decorative elements */}


        

            {/* Header */}
            <div className=" px-4 lg:px-8 pb-20">
                {/* Logo */}
                <div className="pt-10 pl-8">
                    <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/09b8c8b2251ba50585cbbd8ee69d204f9ad06348?width=240"
                        alt="Logo"
                        className="w-[120px] h-[78px] object-cover"
                    />
                </div>

                {/* Main Title */}
                <div className="text-center mt-8 mb-16">
                    <h1 className="font-baloo text-[32px] font-[800] leading-[32px] text-dark-gray tracking-[-0.32px]">
                        Experimente primeiro,<br />
                        pague depois!
                    </h1>
                </div>

                <div className="flex justify-center mb-16 gap-4">
                    <button

                        className={`flex h-10 justify-center items-center gap-4 px-5 py-2 rounded-xl transition-all ${selectedPeriod === 'annual'
                                ? 'bg-[#FBDEB1]'
                                : 'shadow-[0_3px_0_0_#FFE0B2] bg-[#FFFCF2] border-2 border-solid border-[#FBDEB1]'
                            } `}
                    >
                        <div className="text-[#2C2623] text-sm font-extrabold leading-5 tracking-[0.14px]">
                            Anual
                        </div>
                    </button>
                    <button
                        className={`flex h-10 justify-center items-center gap-2 px-5 py-2 rounded-xl transition-all ${selectedPeriod === 'monthly'
                                ? 'bg-[#FBDEB1]'
                                : 'shadow-[0_3px_0_0_#FFE0B2] bg-[#FFFCF2] border-2 border-solid border-[#FBDEB1]'
                            }`}
                    >
                        <div className="text-[#2C2623] text-sm font-extrabold leading-5 tracking-[0.14px]">
                            Mensal
                        </div>
                    </button>
                </div>

                {/* Pricing Cards */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 px-4 lg:px-16">
                        {/* Pro Plan */}
                        <div className="bg-white shadow-[0_3px_0_0_#FFE0B2] relative bg-white p-10 rounded-3xl border-2 border-solid border-[#FBDEB1]">
                            <div className="mb-6">
                                <h2 className="font-baloo text-[32px] font-[800] leading-[32px] text-dark-gray tracking-[-0.32px] mb-2">
                                    Pro
                                </h2>
                                <p className="font-nunito text-[18px] font-[500] text-dark-gray">
                                    Para profissional
                                </p>
                            </div>

                            <div className="flex items-center justify-between mb-8">
                                <div className="font-baloo text-[64px] font-[800] leading-[64px] text-dark-gray tracking-[-0.64px]">
                                    R$ 59,90
                                </div>
                                <div className="font-nunito text-[16px] font-[500] text-dark-gray leading-[20px] text-right">
                                    por mês<br />
                                    pago anualmente
                                </div>
                            </div>

                            <button className="w-full bg-[#F7B34D] text-white font-nunito text-[18px] font-[800] py-3 px-6 rounded-xl mb-8 hover:bg-orange/90 transition-colors">
                                Testar por 7 dias
                            </button>

                            <div className="space-y-4">
                                {[
                                    '1 profissional',
                                    'Até 10 pacientes ativos',
                                    'Acesso completo �� biblioteca de jogos',
                                    'Painel de desempenho por paciente',
                                    'Relatórios exportáveis (PDF/Excel)',
                                    'Suporte padrão'
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <ChevronRightIcon />
                                        <span className="font-nunito text-[16px] font-[500] text-dark-gray leading-[20px]">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Time Plan */}
                        <div className="bg-white shadow-[0_3px_0_0_#FFE0B2] relative bg-white p-10 rounded-3xl border-2 border-solid border-[#FBDEB1]">
                            <div className="mb-6">
                                <h2 className="font-baloo text-[32px] font-[800] leading-[32px] text-dark-gray tracking-[-0.32px] mb-2">
                                    Time
                                </h2>
                                <p className="font-nunito text-[18px] font-[500] text-dark-gray">
                                    Para clínicas
                                </p>
                            </div>

                            <div className="flex items-center justify-between mb-8">
                                <div className="font-baloo text-[64px] font-[800] leading-[64px] text-dark-gray tracking-[-0.64px]">
                                    R$ 39,90
                                </div>
                                <div className="font-nunito text-[16px] font-[500] text-dark-gray leading-[20px] text-right">
                                    por membro / mês<br />
                                    pago anualmente
                                </div>
                            </div>

                            <button className="w-full bg-[#F7B34D] text-white font-nunito text-[18px] font-[800] py-3 px-6 rounded-xl mb-8 hover:bg-orange/90 transition-colors">
                                Testar por 7 dias
                            </button>

                            <div className="space-y-4">
                                {[
                                    'Tudo do plano PRO',
                                    'Profissionais ilimitados',
                                    'Pacientes ilimitados',
                                    'Gestão de equipe',
                                    'Painel de desempenho por profissional e paciente',
                                    'Suporte prioritário',
                                    '... e muito mais!'
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <ChevronRightIcon />
                                        <span className="font-nunito text-[16px] font-[500] text-dark-gray leading-[20px]">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
