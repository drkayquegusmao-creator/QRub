import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ packageId: string }> }
) {
    try {
        const { packageId } = await params;

        // 1) Auth via Bearer token
        const authHeader = request.headers.get('Authorization') || '';
        const token = authHeader.replace('Bearer ', '').trim();
        if (!token) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
        }

        // 2) Supabase admin client (bypass RLS)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // 3) Verify token & get user
        const supabaseWithToken = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
        );
        const { data: { user }, error: authErr } = await supabaseWithToken.auth.getUser();
        if (authErr || !user) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 });
        }

        // 4) Role verification (ADMIN / ADMIN_MASTER / MASTER)
        const { data: profile } = await supabaseWithToken
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();
        if (!profile || !['MASTER', 'ADMIN', 'ADMIN_MASTER', 'master', 'admin'].includes(profile.role)) {
            return NextResponse.json({ error: 'Acesso restrito a administradores' }, { status: 403 });
        }

        // 5) Delete related package questions
        const { error: qErr } = await supabaseWithToken
            .from('package_questions')
            .delete()
            .eq('package_id', packageId);
        if (qErr) {
            return NextResponse.json({ error: 'Erro ao excluir questões do pacote' }, { status: 500 });
        }

        // 6) Delete the package itself
        const { error: pErr } = await supabaseWithToken
            .from('question_packages')
            .delete()
            .eq('id', packageId);
        if (pErr) {
            return NextResponse.json({ error: 'Erro ao excluir pacote' }, { status: 500 });
        }

        // 7) Optional: delete related logs (if table exists)
        try {
            await supabaseWithToken.from('package_logs').delete().eq('package_id', packageId);
        } catch { }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('[deletePackage] Unexpected error:', err);
        return NextResponse.json({ error: 'Erro interno', msg: err?.message }, { status: 500 });
    }
}
