
import { test, expect } from '@playwright/test';

test('Admin Structural Generation and Preview Flow', async ({ page }) => {
    // 1. Go to Admin Dashboard (Structural Tab)
    await page.goto('http://localhost:3000/admin?tab=structural');

    // Wait for loading to finish if any
    await page.waitForTimeout(2000);

    // 2. Generation Step
    // The select is the first one in the structural view. 
    // We can select by the label text "Área Prova" to be safer
    // Or just target the select directly if it's the first one visible
    // The file view shows it's inside a label "Área Prova".
    const areaSelect = page.locator('select').first();
    await areaSelect.selectOption({ label: 'Pediatria' });

    // Click Generate Button
    await page.click('button:has-text("GERAR QUESTÃO ESTRUTURAL")');

    // 3. Validation
    // Wait for success toast
    // The toast contains text "✅ Gerado"
    await expect(page.locator('text=✅ Gerado')).toBeVisible({ timeout: 15000 });

    // 4. Verify in Queue
    // Click on "Validação" tab button 
    // We need to find the specific tab button. It's usually in a nav bar or similar.
    // The text for the tab is likely "VALIDAÇÃO" or similar based on typical designs, let's try "Validação" casing insensitive
    // Or navigate directly
    await page.goto('http://localhost:3000/admin?tab=validation');

    // Wait for table to load
    await page.waitForSelector('table', { timeout: 10000 });

    // Verify at least one row exists
    const rows = page.locator('tbody tr');
    // Wait for at least one row to be interactive
    await expect(rows.first()).toBeVisible();

    // 5. Preview Modal Customization
    // Click the first row to open modal
    await rows.first().click();

    // Check if Modal is visible
    // Using a selector likely to be in the modal like 'Comentário do Especialista'
    await expect(page.locator('text=Comentário do Especialista')).toBeVisible({ timeout: 5000 });

    // 6. Content Verification 
    console.log('Test Completed Successfully: Question Generated, Listed, and Previewed.');
});
