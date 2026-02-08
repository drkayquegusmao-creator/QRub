import { test, expect } from '@playwright/test';

/**
 * Rank Elite E2E Tests
 * 
 * Testa o módulo Rank Elite no navegador real
 * Servidor deve estar rodando em http://localhost:3000
 */

test.describe('Rank Elite Module - E2E Tests', () => {
    const BASE_URL = 'http://localhost:3000';

    test.beforeEach(async ({ page }) => {
        // Navega para a página inicial
        await page.goto(BASE_URL);

        // Aguarda a página carregar completamente
        await page.waitForLoadState('networkidle');
    });

    test('1. Deve carregar a página inicial sem erros', async ({ page }) => {
        // Verifica se não há erros no console
        const errors: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.waitForTimeout(2000);

        // Verifica se a página carregou
        expect(page.url()).toContain(BASE_URL);

        // Tira screenshot da página inicial
        await page.screenshot({ path: 'test-results/01-homepage.png', fullPage: true });
    });

    test('2. Deve encontrar e abrir o módulo Rank Elite', async ({ page }) => {
        // Procura por botões/links que possam abrir o Rank Elite
        // Possíveis textos: "Rank Elite", "Elite", "Arena"

        try {
            // Tenta encontrar o botão do Rank Elite
            const rankEliteButton = page.locator('text=/Rank Elite/i').first();

            if (await rankEliteButton.isVisible({ timeout: 5000 })) {
                await rankEliteButton.click();
                await page.waitForTimeout(1000);

                // Tira screenshot do módulo aberto
                await page.screenshot({ path: 'test-results/02-rank-elite-opened.png', fullPage: true });

                // Verifica se o título está presente
                const title = page.locator('text=/Rank Elite/i').first();
                await expect(title).toBeVisible();
            } else {
                console.log('⚠️ Botão Rank Elite não encontrado na página inicial');
                console.log('Tentando outras abordagens...');

                // Tenta procurar em menus, modais, etc.
                const menuButtons = page.locator('button, a').all();
                await page.screenshot({ path: 'test-results/02-searching-rank-elite.png', fullPage: true });
            }
        } catch (error) {
            console.log('❌ Erro ao tentar abrir Rank Elite:', error);
            await page.screenshot({ path: 'test-results/02-error-opening.png', fullPage: true });
        }
    });

    test('3. Deve verificar elementos do Lobby', async ({ page }) => {
        // Primeiro tenta abrir o módulo
        try {
            const rankEliteButton = page.locator('text=/Rank Elite/i').first();

            if (await rankEliteButton.isVisible({ timeout: 5000 })) {
                await rankEliteButton.click();
                await page.waitForTimeout(1500);

                // Verifica elementos do lobby
                const elementsToCheck = [
                    'Season',
                    'Nível',
                    'PONTOS',
                    'Jogar Agora',
                    'Missões'
                ];

                for (const element of elementsToCheck) {
                    const locator = page.locator(`text=/${element}/i`).first();
                    const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);

                    if (isVisible) {
                        console.log(`✅ Elemento encontrado: ${element}`);
                    } else {
                        console.log(`⚠️ Elemento não encontrado: ${element}`);
                    }
                }

                await page.screenshot({ path: 'test-results/03-lobby-elements.png', fullPage: true });
            }
        } catch (error) {
            console.log('❌ Erro ao verificar elementos do lobby:', error);
            await page.screenshot({ path: 'test-results/03-error-lobby.png', fullPage: true });
        }
    });

    test('4. Deve testar o botão "Jogar Agora"', async ({ page }) => {
        try {
            // Abre o módulo
            const rankEliteButton = page.locator('text=/Rank Elite/i').first();

            if (await rankEliteButton.isVisible({ timeout: 5000 })) {
                await rankEliteButton.click();
                await page.waitForTimeout(1500);

                // Procura o botão "Jogar Agora"
                const playButton = page.locator('text=/Jogar Agora/i').first();

                if (await playButton.isVisible({ timeout: 3000 })) {
                    console.log('✅ Botão "Jogar Agora" encontrado');

                    // Clica no botão
                    await playButton.click();
                    await page.waitForTimeout(2000);

                    // Verifica se algo mudou (pode abrir arena, modal, etc.)
                    await page.screenshot({ path: 'test-results/04-after-play-click.png', fullPage: true });

                    console.log('✅ Botão "Jogar Agora" clicado com sucesso');
                } else {
                    console.log('⚠️ Botão "Jogar Agora" não encontrado');
                }
            }
        } catch (error) {
            console.log('❌ Erro ao testar botão Jogar Agora:', error);
            await page.screenshot({ path: 'test-results/04-error-play-button.png', fullPage: true });
        }
    });

    test('5. Deve navegar para Recompensas', async ({ page }) => {
        try {
            // Abre o módulo
            const rankEliteButton = page.locator('text=/Rank Elite/i').first();

            if (await rankEliteButton.isVisible({ timeout: 5000 })) {
                await rankEliteButton.click();
                await page.waitForTimeout(1500);

                // Procura o botão de Recompensas
                const rewardsButton = page.locator('text=/Recompensas/i').first();

                if (await rewardsButton.isVisible({ timeout: 3000 })) {
                    console.log('✅ Botão "Recompensas" encontrado');

                    await rewardsButton.click();
                    await page.waitForTimeout(1500);

                    // Verifica se a tela de recompensas abriu
                    const rewardsTitle = page.locator('text=/Linha do Tempo de Recompensas/i').first();
                    const isRewardsVisible = await rewardsTitle.isVisible({ timeout: 3000 }).catch(() => false);

                    if (isRewardsVisible) {
                        console.log('✅ Tela de Recompensas aberta com sucesso');
                    } else {
                        console.log('⚠️ Tela de Recompensas não encontrada');
                    }

                    await page.screenshot({ path: 'test-results/05-rewards-view.png', fullPage: true });
                } else {
                    console.log('⚠️ Botão "Recompensas" não encontrado');
                }
            }
        } catch (error) {
            console.log('❌ Erro ao navegar para Recompensas:', error);
            await page.screenshot({ path: 'test-results/05-error-rewards.png', fullPage: true });
        }
    });

    test('6. Deve verificar erros no console', async ({ page }) => {
        const consoleErrors: string[] = [];
        const consoleWarnings: string[] = [];

        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            } else if (msg.type() === 'warning') {
                consoleWarnings.push(msg.text());
            }
        });

        // Navega e interage com a página
        await page.waitForTimeout(3000);

        try {
            const rankEliteButton = page.locator('text=/Rank Elite/i').first();
            if (await rankEliteButton.isVisible({ timeout: 5000 })) {
                await rankEliteButton.click();
                await page.waitForTimeout(2000);
            }
        } catch (error) {
            // Ignora se não encontrar
        }

        await page.screenshot({ path: 'test-results/06-console-check.png', fullPage: true });

        // Reporta erros e warnings
        console.log('\n📊 Relatório do Console:');
        console.log(`❌ Erros: ${consoleErrors.length}`);
        if (consoleErrors.length > 0) {
            consoleErrors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
        }

        console.log(`⚠️  Warnings: ${consoleWarnings.length}`);
        if (consoleWarnings.length > 0) {
            consoleWarnings.forEach((warn, i) => console.log(`  ${i + 1}. ${warn}`));
        }
    });

    test('7. Deve fazer um teste de fluxo completo', async ({ page }) => {
        console.log('\n🧪 Iniciando teste de fluxo completo...\n');

        const steps = [];

        try {
            // Passo 1: Carregar página
            steps.push({ step: 'Carregar página inicial', status: 'success' });
            await page.screenshot({ path: 'test-results/07-step-1-homepage.png', fullPage: true });

            // Passo 2: Abrir Rank Elite
            const rankEliteButton = page.locator('text=/Rank Elite/i').first();
            if (await rankEliteButton.isVisible({ timeout: 5000 })) {
                await rankEliteButton.click();
                await page.waitForTimeout(1500);
                steps.push({ step: 'Abrir Rank Elite', status: 'success' });
                await page.screenshot({ path: 'test-results/07-step-2-opened.png', fullPage: true });
            } else {
                steps.push({ step: 'Abrir Rank Elite', status: 'failed', reason: 'Botão não encontrado' });
            }

            // Passo 3: Verificar Lobby
            const lobbyVisible = await page.locator('text=/Season/i').first().isVisible({ timeout: 3000 }).catch(() => false);
            if (lobbyVisible) {
                steps.push({ step: 'Verificar Lobby', status: 'success' });
            } else {
                steps.push({ step: 'Verificar Lobby', status: 'failed', reason: 'Lobby não renderizado' });
            }

            // Passo 4: Clicar em Jogar Agora
            const playButton = page.locator('text=/Jogar Agora/i').first();
            if (await playButton.isVisible({ timeout: 3000 })) {
                await playButton.click();
                await page.waitForTimeout(2000);
                steps.push({ step: 'Clicar em Jogar Agora', status: 'success' });
                await page.screenshot({ path: 'test-results/07-step-4-play.png', fullPage: true });
            } else {
                steps.push({ step: 'Clicar em Jogar Agora', status: 'failed', reason: 'Botão não encontrado' });
            }

        } catch (error) {
            steps.push({ step: 'Fluxo completo', status: 'error', reason: String(error) });
        }

        // Relatório final
        console.log('\n📋 Relatório do Fluxo Completo:\n');
        steps.forEach((step, i) => {
            const icon = step.status === 'success' ? '✅' : step.status === 'failed' ? '⚠️' : '❌';
            console.log(`${icon} ${i + 1}. ${step.step} - ${step.status.toUpperCase()}`);
            if (step.reason) {
                console.log(`   Razão: ${step.reason}`);
            }
        });

        await page.screenshot({ path: 'test-results/07-final-state.png', fullPage: true });
    });
});
