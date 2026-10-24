"""Update only the user-confirmed nstech end date in the portfolio's PDF copy."""
from pathlib import Path
import sys
import pymupdf as fitz

source = Path(sys.argv[1])
root = Path(__file__).resolve().parents[1]
target = root / 'public' / 'carlos-santana-nunes-curriculo.pdf'
qa = root / 'output' / 'pdf-qa'
qa.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
page = document[0]
matches = page.search_for('mai/2025 - Atual')
assert len(matches) == 1, 'Expected exactly one matching employment date.'
span = next(s for block in page.get_text('dict')['blocks'] if 'lines' in block
            for line in block['lines'] for s in line['spans'] if s['text'] == 'mai/2025 - Atual')
font_path = qa / 'FiraSans-Medium.ttf'
assert font_path.exists(), 'Place the full Fira Sans Medium TTF in output/pdf-qa before running.'
page.add_redact_annot(matches[0], fill=(1, 1, 1))
page.apply_redactions(images=0, graphics=0)
page.insert_font(fontname='portfolio_fira', fontfile=str(font_path))
page.insert_text(span['origin'], 'mai/2025 - out/2026', fontname='portfolio_fira', fontsize=span['size'], color=(0, 0, 0))
document.save(target, garbage=4, deflate=True)
document.close()

result = fitz.open(target)
assert len(result) == 2
assert 'mai/2025 - out/2026' in result[0].get_text()
assert 'mai/2025 - Atual' not in result[0].get_text()
for index, result_page in enumerate(result):
    result_page.get_pixmap(matrix=fitz.Matrix(1.3, 1.3)).save(qa / f'after-{index + 1}.png')
print(f'Updated PDF: {target}; 2 pages verified. Original preserved.')
