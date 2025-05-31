'use server';

export async function criarProcedimento({
  nome,
  observacoes,
  valor,
  dentistaId,
}: {
  nome: string;
  observacoes: string;
  valor: number;
  dentistaId: number;
}) {
  try {
    const res = await fetch('http://localhost:5143/procedimento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        observacoes,
        valor,
        dentistaId,
      }),
    });

    if (!res.ok) throw new Error('Erro ao criar procedimento');

    return await res.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function buscarDentistas() {
  try {
    const res = await fetch('http://localhost:5143/dentista', {
      method: 'GET'
    });

    if(!res.ok) throw new Error('Erro ao buscar dentistas');

    return await res.json();
  } catch(error) {
    console.error('Erro na requisição GET');
    throw error;
  }
}
