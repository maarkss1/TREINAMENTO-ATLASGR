import os
from PIL import Image, ImageDraw, ImageFont

def get_font(name='segoeui.ttf', size=12):
    path = os.path.join('C:/Windows/Fonts', name)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def process():
    out_dir = 'apps/portal/public/brand/screenshots'
    os.makedirs(out_dir, exist_ok=True)
    
    img1_path = 'C:/Users/Marks/.gemini/antigravity/brain/2b38635f-26bc-4615-a601-c55c9e3078ab/.user_uploaded/media_1788792201826.png'
    img2_path = 'C:/Users/Marks/.gemini/antigravity/brain/2b38635f-26bc-4615-a601-c55c9e3078ab/.user_uploaded/media_1788792207573.png'
    img3_path = 'C:/Users/Marks/.gemini/antigravity/brain/2b38635f-26bc-4615-a601-c55c9e3078ab/.user_uploaded/media_1788792212162.png'
    
    font_xs = get_font('segoeui.ttf', 10)
    font_sm = get_font('segoeui.ttf', 11)
    font_sm_bold = get_font('segoeuib.ttf', 11)
    font_base = get_font('segoeui.ttf', 12)
    font_base_bold = get_font('segoeuib.ttf', 12)
    font_lg_bold = get_font('segoeuib.ttf', 14)
    font_xl_bold = get_font('segoeuib.ttf', 18)
    
    # -------------------------------------------------------------
    # 1. NEWCONNECT DASHBOARD
    # -------------------------------------------------------------
    img1 = Image.open(img1_path)
    c1 = img1.crop((0, 96, 1024, 548)).convert('RGBA')
    d1 = ImageDraw.Draw(c1)
    
    # Mask user name in sidebar
    sidebar_bg1 = (38, 47, 64, 255)
    d1.rectangle([36, 48, 130, 78], fill=sidebar_bg1)
    d1.text((38, 49), "ANALISTA ATLAS", fill=(240, 245, 255, 255), font=font_sm_bold)
    d1.text((38, 62), "Torre de Controle", fill=(148, 163, 184, 255), font=font_xs)
    
    # Privacy badge top right
    d1.rounded_rectangle([700, 10, 1010, 36], radius=6, fill=(15, 23, 42, 235), outline=(255, 86, 24, 220), width=1)
    d1.text((712, 16), "LGPD COMPLIANT • DADOS REAIS PROTEGIDOS", fill=(255, 140, 90, 255), font=font_sm_bold)
    
    # KPI 1
    d1.rounded_rectangle([180, 65, 365, 145], radius=8, fill=(248, 250, 252, 255), outline=(226, 232, 240, 255), width=1)
    d1.text((195, 75), "VIAGENS EM TRÂNSITO", fill=(100, 116, 139, 255), font=font_xs)
    d1.text((195, 92), "1.428", fill=(15, 23, 42, 255), font=font_xl_bold)
    d1.text((195, 122), "• 99.2% conectividade ativa", fill=(22, 163, 74, 255), font=font_xs)
    
    # KPI 2
    d1.rounded_rectangle([385, 65, 570, 145], radius=8, fill=(248, 250, 252, 255), outline=(254, 202, 202, 255), width=1)
    d1.text((400, 75), "ALERTAS CRÍTICOS (FILA IA)", fill=(225, 29, 72, 255), font=font_xs)
    d1.text((400, 92), "3 P1 / P2", fill=(225, 29, 72, 255), font=font_xl_bold)
    d1.text((400, 122), "SLA Médio de resposta: 18s", fill=(100, 116, 139, 255), font=font_xs)
    
    # KPI 3
    d1.rounded_rectangle([590, 65, 775, 145], radius=8, fill=(248, 250, 252, 255), outline=(226, 232, 240, 255), width=1)
    d1.text((605, 75), "ÍNDICE DE SEGURANÇA", fill=(100, 116, 139, 255), font=font_xs)
    d1.text((605, 92), "99.98%", fill=(15, 23, 42, 255), font=font_xl_bold)
    d1.text((605, 122), "Zero sinistro com perda", fill=(22, 163, 74, 255), font=font_xs)
    
    # Fila de Alertas Tática
    d1.rounded_rectangle([180, 160, 1010, 435], radius=8, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=1)
    d1.rectangle([180, 160, 1010, 195], fill=(241, 245, 249, 255))
    d1.text((195, 170), "FILA TÁTICA DE ALERTAS PRIORITÁRIOS (MOTOR DE REGRAS IA ATLASGR)", fill=(30, 41, 59, 255), font=font_sm_bold)
    
    # Alert 1
    d1.rectangle([180, 196, 1010, 255], fill=(254, 242, 242, 255))
    d1.rounded_rectangle([195, 210, 260, 238], radius=4, fill=(225, 29, 72, 255))
    d1.text((204, 217), "P1 CRÍTICO", fill=(255, 255, 255, 255), font=font_xs)
    d1.text((275, 208), "Alerta: Botão de Pânico / Perda Súbita Telemetria — Rodovia BR-116 km 380 (SP-RJ)", fill=(15, 23, 42, 255), font=font_base_bold)
    d1.text((275, 228), "Ativo: SCANIA R450 [Placa: BRA*E** - Protegida] • Carga: Eletroeletrônicos (SLA restante: 00:24s)", fill=(100, 116, 139, 255), font=font_sm)
    d1.rounded_rectangle([895, 212, 995, 238], radius=4, fill=(225, 29, 72, 255))
    d1.text((912, 218), "ESCALAR CIA", fill=(255, 255, 255, 255), font=font_xs)
    
    # Alert 2
    d1.rectangle([180, 256, 1010, 315], fill=(255, 251, 235, 255))
    d1.rounded_rectangle([195, 270, 260, 298], radius=4, fill=(217, 119, 6, 255))
    d1.text((204, 277), "P2 DESVIO", fill=(255, 255, 255, 255), font=font_xs)
    d1.text((275, 268), "Desvio de Rota Homologada acima de 5km — Rod. Fernão Dias (Minas Gerais)", fill=(15, 23, 42, 255), font=font_base_bold)
    d1.text((275, 288), "Ativo: VOLVO FH540 [Placa: ABC*1** - Protegida] • Motorista: J*** S*** (CPF: ***.452.***-**)", fill=(100, 116, 139, 255), font=font_sm)
    d1.rounded_rectangle([895, 272, 995, 298], radius=4, fill=(217, 119, 6, 255))
    d1.text((916, 278), "CONTATAR", fill=(255, 255, 255, 255), font=font_xs)
    
    # Alert 3
    d1.rectangle([180, 316, 1010, 375], fill=(255, 255, 255, 255))
    d1.rounded_rectangle([195, 330, 260, 358], radius=4, fill=(59, 130, 246, 255))
    d1.text((204, 337), "P4 PARADA", fill=(255, 255, 255, 255), font=font_xs)
    d1.text((275, 328), "Pernoite Não Autorizado fora de Ponto Homologado PGR — Posto Não Credenciado", fill=(15, 23, 42, 255), font=font_base_bold)
    d1.text((275, 348), "Ativo: DAF XF105 [Placa: XYZ*9** - Protegida] • Rota Interior Paulista", fill=(100, 116, 139, 255), font=font_sm)
    d1.rounded_rectangle([895, 332, 995, 358], radius=4, fill=(241, 245, 249, 255), outline=(203, 213, 225, 255), width=1)
    d1.text((926, 338), "VER SM", fill=(71, 85, 105, 255), font=font_xs)
    
    # Alert 4
    d1.rectangle([180, 376, 1010, 435], fill=(248, 250, 252, 255))
    d1.rounded_rectangle([195, 390, 260, 418], radius=4, fill=(16, 185, 129, 255))
    d1.text((204, 397), "P7 STATUS", fill=(255, 255, 255, 255), font=font_xs)
    d1.text((275, 388), "Sinal Periódico Rastreador Híbrido Satelital/GPRS — Geocerca Origem Liberada", fill=(15, 23, 42, 255), font=font_base_bold)
    d1.text((275, 408), "Ativo: MERCEDES ACTROS [Placa: KKK*2** - Protegida] • Viagem em Conformidade", fill=(100, 116, 139, 255), font=font_sm)
    d1.rounded_rectangle([895, 392, 995, 418], radius=4, fill=(241, 245, 249, 255), outline=(203, 213, 225, 255), width=1)
    d1.text((924, 398), "DETALHE", fill=(71, 85, 105, 255), font=font_xs)
    
    c1.save(os.path.join(out_dir, 'newconnect-dashboard.png'))
    print('Updated newconnect-dashboard.png')

    # -------------------------------------------------------------
    # 2. PORTAL ATLAS / CONNECT PLUS (Atlas_Principal.php)
    # -------------------------------------------------------------
    img2 = Image.open(img2_path)
    c2 = img2.crop((0, 96, 1024, 548)).convert('RGBA')
    d2 = ImageDraw.Draw(c2)
    
    # Completely cover the old user name in yellow header
    header_yellow2 = (255, 197, 0, 255)
    d2.rectangle([740, 2, 891, 30], fill=header_yellow2)
    d2.text((752, 8), "Usuário: ANALISTA ATLAS", fill=(30, 30, 30, 255), font=font_sm_bold)
    
    # Privacy badge in header
    d2.rounded_rectangle([475, 4, 735, 28], radius=4, fill=(255, 255, 255, 240))
    d2.text((490, 8), "LGPD COMPLIANT • AMBIENTE PROTEGIDO", fill=(180, 83, 9, 255), font=font_sm_bold)
    
    # SM Tab bar
    d2.rounded_rectangle([160, 45, 1010, 85], radius=6, fill=(241, 245, 249, 255), outline=(203, 213, 225, 255), width=1)
    d2.text((175, 52), "SOLICITAÇÃO DE MONITORAMENTO (SM) Nº 849.204 — EMISSÃO E VÍNCULO PGR", fill=(15, 23, 42, 255), font=font_base_bold)
    d2.text((175, 68), "Embarcador: [CONFIDENCIAL S/A - PROTEGIDO] • Apólice RCF-DC + RCTR-C Nº 9921-A", fill=(100, 116, 139, 255), font=font_sm)
    
    # Left Section: Hardware & Trackers
    d2.rounded_rectangle([160, 95, 575, 435], radius=6, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=1)
    d2.rectangle([160, 95, 575, 125], fill=(238, 242, 246, 255))
    d2.text((175, 104), "PARÂMETROS DE HARDWARE & RASTREADORES VINCULADOS", fill=(30, 41, 59, 255), font=font_sm_bold)
    
    fields2_left = [
        ("Cavalo Trator:", "MERCEDES-BENZ ACTROS 2651 [Placa: M**-***4 - Anonimizada]"),
        ("Semirreboque / Baú:", "RANDON CARRETA SIDER 3 EIXOS [Placa: K**-***8 - Anonimizada]"),
        ("Rastreador Primário:", "OMNILINK OMNI-DUAL SATELITAL/GPRS (ID: 789214) — SINAL OK"),
        ("Rastreador Secundário (Isca):", "AUTOTRAC CARGO LOCKER AUTÔNOMO (Bateria: 100%) — ATIVA"),
        ("Sensor de Engate / 5ª Roda:", "BLOQUEADO / EM CONFORMIDADE"),
        ("Sensor de Portas Baú:", "TRAVA ELETRÔNICA HOMOLOGADA (FECHADA)"),
        ("Teclado de Macros:", "HABILITADO COM PIN DO MOTORISTA"),
        ("Janela Autorizada PGR:", "06:00 às 22:00 (Circulação Noturna VEDADA pela Apólice)"),
    ]
    y_curr = 135
    for label, val in fields2_left:
        d2.text((175, y_curr), label, fill=(100, 116, 139, 255), font=font_xs)
        d2.text((175, y_curr + 14), val, fill=(15, 23, 42, 255), font=font_sm_bold)
        y_curr += 36
        
    # Right Section: Motorista & Validação
    d2.rounded_rectangle([590, 95, 1010, 435], radius=6, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=1)
    d2.rectangle([590, 95, 1010, 125], fill=(238, 242, 246, 255))
    d2.text((605, 104), "INTEGRAÇÃO ATLAS PROFILE & CHECKLIST OPERACIONAL", fill=(30, 41, 59, 255), font=font_sm_bold)
    
    fields2_right = [
        ("Condutor Homologado:", "A**** R**** M**** (CPF: ***.781.***-** — Mascarado LGPD)"),
        ("CNH Registro / Categoria:", "Registro: ********910 | Categoria: E | Validade: 2028"),
        ("Status Atlas Profile:", "• APROVADO / ADEQUADO AO RISCO (Protocolo PRF-9912)"),
        ("Biometria FaceID:", "• CONFERIDA COM LIVENESS (Anti-spoofing validado)"),
        ("Tipo de Carga Declarada:", "Carga Seca de Alto Valor (Valor Segurado: R$ 3.850.000,00)"),
        ("Escolta Armada:", "EXIGIDA PELO PGR — 2 AGENTES TÁTICOS VINCULADOS"),
        ("Status da Viagem:", "• EM TRÂNSITO — MONITORAMENTO ATIVO"),
    ]
    y_curr = 135
    for label, val in fields2_right:
        d2.text((605, y_curr), label, fill=(100, 116, 139, 255), font=font_xs)
        d2.text((605, y_curr + 14), val, fill=(15, 23, 42, 255), font=font_sm_bold)
        y_curr += 36
        
    # Action buttons at bottom
    d2.rounded_rectangle([605, 395, 715, 423], radius=4, fill=(22, 163, 74, 255))
    d2.text((620, 403), "ENVIAR MACRO", fill=(255, 255, 255, 255), font=font_xs)
    
    d2.rounded_rectangle([725, 395, 850, 423], radius=4, fill=(59, 130, 246, 255))
    d2.text((740, 403), "TESTE ATUADORES", fill=(255, 255, 255, 255), font=font_xs)
    
    d2.rounded_rectangle([860, 395, 995, 423], radius=4, fill=(225, 29, 72, 255))
    d2.text((890, 403), "BAIXAR SM", fill=(255, 255, 255, 255), font=font_xs)

    c2.save(os.path.join(out_dir, 'portalatlas-sm.png'))
    print('Updated portalatlas-sm.png')

    # -------------------------------------------------------------
    # 3. PERFIL SECURITÁRIO / ATLAS PROFILE (recentRecords)
    # -------------------------------------------------------------
    img3 = Image.open(img3_path)
    c3 = img3.crop((0, 96, 1024, 548)).convert('RGBA')
    d3 = ImageDraw.Draw(c3)
    
    # Mask user profile in sidebar bottom with exact dark color
    sidebar_bg3 = (6, 15, 24, 255)
    d3.rectangle([0, 395, 145, 452], fill=sidebar_bg3)
    d3.text((12, 408), "OPERADOR PROFILE", fill=(240, 245, 255, 255), font=font_sm_bold)
    d3.text((12, 424), "Módulo de Análise", fill=(148, 163, 184, 255), font=font_xs)
    
    # Clean bottom border of the page (erase any OS tooltip residue)
    d3.rectangle([150, 442, 1024, 452], fill=(255, 255, 255, 255))
    
    # Privacy badge top right
    d3.rounded_rectangle([680, 10, 990, 36], radius=6, fill=(255, 86, 24, 20), outline=(255, 86, 24, 220), width=1)
    d3.text((695, 16), "LGPD ART. 7º & 11 • DADOS SENSÍVEIS MASCARADOS", fill=(255, 86, 24, 255), font=font_sm_bold)
    
    # Populate table area
    d3.rectangle([155, 85, 1010, 440], fill=(255, 255, 255, 255))
    
    # Search filters bar
    d3.rounded_rectangle([165, 90, 1000, 125], radius=6, fill=(248, 250, 252, 255), outline=(226, 232, 240, 255), width=1)
    d3.text((180, 100), "Filtro Ativo: Consultas das últimas 24h • Transportadoras Homologadas • Motoristas & Ajudantes", fill=(71, 85, 105, 255), font=font_sm)
    
    # Table Header
    d3.rectangle([165, 135, 1000, 165], fill=(241, 245, 249, 255))
    d3.text((180, 145), "PROTOCOLO", fill=(71, 85, 105, 255), font=font_xs)
    d3.text((290, 145), "CANDIDATO / CONDUTOR", fill=(71, 85, 105, 255), font=font_xs)
    d3.text((475, 145), "DOCUMENTO (CPF)", fill=(71, 85, 105, 255), font=font_xs)
    d3.text((625, 145), "BIOMETRIA FACEID", fill=(71, 85, 105, 255), font=font_xs)
    d3.text((775, 145), "STATUS DE RISCO", fill=(71, 85, 105, 255), font=font_xs)
    d3.text((925, 145), "AÇÃO", fill=(71, 85, 105, 255), font=font_xs)
    
    # Row 1: Aprovado
    d3.rectangle([165, 166, 1000, 215], fill=(255, 255, 255, 255), outline=(241, 245, 249, 255), width=1)
    d3.text((180, 182), "PRF-2026-9912", fill=(15, 23, 42, 255), font=font_sm_bold)
    d3.text((290, 182), "M***** S**** L***", fill=(15, 23, 42, 255), font=font_sm_bold)
    d3.text((475, 182), "***.892.418-**", fill=(100, 116, 139, 255), font=font_sm)
    d3.rounded_rectangle([625, 176, 735, 202], radius=4, fill=(240, 253, 244, 255), outline=(187, 247, 208, 255), width=1)
    d3.text((638, 182), "• FaceID 99.8%", fill=(22, 163, 74, 255), font=font_xs)
    d3.rounded_rectangle([775, 176, 885, 202], radius=4, fill=(22, 163, 74, 255))
    d3.text((795, 182), "ADEQUADO", fill=(255, 255, 255, 255), font=font_xs)
    d3.rounded_rectangle([925, 176, 985, 202], radius=4, fill=(241, 245, 249, 255), outline=(203, 213, 225, 255), width=1)
    d3.text((940, 182), "Laudo", fill=(51, 65, 85, 255), font=font_xs)
    
    # Row 2: Restrito
    d3.rectangle([165, 216, 1000, 265], fill=(254, 242, 242, 255), outline=(241, 245, 249, 255), width=1)
    d3.text((180, 232), "PRF-2026-9908", fill=(15, 23, 42, 255), font=font_sm_bold)
    d3.text((290, 232), "C***** A**** B******", fill=(15, 23, 42, 255), font=font_sm_bold)
    d3.text((475, 232), "***.123.708-**", fill=(100, 116, 139, 255), font=font_sm)
    d3.rounded_rectangle([625, 226, 735, 252], radius=4, fill=(240, 253, 244, 255), outline=(187, 247, 208, 255), width=1)
    d3.text((638, 232), "• FaceID 98.4%", fill=(22, 163, 74, 255), font=font_xs)
    d3.rounded_rectangle([775, 226, 885, 252], radius=4, fill=(225, 29, 72, 255))
    d3.text((802, 232), "RESTRITO", fill=(255, 255, 255, 255), font=font_xs)
    d3.rounded_rectangle([925, 226, 985, 252], radius=4, fill=(241, 245, 249, 255), outline=(203, 213, 225, 255), width=1)
    d3.text((934, 232), "Detalhes", fill=(51, 65, 85, 255), font=font_xs)
    
    # Row 3: Em Análise
    d3.rectangle([165, 266, 1000, 315], fill=(255, 251, 235, 255), outline=(241, 245, 249, 255), width=1)
    d3.text((180, 282), "PRF-2026-9899", fill=(15, 23, 42, 255), font=font_sm_bold)
    d3.text((290, 282), "R***** F**** D****", fill=(15, 23, 42, 255), font=font_sm_bold)
    d3.text((475, 282), "***.654.321-**", fill=(100, 116, 139, 255), font=font_sm)
    d3.rounded_rectangle([625, 276, 735, 302], radius=4, fill=(254, 240, 138, 255), outline=(234, 179, 8, 255), width=1)
    d3.text((635, 282), "Aguardando Foto", fill=(161, 98, 7, 255), font=font_xs)
    d3.rounded_rectangle([775, 276, 885, 302], radius=4, fill=(217, 119, 6, 255))
    d3.text((792, 282), "EM ANÁLISE", fill=(255, 255, 255, 255), font=font_xs)
    d3.rounded_rectangle([925, 276, 985, 302], radius=4, fill=(241, 245, 249, 255), outline=(203, 213, 225, 255), width=1)
    d3.text((938, 282), "Cobrar", fill=(51, 65, 85, 255), font=font_xs)
    
    # Summary of verified sources
    d3.rounded_rectangle([165, 330, 1000, 435], radius=6, fill=(248, 250, 252, 255), outline=(226, 232, 240, 255), width=1)
    d3.text((180, 342), "VARREDURA AUTOMATIZADA EM 40+ FONTES FEDERAIS E ESTADUAIS:", fill=(30, 41, 59, 255), font=font_sm_bold)
    d3.text((180, 364), "[OK] Tribunais de Justiça (TJ / TRF) — Mandados de Prisão & Antecedentes Criminais", fill=(22, 163, 74, 255), font=font_sm)
    d3.text((180, 382), "[OK] Senatran / Renach — Regularidade da CNH, Pontuação, Bloqueios e Impedimentos", fill=(22, 163, 74, 255), font=font_sm)
    d3.text((180, 400), "[OK] ANTT / RNTRC — Regularidade de Transportador Autônomo e Veículos Vinculados", fill=(22, 163, 74, 255), font=font_sm)
    d3.text((180, 418), "[OK] Receita Federal & Sintegra — Regularidade Cadastral de CPF/CNPJ", fill=(22, 163, 74, 255), font=font_sm)

    c3.save(os.path.join(out_dir, 'perfil-securitario.png'))
    print('Updated perfil-securitario.png')

if __name__ == '__main__':
    process()
