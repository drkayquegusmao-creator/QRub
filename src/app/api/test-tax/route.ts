import { NextResponse } from 'next/server';
import { getRootTaxonomy, getChildren, getDescendants } from '@/lib/taxonomy-service';

export async function GET() {
    try {
        const roots = await getRootTaxonomy();
        let logs: string[] = [];

        logs.push(`✅ [SUCESSO] Obtidos ${roots.length} níveis RAÍZES (Áreas Principais).`);

        if (roots.length > 0) {
            logs.push("\n-> Exemplos de Raízes Encontradas:");
            roots.slice(0, 5).forEach((r, i) => logs.push(`   ${i + 1}. [${r.slug}] ${r.name}`));

            logs.push(`\n=== BUSCANDO FILHOS DA ÁREA: ${roots[0].name} ===`);
            const children = await getChildren(roots[0].id);
            logs.push(`✅ [SUCESSO] Obtidos ${children.length} filhos direitos (Especialidades/Subáreas).`);

            if (children.length > 0) {
                logs.push("\n-> Exemplos de Filhos:");
                children.slice(0, 5).forEach((c, i) => logs.push(`   ${i + 1}. [${c.slug}] ${c.name}`));
            }

            logs.push(`\n=== TESTANDO EXPANSÃO (GERADOR DE PACOTES) PARA ${roots[0].name} ===`);
            const desc = await getDescendants(roots[0].id);
            logs.push(`✅ [SUCESSO] A expansão em cascata (Descendentes) encontrou ${desc.length} nós válidos atrelados a esta raiz.`);
        } else {
            logs.push("⚠️ AVISO: Nenhuma Raiz Encontrada. A tabela pode estar vazia ou a estrutura 'level' não tem parent_id null.");
        }

        return NextResponse.json({ success: true, count: roots.length, logs }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
