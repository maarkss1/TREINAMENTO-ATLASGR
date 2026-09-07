from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

def anonymize_all():
    base_dir = 'apps/portal/public/brand/screenshots'
    font_path_bold = 'C:/Windows/Fonts/segoeuib.ttf'
    font_path_reg = 'C:/Windows/Fonts/segoeui.ttf'
    
    font_sm_bold = ImageFont.truetype(font_path_bold, 11) if os.path.exists(font_path_bold) else ImageFont.load_default()
    font_xs = ImageFont.truetype(font_path_reg, 10) if os.path.exists(font_path_reg) else ImageFont.load_default()
    
    # 1. newconnect_tela_alerta.png
    alerta_path = os.path.join(base_dir, 'newconnect_tela_alerta.png')
    if os.path.exists(alerta_path):
        img = Image.open(alerta_path).convert('RGBA')
        draw = ImageDraw.Draw(img)
        # Mask user in sidebar (x: 36 to 128, y: 115 to 175 approx)
        sidebar_bg = img.getpixel((25, 130))
        draw.rectangle([36, 115, 126, 175], fill=sidebar_bg)
        draw.text((38, 120), "ANALISTA ATLAS", fill=(240, 245, 255, 255), font=font_sm_bold)
        draw.text((38, 140), "Torre de Controle", fill=(148, 163, 184, 255), font=font_xs)
        
        # Blur or mask Placa column (approx x: 220 to 285) and Cliente column (approx x: 885 to 1010) for rows y: 130 to 570
        # We blur the bounding boxes
        box_placas = (220, 130, 285, 570)
        region_placas = img.crop(box_placas).filter(ImageFilter.GaussianBlur(radius=5))
        img.paste(region_placas, box_placas)
        
        box_clientes = (880, 130, 1024, 570)
        region_clientes = img.crop(box_clientes).filter(ImageFilter.GaussianBlur(radius=6))
        img.paste(region_clientes, box_clientes)
        
        # Add LGPD protection stamp
        draw.rounded_rectangle([730, 32, 980, 58], radius=4, fill=(15, 23, 42, 235), outline=(255, 86, 24, 220), width=1)
        draw.text((742, 38), "LGPD COMPLIANT • DADOS PROTEGIDOS", fill=(255, 140, 90, 255), font=font_sm_bold)
        
        img.save(alerta_path)
        print("Anonymized newconnect_tela_alerta.png")
        
    # 2. connect_plus_sm.png & connect_plus_motorista.png
    for fname in ['connect_plus_sm.png', 'connect_plus_motorista.png', 'connect_plus_principal.png']:
        fpath = os.path.join(base_dir, fname)
        if os.path.exists(fpath):
            img = Image.open(fpath).convert('RGBA')
            draw = ImageDraw.Draw(img)
            # Yellow header is at top: x: 740 to 910, y: 5 to 35
            draw.rectangle([740, 4, 912, 36], fill=(255, 197, 0, 255))
            draw.text((755, 12), "Usuário: ANALISTA ATLAS", fill=(30, 30, 30, 255), font=font_sm_bold)
            img.save(fpath)
            print(f"Anonymized {fname}")

    # 3. perfil_securitario_profile.png & perfil_securitario_recentes.png
    for fname in ['perfil_securitario_profile.png', 'perfil_securitario_recentes.png']:
        fpath = os.path.join(base_dir, fname)
        if os.path.exists(fpath):
            img = Image.open(fpath).convert('RGBA')
            draw = ImageDraw.Draw(img)
            # Bottom left user info
            w, h = img.size
            draw.rectangle([0, h - 60, 145, h], fill=(6, 15, 24, 255))
            draw.text((12, h - 50), "OPERADOR PROFILE", fill=(240, 245, 255, 255), font=font_sm_bold)
            draw.text((12, h - 34), "Módulo de Análise", fill=(148, 163, 184, 255), font=font_xs)
            img.save(fpath)
            print(f"Anonymized {fname}")

if __name__ == '__main__':
    anonymize_all()
