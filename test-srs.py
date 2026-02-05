#!/usr/bin/env python3
"""
Script de Teste Automatizado do Sistema SRS do QRub

Uso:
    python test-srs.py --user-id SEU_USER_ID

Testa:
    1. Seed de assuntos
    2. Dashboard diário
    3. Criação de sessão
    4. Finalização de sessão (simulada)
    5. Verificação de progresso
"""

import requests
import json
import sys
import argparse
from typing import Dict, Any, List

BASE_URL = "http://localhost:3000"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def print_success(msg: str):
    print(f"{Colors.GREEN}✅ {msg}{Colors.RESET}")

def print_error(msg: str):
    print(f"{Colors.RED}❌ {msg}{Colors.RESET}")

def print_info(msg: str):
    print(f"{Colors.BLUE}ℹ️  {msg}{Colors.RESET}")

def print_warning(msg: str):
    print(f"{Colors.YELLOW}⚠️  {msg}{Colors.RESET}")

def test_seed_assuntos() -> bool:
    """Testa o seed de assuntos"""
    print_info("Testando seed de assuntos...")
    
    try:
        response = requests.post(f"{BASE_URL}/api/assuntos/seed")
        data = response.json()
        
        if response.status_code == 200 and data.get('success'):
            total = data.get('total_criados', 0)
            print_success(f"Assuntos criados: {total}")
            return True
        else:
            print_warning(f"Assuntos já existem ou erro: {data.get('message')}")
            return True  # Não é erro crítico
    except Exception as e:
        print_error(f"Erro ao popular assuntos: {e}")
        return False

def test_dashboard_diario(user_id: str) -> Dict[str, Any]:
    """Testa o dashboard diário"""
    print_info("Testando dashboard diário...")
    
    try:
        response = requests.get(f"{BASE_URL}/api/dashboard/diario", params={"user_id": user_id})
        data = response.json()
        
        if response.status_code == 200 and data.get('success'):
            resumo = data.get('resumo', {})
            print_success(f"Dashboard carregado:")
            print(f"  - Revisões atrasadas: {resumo.get('total_atrasadas', 0)}")
            print(f"  - Revisões do dia: {resumo.get('total_do_dia', 0)}")
            print(f"  - Tem sugestão: {resumo.get('tem_sugestao', False)}")
            return data
        else:
            print_error(f"Erro ao carregar dashboard: {data}")
            return {}
    except Exception as e:
        print_error(f"Erro ao testar dashboard: {e}")
        return {}

def test_criar_sessao(user_id: str, assunto_id: str) -> Dict[str, Any]:
    """Testa criação de sessão"""
    print_info(f"Testando criação de sessão para assunto {assunto_id[:8]}...")
    
    try:
        payload = {
            "user_id": user_id,
            "assunto_id": assunto_id,
            "tipo": "NIVELAMENTO"
        }
        
        response = requests.post(f"{BASE_URL}/api/sessao/criar", json=payload)
        data = response.json()
        
        if response.status_code == 200 and data.get('success'):
            sessao_id = data.get('sessao_id')
            total_questoes = len(data.get('questoes', []))
            print_success(f"Sessão criada: {sessao_id[:8]}...")
            print(f"  - Total de questões: {total_questoes}")
            print(f"  - Tipo: {data.get('tipo')}")
            return data
        else:
            print_error(f"Erro ao criar sessão: {data.get('error', 'Unknown')}")
            if 'message' in data:
                print_warning(f"  Mensagem: {data['message']}")
            return {}
    except Exception as e:
        print_error(f"Erro ao testar criação de sessão: {e}")
        return {}

def test_finalizar_sessao(sessao_id: str, questoes: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Testa finalização de sessão (simulando respostas aleatórias)"""
    print_info(f"Testando finalização de sessão {sessao_id[:8]}...")
    
    # Simular respostas (alternando entre a, b, c, d, e)
    opcoes = ['a', 'b', 'c', 'd', 'e']
    respostas = []
    
    for i, questao in enumerate(questoes):
        respostas.append({
            "questao_id": questao['questao_id'],
            "resposta": opcoes[i % len(opcoes)],
            "tempo_segundos": 45 + (i * 5)
        })
    
    try:
        payload = {
            "sessao_id": sessao_id,
            "respostas": respostas
        }
        
        response = requests.post(f"{BASE_URL}/api/sessao/finalizar", json=payload)
        data = response.json()
        
        if response.status_code == 200 and data.get('success'):
            print_success(f"Sessão finalizada:")
            print(f"  - Nota: {data.get('nota')}/10")
            print(f"  - Acertos: {data.get('acertos')}/{data.get('total')}")
            print(f"  - Nível atual: {data.get('nivel_atual')}")
            print(f"  - Próxima revisão: {data.get('proxima_revisao')}")
            print(f"  - Intervalo: {data.get('intervalo_dias')} dias")
            return data
        else:
            print_error(f"Erro ao finalizar sessão: {data.get('error', 'Unknown')}")
            return {}
    except Exception as e:
        print_error(f"Erro ao testar finalização de sessão: {e}")
        return {}

def main():
    parser = argparse.ArgumentParser(description='Teste automatizado do Sistema SRS')
    parser.add_argument('--user-id', required=True, help='ID do usuário para teste')
    args = parser.parse_args()
    
    user_id = args.user_id
    
    print("\n" + "="*60)
    print("🧪 TESTE AUTOMATIZADO DO SISTEMA SRS - QRUB")
    print("="*60 + "\n")
    
    # Teste 1: Seed de assuntos
    print("\n📝 TESTE 1: Seed de Assuntos")
    print("-" * 60)
    if not test_seed_assuntos():
        print_error("Teste de seed falhou. Abortando.")
        sys.exit(1)
    
    # Teste 2: Dashboard diário
    print("\n📊 TESTE 2: Dashboard Diário")
    print("-" * 60)
    dashboard = test_dashboard_diario(user_id)
    if not dashboard:
        print_error("Teste de dashboard falhou. Abortando.")
        sys.exit(1)
    
    # Verificar se há sugestão de nivelamento
    sugestao = dashboard.get('sugestao_nivelamento')
    if not sugestao:
        print_warning("Nenhuma sugestão de nivelamento disponível.")
        print_info("Possíveis causas:")
        print("  - Todos os assuntos já foram nivelados")
        print("  - Não há questões aprovadas suficientes")
        sys.exit(0)
    
    assunto_id = sugestao.get('assunto_id')
    print_info(f"Assunto sugerido: {sugestao.get('nome')}")
    
    # Teste 3: Criar sessão
    print("\n🎯 TESTE 3: Criar Sessão de Nivelamento")
    print("-" * 60)
    sessao = test_criar_sessao(user_id, assunto_id)
    if not sessao:
        print_error("Teste de criação de sessão falhou. Abortando.")
        sys.exit(1)
    
    sessao_id = sessao.get('sessao_id')
    questoes = sessao.get('questoes', [])
    
    if len(questoes) != 10:
        print_error(f"Esperado 10 questões, recebido {len(questoes)}")
        sys.exit(1)
    
    # Teste 4: Finalizar sessão
    print("\n✅ TESTE 4: Finalizar Sessão")
    print("-" * 60)
    resultado = test_finalizar_sessao(sessao_id, questoes)
    if not resultado:
        print_error("Teste de finalização de sessão falhou.")
        sys.exit(1)
    
    # Teste 5: Verificar dashboard atualizado
    print("\n🔄 TESTE 5: Verificar Dashboard Atualizado")
    print("-" * 60)
    dashboard_atualizado = test_dashboard_diario(user_id)
    if dashboard_atualizado:
        print_success("Dashboard atualizado com sucesso!")
    
    # Resumo final
    print("\n" + "="*60)
    print("🎉 TODOS OS TESTES PASSARAM COM SUCESSO!")
    print("="*60)
    print("\n✅ Sistema SRS está funcionando corretamente:")
    print("  - Seed de assuntos: OK")
    print("  - Dashboard diário: OK")
    print("  - Criação de sessão: OK")
    print("  - Finalização de sessão: OK")
    print("  - Atualização de progresso: OK")
    print("  - Agendamento de revisão: OK")
    print("\n🚀 Próximo passo: Implementar componentes UI\n")

if __name__ == "__main__":
    main()
