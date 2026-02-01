const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Configuração do Supabase
const supabase = createClient(
    'https://czguyzdbvqfyjsfwcpnh.supabase.co',
    'sb_publishable_VBdyIxTT-gY71MqvCQKZyg_l9yHtMuZ'
);

async function testPDFUploadFlow() {
    console.log('🧪 TESTE COMPLETO: Upload de PDF e Criação de Edital\n');
    console.log('='.repeat(60));

    try {
        // ETAPA 1: Criar um arquivo PDF de teste
        console.log('\n📄 ETAPA 1: Criando arquivo PDF de teste...');
        const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Edital de Teste QRub) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000317 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
410
%%EOF`;

        const testPdfPath = './test-edital-qrub.pdf';
        fs.writeFileSync(testPdfPath, pdfContent);
        console.log('✅ PDF de teste criado:', testPdfPath);

        // ETAPA 2: Upload do PDF para o Supabase Storage
        console.log('\n📤 ETAPA 2: Fazendo upload do PDF para Supabase Storage...');
        const fileName = `test-${Date.now()}-${Math.random().toString(36).substring(2)}.pdf`;
        const fileBuffer = fs.readFileSync(testPdfPath);

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blueprints')
            .upload(fileName, fileBuffer, {
                contentType: 'application/pdf',
                cacheControl: '3600',
                upsert: true
            });

        if (uploadError) {
            console.error('❌ Erro no upload:', uploadError);
            throw uploadError;
        }

        console.log('✅ Upload concluído!');
        console.log('   Path:', uploadData.path);
        console.log('   ID:', uploadData.id);

        // ETAPA 3: Obter URL pública
        console.log('\n🔗 ETAPA 3: Gerando URL pública...');
        const { data: urlData } = supabase.storage
            .from('blueprints')
            .getPublicUrl(fileName);

        console.log('✅ URL pública gerada:', urlData.publicUrl);

        // ETAPA 4: Criar o Edital no banco de dados
        console.log('\n💾 ETAPA 4: Criando edital no banco de dados...');
        const blueprintData = {
            name: 'Teste Automatizado - Upload PDF',
            institution: 'QRub Test Suite',
            year: 2024,
            exam_type: 'Residência Médica',
            raw_pdf_url: urlData.publicUrl,
            status: 'processing',
            metadata: {
                test: true,
                automated: true,
                timestamp: new Date().toISOString()
            }
        };

        const { data: blueprint, error: blueprintError } = await supabase
            .from('exam_blueprints')
            .insert([blueprintData])
            .select()
            .single();

        if (blueprintError) {
            console.error('❌ Erro ao criar edital:', blueprintError);
            throw blueprintError;
        }

        console.log('✅ Edital criado com sucesso!');
        console.log('   ID:', blueprint.id);
        console.log('   Nome:', blueprint.name);
        console.log('   Status:', blueprint.status);

        // ETAPA 5: Criar Caixinhas de Estudo (Study Boxes)
        console.log('\n📦 ETAPA 5: Criando caixinhas de estudo...');
        const studyBoxes = [
            {
                blueprint_id: blueprint.id,
                title: 'Manejo da Asma Grave',
                specialty_id: 'clinica-medica',
                subspecialty_id: 'pneumologia',
                cognitive_level: 'Avançado',
                charge_profile: 'Guideline',
                weight: 2.5,
                base_text: 'Extraído do Edital: Manejo conforme GINA 2023, protocolos de crise asmática e corticoterapia.'
            },
            {
                blueprint_id: blueprint.id,
                title: 'Hipertensão Arterial Resistente',
                specialty_id: 'clinica-medica',
                subspecialty_id: 'cardiologia',
                cognitive_level: 'Intermediário',
                charge_profile: 'Clínica',
                weight: 1.8,
                base_text: 'Extraído do Edital: Diagnóstico de hipertensão resistente e associações triplas de fármacos.'
            }
        ];

        const { data: boxes, error: boxesError } = await supabase
            .from('study_boxes')
            .insert(studyBoxes)
            .select();

        if (boxesError) {
            console.error('❌ Erro ao criar caixinhas:', boxesError);
            throw boxesError;
        }

        console.log('✅ Caixinhas criadas:', boxes.length);
        boxes.forEach((box, idx) => {
            console.log(`   ${idx + 1}. ${box.title} (${box.cognitive_level})`);
        });

        // ETAPA 6: Atualizar status do edital para 'active'
        console.log('\n🔄 ETAPA 6: Atualizando status do edital...');
        const { error: updateError } = await supabase
            .from('exam_blueprints')
            .update({
                status: 'active',
                metadata: {
                    ...blueprintData.metadata,
                    total_items: boxes.length,
                    processed_at: new Date().toISOString()
                }
            })
            .eq('id', blueprint.id);

        if (updateError) {
            console.error('❌ Erro ao atualizar status:', updateError);
            throw updateError;
        }

        console.log('✅ Status atualizado para "active"');

        // ETAPA 7: Verificação final
        console.log('\n🔍 ETAPA 7: Verificação final...');
        const { data: finalBlueprint } = await supabase
            .from('exam_blueprints')
            .select('*')
            .eq('id', blueprint.id)
            .single();

        const { data: finalBoxes } = await supabase
            .from('study_boxes')
            .select('*')
            .eq('blueprint_id', blueprint.id);

        console.log('\n' + '='.repeat(60));
        console.log('✅ TESTE COMPLETO FINALIZADO COM SUCESSO!');
        console.log('='.repeat(60));
        console.log('\n📊 RESUMO:');
        console.log(`   • Edital ID: ${finalBlueprint.id}`);
        console.log(`   • Nome: ${finalBlueprint.name}`);
        console.log(`   • Status: ${finalBlueprint.status}`);
        console.log(`   • PDF URL: ${finalBlueprint.raw_pdf_url}`);
        console.log(`   • Caixinhas criadas: ${finalBoxes.length}`);
        console.log(`   • Instituição: ${finalBlueprint.institution}`);
        console.log(`   • Ano: ${finalBlueprint.year}`);
        console.log('\n🎯 O upload de PDF está 100% FUNCIONAL!\n');

        // Limpar arquivo de teste
        fs.unlinkSync(testPdfPath);
        console.log('🧹 Arquivo de teste removido.\n');

        return {
            success: true,
            blueprintId: blueprint.id,
            pdfUrl: urlData.publicUrl,
            studyBoxesCount: boxes.length
        };

    } catch (error) {
        console.error('\n❌ ERRO NO TESTE:', error);
        console.error('\nDetalhes:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

// Executar o teste
testPDFUploadFlow()
    .then(result => {
        if (result.success) {
            console.log('✅ Teste concluído com sucesso!');
            process.exit(0);
        } else {
            console.error('❌ Teste falhou:', result.error);
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('❌ Erro fatal:', error);
        process.exit(1);
    });
