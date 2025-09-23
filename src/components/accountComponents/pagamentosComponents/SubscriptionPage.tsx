import { ChevronRight, ChevronRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


interface Usuario {
    id: string;
    nome: string;
    email: string;
    plano: string | null;
    dataFimTeste: string | null;
    asaas_customer_id: string | null;
}

const SubscriptionPage: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [plano, setPlano] = useState<string | null>(null);
    const [dataFimTeste, setDataFimTeste] = useState<Date | null>(null);
    const [customerId, setCustomerId] = useState<string | null>(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
    const [nextDueDate, setNextDueDate] = useState<string | null>(null);
    const [subscriptionValue, setSubscriptionValue] = useState<number | null>(null);

    useEffect(() => {
        const fetchPlano = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from("usuarios")
                .select("plano, dataFimTeste, asaas_customer_id")
                .eq("id", user.id)
                .single();

            if (error) {
                console.error("Erro ao buscar dados do usuário:", error.message);
                setLoading(false);
                return;
            }

            setPlano(data?.plano);
            setDataFimTeste(data?.dataFimTeste ? new Date(data.dataFimTeste) : null);
            setCustomerId(data?.asaas_customer_id);

            if (data?.asaas_customer_id) {
                try {
                    const response = await fetch(
                        `https://rgirvsrazocpqanyhtnt.supabase.co/functions/v1/GetInfoCustomerAsaas?id=${data.asaas_customer_id}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
                            },
                        }
                    );

                    const result = await response.json();
                    console.log("Resultado da consulta Asaas:", result);

                    if (
                        response.ok &&
                        result.subscriptions &&
                        result.subscriptions.data.length > 0
                    ) {
                        const subscription = result.subscriptions.data[0]; // pega a primeira
                        setPlano(subscription.description);
                        setSubscriptionStatus(subscription.status);
                        setNextDueDate(subscription.nextDueDate);
                        setSubscriptionValue(subscription.value);
                    } else {
                        // não tem assinatura no Asaas → volta para tela de escolha de planos
                        setPlano(null);
                        setSubscriptionStatus(null);
                        setNextDueDate(null);
                        setSubscriptionValue(null);
                    }
                } catch (err) {
                    console.error("Erro ao consultar assinaturas no Asaas:", err);
                }
            }

            setLoading(false);
        };

        fetchPlano();
    }, [user]);

    // Criar assinatura
    const handleSubscribe = async (plan: "Pro" | "Time") => {
        if (!user) return;
        setLoading(true);

        try {
            // Buscar customerId no Supabase
            const { data: userData, error } = await supabase
                .from("usuarios")
                .select("asaas_customer_id")
                .eq("id", user.id)
                .single();

            if (error || !userData?.asaas_customer_id) {
                console.error("Erro ao buscar customer_id:", error);
                return;
            }

            const customerId = userData?.asaas_customer_id;

            const subscriptionData =
                plan === "Pro"
                    ? {
                        billingType: "BOLETO",
                        value: 59.9,
                        cycle: "MONTHLY",
                        description: "Plano PRO Individual",
                    }
                    : {
                        billingType: "BOLETO",
                        value: 39.9,
                        cycle: "MONTHLY",
                        description: "Plano Time (Clínicas)",
                    };

            const response = await fetch(
                "https://rgirvsrazocpqanyhtnt.supabase.co/functions/v1/createAsaasSubscription",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
                    },
                    body: JSON.stringify({
                        customer: customerId,
                        ...subscriptionData,
                        nextDueDate: new Date().toISOString().split("T")[0],
                    }),
                }
            );

            const result = await response.json();
            if (!response.ok) {
                console.error("Erro ao criar subscription:", result);
                toast.error("Erro ao criar assinatura");
                return;
            }

            // Atualizar a coluna "plano" na tabela usuarios
            const { error: updateError } = await supabase
                .from("usuarios")
                .update({
                    plano: plan === "Pro" ? "plano pro" : "plano time",
                })
                .eq("id", user.id);

            if (updateError) {
                console.error("Erro ao atualizar plano:", updateError);
            }

            toast.success("Assinatura criada com sucesso!");
            setPlano(subscriptionData.description);
        } catch (err) {
            console.error(err);
            toast.error("Erro ao criar assinatura");
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="h-[664px] flex items-center justify-center">
                <p className="text-gray-600">Carregando...</p>
            </div>
        );
    }

    const hoje = new Date();
    const testeAtivo = dataFimTeste && hoje <= dataFimTeste;
    const temPlanoAtivo = plano !== null;
    return (
        <div className="h-[764px] bg-[#FEF2CC] flex flex-col items-center py-8">
            <p className="text-[#2C2623] text-normal font-semibold leading-6 mb-8 self-start pl-4 sm:pl-8 md:pl-[60px] lg:pl-[100px] xl:pl-[145px]">
                Gerencie aqui sua assinatura e informações sobre pagamentos.
            </p>
            {temPlanoAtivo ? (
                <div className="w-full max-w-[1040px] h-[464px] shadow-[0_3px_0_0_#FFE0B2] bg-white rounded-3xl border-2 border-solid border-[#FBDEB1]">
                    <div className="p-10">
                        <>
                            <div className="flex flex-row items-center justify-between">
                                <h2 className="text-[#2C2623] text-lg font-normal leading-6 tracking-[0.18px]">
                                    Seu plano atual
                                </h2>
                                <div className="flex h-14 items-center gap-2 bg-[#FFFCF2] px-6 py-4 rounded-2xl border-2 border-solid border-[#FEF2CC]">
                                    <span className="text-[#2C2623] text-base font-bold leading-5 tracking-[0.16px]">
                                        {plano ? plano : "Período de Teste"}
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-[#2C2623] text-[32px] font-extrabold leading-8 tracking-[-0.32px]">
                                {plano ? plano : "Teste gratuito ativo"}
                            </h1>

                            {/* Status da assinatura */}
                            {subscriptionStatus && (
                                <p
                                    className={`mt-2 text-sm font-semibold ${subscriptionStatus === "ACTIVE"
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {subscriptionStatus === "ACTIVE"
                                        ? "Plano ativo"
                                        : "Pagamento pendente"}
                                </p>
                            )}

                            {/* Info adicional */}
                            {subscriptionValue && (
                                <p className="text-[#5E503F] text-sm mt-1">
                                    Valor: R$ {subscriptionValue.toFixed(2)}
                                </p>
                            )}
                            {nextDueDate && (
                                <p className="text-[#5E503F] text-sm">
                                    Próximo vencimento:{" "}
                                    {new Date(nextDueDate).toLocaleDateString("pt-BR")}
                                </p>
                            )}

                            <ul className="space-y-2 text-[#5E503F] text-sm pt-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FBBF24]">
                                        <ChevronRight size={20} />
                                    </span>{" "}
                                    1 profissional
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FBBF24]">
                                        <ChevronRight size={20} />
                                    </span>{" "}
                                    Até 10 pacientes ativos
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FBBF24]">
                                        <ChevronRight size={20} />
                                    </span>{" "}
                                    Biblioteca de jogos completa
                                </li>
                            </ul>

                            <div className="w-full border-t border-[#F6E2B9] my-8" />
                            <div className="flex gap-4">
                                <button className="bg-[#FBBF24] text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-[#F59E0B] transition">
                                    Gerenciar assinatura
                                </button>
                                {subscriptionStatus === "PENDING" && (
                                    <a

                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-red-500 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Pagar agora
                                    </a>
                                )}
                            </div>
                        </>
                    </div>
                </div>
            ) : (
                <div className=" mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 px-4 ">
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

                            <button
                                onClick={() => handleSubscribe("Pro")}
                                className="w-full bg-[#F7B34D] text-white font-nunito text-[18px] font-[800] py-3 px-6 rounded-xl mb-8 hover:bg-orange/90 transition-colors">
                                Assinar
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

                            <button
                                onClick={() => handleSubscribe("Time")}
                                className="w-full bg-[#F7B34D] text-white font-nunito text-[18px] font-[800] py-3 px-6 rounded-xl mb-8 hover:bg-orange/90 transition-colors">
                                Assinar
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
            )}
        </div>
    );
};

export default SubscriptionPage;
