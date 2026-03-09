import { getRootTaxonomy, getChildren, getDescendants } from './src/lib/taxonomy-service'
import { config } from 'dotenv'

config({ path: '.env.local' });

async function run() {
    console.log("=== INICIANDO TESTE DO NOVO MOTOR DE TAXONOMIA ===\n");
    try {
        const roots = await getRootTaxonomy();
        console.log(`✅ [SUCESSO] Obtidos ${roots.length} níveis RAÍZES (Áreas Principais).`);
        if (roots.length > 0) {
            console.log("\n-> Exemplos de Raízes Encontradas:");
            roots.slice(0, 5).forEach((r, i) => console.log(`   ${i + 1}. [${r.slug}] ${r.name}`));

            console.log(`\n=== BUSCANDO FILHOS DA ÁREA: ${roots[0].name} ===`);
            const children = await getChildren(roots[0].id);
            console.log(`✅ [SUCESSO] Obtidos ${children.length} filhos direitos (Especialidades/Subáreas).`);
            if (children.length > 0) {
                console.log("\n-> Exemplos de Filhos:");
                children.slice(0, 5).forEach((c, i) => console.log(`   ${i + 1}. [${c.slug}] ${c.name}`));
            }

            console.log(`\n=== TESTANDO EXPANSÃO (GERADOR DE PACOTES) PARA ${roots[0].name} ===`);
            const desc = await getDescendants(roots[0].id);
            console.log(`✅ [SUCESSO] A expansão em cascata (Descendentes) encontrou ${desc.length} nós válidos atrelados a esta raiz.`);
        } else {
            console.log("⚠️ AVISO: Nenhuma Raiz Encontrada. A tabela pode estar vazia ou a estrutura 'level' não tem parent_id null.");
        }
    } catch (err: any) {
        console.error("❌ ERRO AO CONECTAR:", err.message);
    }
}

run();
