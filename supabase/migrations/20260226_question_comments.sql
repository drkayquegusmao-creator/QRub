-- Arquivo de migração gerado

CREATE TABLE question_comments (
    id uuid primary key default gen_random_uuid(),
    question_id text not null,
    user_id uuid not null REFERENCES users(id) ON DELETE CASCADE,
    parent_id uuid null REFERENCES question_comments(id) ON DELETE CASCADE,
    content text not null,
    likes_count integer default 0,
    is_pinned boolean default false,
    created_at timestamp default now(),
    updated_at timestamp,
    is_deleted boolean default false
);

CREATE TABLE comment_likes (
    id uuid primary key default gen_random_uuid(),
    comment_id uuid references question_comments(id) on delete cascade,
    user_id uuid not null REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamp default now(),
    unique(comment_id, user_id)
);

CREATE TABLE comment_reports (
    id uuid primary key default gen_random_uuid(),
    comment_id uuid references question_comments(id) on delete cascade,
    user_id uuid not null REFERENCES users(id) ON DELETE CASCADE,
    reason text,
    created_at timestamp default now()
);

-- Habilitar RLS
ALTER TABLE question_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;

-- Politicas para question_comments
CREATE POLICY "Public can read question_comments" ON question_comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own question_comments" ON question_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own question_comments" ON question_comments FOR UPDATE USING (auth.uid() = user_id);

-- Politicas para comment_likes
CREATE POLICY "Public can read comment_likes" ON comment_likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comment_likes" ON comment_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comment_likes" ON comment_likes FOR DELETE USING (auth.uid() = user_id);

-- Politicas para comment_reports
CREATE POLICY "Users can insert comment_reports" ON comment_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can read comment_reports" ON comment_reports FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'MASTER'));
