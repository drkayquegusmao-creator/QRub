const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = 'https://czguyzdbvqfyjsfwcpnh.supabase.co';
const supabaseKey = 'sb_publishable_VBdyIxTT-gY71MqvCQKZyg_l9yHtMuZ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyRankEliteMigration() {
    console.log('🚀 Iniciando migração do Rank Elite...\n');

    try {
        // Lê o arquivo de migração
        const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20260207192448_rank_elite_schema.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        console.log('📄 Arquivo de migração carregado');
        console.log(`📏 Tamanho: ${migrationSQL.length} caracteres\n`);

        // Divide o SQL em comandos individuais (separados por ponto e vírgula)
        const commands = migrationSQL
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

        console.log(`📋 Total de comandos SQL: ${commands.length}\n`);

        // Executa cada comando
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i] + ';';

            // Pula comentários
            if (command.trim().startsWith('--')) continue;

            try {
                console.log(`⏳ Executando comando ${i + 1}/${commands.length}...`);

                const { data, error } = await supabase.rpc('exec_sql', { sql: command });

                if (error) {
                    // Ignora erros de "já existe"
                    if (error.message.includes('already exists') ||
                        error.message.includes('duplicate key') ||
                        error.message.includes('relation') && error.message.includes('already exists')) {
                        console.log(`⚠️  Já existe (ignorado): ${error.message.substring(0, 80)}...`);
                        successCount++;
                    } else {
                        console.error(`❌ Erro no comando ${i + 1}:`, error.message.substring(0, 100));
                        errorCount++;
                    }
                } else {
                    console.log(`✅ Comando ${i + 1} executado com sucesso`);
                    successCount++;
                }
            } catch (err) {
                console.error(`❌ Exceção no comando ${i + 1}:`, err.message);
                errorCount++;
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('📊 RESUMO DA MIGRAÇÃO:');
        console.log('='.repeat(50));
        console.log(`✅ Sucessos: ${successCount}`);
        console.log(`❌ Erros: ${errorCount}`);
        console.log('='.repeat(50) + '\n');

        // Verifica se as tabelas foram criadas
        console.log('🔍 Verificando tabelas criadas...\n');

        const tablesToCheck = [
            'rank_seasons',
            'rank_leagues',
            'rank_profiles',
            'rank_xp_profiles',
            'rank_matches',
            'rank_mission_templates',
            'rank_user_missions',
            'rank_rewards',
            'rank_user_rewards'
        ];

        for (const table of tablesToCheck) {
            try {
                const { data, error } = await supabase.from(table).select('*').limit(1);

                if (error) {
                    console.log(`❌ ${table}: NÃO EXISTE`);
                } else {
                    console.log(`✅ ${table}: OK`);
                }
            } catch (err) {
                console.log(`❌ ${table}: ERRO - ${err.message}`);
            }
        }

        console.log('\n✨ Migração concluída!\n');
        console.log('🎯 Próximos passos:');
        console.log('   1. Recarregue a página no navegador');
        console.log('   2. Clique em "Rank Elite"');
        console.log('   3. Verifique se o lobby carrega corretamente\n');

    } catch (error) {
        console.error('\n❌ ERRO FATAL:', error);
        process.exit(1);
    }
}

// Executa a migração
applyRankEliteMigration();
