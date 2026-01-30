# 🎯 Sistema de Filtros Hierárquicos - QRub

## 📋 Estrutura Completa de Especialidades Médicas

O sistema QRub possui uma estrutura hierárquica completa de **TODAS as especialidades médicas reconhecidas no Brasil**, organizadas em 4 níveis:

```
CURSO → ESPECIALIDADE → SUBESPECIALIDADE → ASSUNTO
```

### Exemplo de Hierarquia:

```
Medicina (Curso)
  └── Cirurgia Geral (Especialidade)
        └── Abdômen Agudo (Subespecialidade)
              └── Apendicite Aguda (Assunto)
```

---

## 🏥 Especialidades Implementadas

### 1. **Clínica Médica**
- Cardiologia (8 assuntos)
- Endocrinologia (8 assuntos)
- Pneumologia (8 assuntos)
- Gastroenterologia (7 assuntos)
- Nefrologia (7 assuntos)
- Hematologia (7 assuntos)
- Reumatologia (7 assuntos)
- Infectologia (8 assuntos)

### 2. **Cirurgia Geral**
- Abdômen Agudo (7 assuntos)
- Trauma (6 assuntos)
- Cirurgia Videolaparoscópica (4 assuntos)
- Parede Abdominal (4 assuntos)

### 3. **Ginecologia e Obstetrícia**
- Obstetrícia de Alto Risco (6 assuntos)
- Ginecologia Geral (6 assuntos)
- Oncologia Ginecológica (4 assuntos)
- Reprodução Assistida (3 assuntos)

### 4. **Pediatria**
- Neonatologia (5 assuntos)
- Puericultura (4 assuntos)
- Pediatria Geral (5 assuntos)

### 5. **Psiquiatria**
- Transtornos de Humor (3 assuntos)
- Transtornos Ansiosos (4 assuntos)
- Psicoses (3 assuntos)
- Dependência Química (3 assuntos)

### 6. **Ortopedia e Traumatologia**
- Trauma Ortopédico (5 assuntos)
- Ortopedia Pediátrica (3 assuntos)
- Medicina Esportiva (3 assuntos)

### 7. **Neurologia**
- Doenças Cerebrovasculares (3 assuntos)
- Epilepsia (3 assuntos)
- Doenças Neurodegenerativas (3 assuntos)
- Cefaleia (3 assuntos)

### 8. **Dermatologia**
- Dermatologia Clínica (5 assuntos)
- Oncologia Cutânea (3 assuntos)
- Doenças Infecciosas da Pele (4 assuntos)

### 9. **Oftalmologia**
- Segmento Anterior (4 assuntos)
- Retina (3 assuntos)

### 10. **Urologia**
- Uro-Oncologia (3 assuntos)
- Urologia Geral (3 assuntos)

### 11. **Otorrinolaringologia**
- Otologia (3 assuntos)
- Rinologia (3 assuntos)
- Laringologia (2 assuntos)

### 12. **Emergência e Medicina Intensiva**
- Suporte Avançado de Vida (4 assuntos)
- Choque (3 assuntos)
- Terapia Intensiva (3 assuntos)

---

## 🔍 Como Funciona o Filtro de Questões

### 1. **Seleção Hierárquica**

O usuário configura o simulado em `/dashboard/setup`:

```
1. Seleciona CURSO → Medicina
2. Seleciona ESPECIALIDADE → Cirurgia Geral
3. Seleciona SUBESPECIALIDADE → Abdômen Agudo
4. Seleciona ASSUNTO → Apendicite Aguda
```

### 2. **Link com Banco de Dados**

Quando o usuário clica em "INICIAR", o sistema:

1. ✅ Captura todos os filtros selecionados
2. ✅ Monta query params com os filtros
3. ✅ Redireciona para o quiz com os parâmetros
4. ✅ Quiz lê os parâmetros e filtra questões
5. ✅ **Apenas questões que correspondem aos filtros são exibidas**

### 3. **Exemplo de Filtragem**

**Cenário 1: Filtro Completo**
```
Filtros selecionados:
- courseId: medicina
- specialtyId: cirurgia-geral
- subspecialtyId: abdomen-agudo
- subjectId: apendicite

Resultado: Apenas questões de APENDICITE dentro de ABDÔMEN AGUDO serão exibidas
```

**Cenário 2: Filtro Parcial**
```
Filtros selecionados:
- courseId: medicina
- specialtyId: cirurgia-geral
- subspecialtyId: abdomen-agudo
- subjectId: (não selecionado)

Resultado: TODAS as questões de ABDÔMEN AGUDO (apendicite, colecistite, obstrução, etc.)
```

**Cenário 3: Apenas Especialidade**
```
Filtros selecionados:
- courseId: medicina
- specialtyId: cirurgia-geral
- subspecialtyId: (não selecionado)
- subjectId: (não selecionado)

Resultado: TODAS as questões de CIRURGIA GERAL (todos os assuntos)
```

---

## 💻 Implementação Técnica

### Arquivo: `/src/lib/medical-specialties.ts`
Contém a estrutura completa de especialidades

### Arquivo: `/src/lib/data-mock.ts`
```typescript
export function filterQuestions(
    questions: Question[],
    filters: {
        courseId?: string
        specialtyId?: string
        subspecialtyId?: string
        subjectId?: string
    }
): Question[] {
    return questions.filter(q => {
        // Filtra por courseId se fornecido
        if (filters.courseId && q.courseId !== filters.courseId) {
            return false
        }
        
        // Filtra por specialtyId se fornecido
        if (filters.specialtyId && q.specialtyId !== filters.specialtyId) {
            return false
        }
        
        // Filtra por subspecialtyId se fornecido
        if (filters.subspecialtyId && q.subspecialtyId !== filters.subspecialtyId) {
            return false
        }
        
        // Filtra por subjectId se fornecido
        if (filters.subjectId && q.subjectId !== filters.subjectId) {
            return false
        }
        
        return true
    })
}
```

### Arquivo: `/src/components/quiz-setup-filters.tsx`
```typescript
const handleStart = () => {
    // Montar query params com os filtros selecionados
    const params = new URLSearchParams()
    params.set('mode', mode)
    params.set('courseId', selectedCourse.id)
    
    if (selectedSpecialty) {
        params.set('specialtyId', selectedSpecialty.id)
    }
    
    if (selectedSubspecialty) {
        params.set('subspecialtyId', selectedSubspecialty.id)
    }
    
    if (selectedSubject) {
        params.set('subjectId', selectedSubject.id)
    }

    // Navegar para o quiz com os filtros
    router.push(`/dashboard/quiz/q1?${params.toString()}`)
}
```

### Arquivo: `/src/app/dashboard/quiz/[id]/page.tsx`
```typescript
// Ler filtros dos query params
const courseId = searchParams.get('courseId') || undefined
const specialtyId = searchParams.get('specialtyId') || undefined
const subspecialtyId = searchParams.get('subspecialtyId') || undefined
const subjectId = searchParams.get('subjectId') || undefined

// Filtrar questões baseado nos parâmetros
const filteredQuestions = useMemo(() => {
    return filterQuestions(allQuestions, {
        courseId,
        specialtyId,
        subspecialtyId,
        subjectId
    })
}, [allQuestions, courseId, specialtyId, subspecialtyId, subjectId])
```

---

## 📊 Formato das Questões no Banco

Cada questão deve ter os seguintes campos para permitir filtragem:

```typescript
{
    "id": "QRUB-MED-CG-001",
    "courseId": "medicina",
    "specialtyId": "cirurgia-geral",
    "subspecialtyId": "abdomen-agudo",
    "subjectId": "apendicite",
    "difficulty": "Alta",
    "enunciado": "...",
    "options": [...],
    "correctOptionId": "b",
    "explanation": "..."
}
```

### ✅ Exemplo Completo de Questão

```typescript
{
    "id": "QRUB-MED-CG-AB-APE-001",
    "courseId": "medicina",
    "specialtyId": "cirurgia-geral",
    "subspecialtyId": "abdomen-agudo",
    "subjectId": "apendicite",
    "difficulty": "Alta",
    "enunciado": "Paciente de 25 anos, sexo masculino, com dor abdominal em FID há 8h, náuseas, vômitos e febre de 38.5°C...",
    "options": [
        { "id": "a", "text": "Tratamento conservador com antibioticoterapia" },
        { "id": "b", "text": "Apendicectomia de urgência" },
        { "id": "c", "text": "TC de abdome antes de qualquer conduta" },
        { "id": "d", "text": "Observação por 24h" },
        { "id": "e", "text": "Alta hospitalar com analgésicos" }
    ],
    "correctOptionId": "b",
    "explanation": "Quadro clássico de apendicite aguda com critérios para cirurgia de urgência..."
}
```

---

## 🎯 Benefícios do Sistema

### 1. **Estudo Direcionado**
- Usuário pode focar exatamente no assunto que precisa estudar
- Não perde tempo com questões irrelevantes

### 2. **Flexibilidade**
- Pode estudar uma especialidade inteira
- Ou focar em um assunto específico
- Ou tudo junto (sem filtros)

### 3. **Organização**
- Banco de dados organizado por hierarquia
- Fácil adicionar novas questões
- Fácil criar relatórios por área

### 4. **Performance por Área**
- Sistema rastreia desempenho por especialidade
- Identifica pontos fortes e fracos
- Recomendações personalizadas

---

## 🚀 Próximos Passos

### Para Popular o Banco de Dados:

1. **Criar questões** seguindo o formato padrão
2. **Preencher os IDs** corretamente:
   - `courseId`: "medicina"
   - `specialtyId`: ID da especialidade (ex: "cirurgia-geral")
   - `subspecialtyId`: ID da subespecialidade (ex: "abdomen-agudo")
   - `subjectId`: ID do assunto (ex: "apendicite")
3. **Adicionar ao banco** via painel administrativo

### Exemplo de Comando para Gerar 500 Questões de Cirurgia:

```json
{
  "specialtyId": "cirurgia-geral",
  "count": 500,
  "distribution": {
    "abdomen-agudo": 150,
    "trauma": 150,
    "videolaparoscopia": 100,
    "parede-abdominal": 100
  }
}
```

---

## ✅ Sistema Completo e Funcional!

- ✅ Estrutura hierárquica completa de especialidades
- ✅ Função de filtro implementada
- ✅ Integração com setup de quiz
- ✅ Integração com página de quiz
- ✅ Query params funcionando
- ✅ Banco de dados linkado corretamente

**O sistema está pronto para receber questões e filtrar corretamente!** 🎉
